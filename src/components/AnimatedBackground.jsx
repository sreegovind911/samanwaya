import { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    let program;
    let texture;
    let positionBuffer;
    let isDisposed = false;
    let gl;

    try {
      // Detect WebGL context with alpha: true to avoid any black screen during loading
      gl =
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          depth: false,
          stencil: false,
          powerPreference: 'high-performance',
        }) ||
        canvas.getContext('experimental-webgl');

      if (!gl) {
        setWebglFailed(true);
        return;
      }

      // Vertex shader
      const vsSource = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      // Fragment shader with continuous floating motion and animated contour lines
      const fsSource = `
        precision highp float;
        uniform vec2 u_resolution;
        uniform vec2 u_uv_scale;
        uniform vec2 u_uv_offset;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform sampler2D u_texture;

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          vec2 baseUV = st * u_uv_scale + u_uv_offset;

          float t = u_time * 0.95;
          vec2 dir = normalize(vec2(0.48, 0.88));

          // Continuous floating drift
          vec2 floatDrift = vec2(
            sin(t * 0.4) * 0.035 + cos(t * 0.22) * 0.02,
            cos(t * 0.35) * 0.035 + sin(t * 0.25) * 0.02
          );
          floatDrift += dir * (sin(t * 0.45) * 0.03);

          float floatZoom = 1.0 + sin(t * 0.3) * 0.03;
          vec2 coverUV = (baseUV - 0.5) * floatZoom + 0.5 + floatDrift;
          coverUV.y = 1.0 - coverUV.y;

          float lineDistance = dot(coverUV, dir);
          float wave1 = sin(lineDistance * 20.0 - t * 2.8);
          float wave2 = cos((coverUV.x * 12.0 - coverUV.y * 8.0) + t * 1.6);
          float wave3 = sin(lineDistance * 36.0 - t * 3.8);

          vec2 displacement = dir * (wave1 * 0.012 + wave2 * 0.007 + wave3 * 0.004);

          vec2 m = u_mouse / u_resolution;
          m.y = 1.0 - m.y;
          float mouseDist = distance(st, m);
          float mouseInfluence = smoothstep(0.4, 0.0, mouseDist);
          vec2 mouseOffset = normalize(st - m + 0.0001) * sin(mouseDist * 28.0 - t * 4.5) * mouseInfluence * 0.015;

          vec2 sampleUV = clamp(coverUV + displacement + mouseOffset, 0.0, 1.0);
          vec4 texColor = texture2D(u_texture, sampleUV);

          float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
          float lineMask = smoothstep(0.38, 0.78, lum);

          float flowCoord = dot(sampleUV, dir);
          float p1 = sin(flowCoord * 22.0 - t * 3.4);
          p1 = pow(clamp(p1, 0.0, 1.0), 4.5);

          float p2 = sin(flowCoord * 46.0 - t * 5.0 + 1.2);
          p2 = pow(clamp(p2, 0.0, 1.0), 6.5);

          float p3 = sin(flowCoord * 11.0 - t * 1.8);
          p3 = pow(clamp(p3, 0.0, 1.0), 3.0) * 0.45;

          float totalPulse = (p1 * 0.95 + p2 * 1.25 + p3) * lineMask;

          vec3 glowWhite = vec3(1.0, 0.98, 1.0);
          vec3 neonViolet = vec3(0.88, 0.55, 1.0);
          vec3 pulseColor = mix(neonViolet, glowWhite, p2);

          vec3 color = texColor.rgb + pulseColor * totalPulse * 1.45;

          vec2 vig = st * (1.0 - st);
          float vignette = clamp(vig.x * vig.y * 18.0, 0.0, 1.0);
          color *= mix(0.94, 1.0, vignette);

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      function createShader(glCtx, type, source) {
        const shader = glCtx.createShader(type);
        glCtx.shaderSource(shader, source);
        glCtx.compileShader(shader);
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
          console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
          glCtx.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

      if (!vs || !fs) {
        setWebglFailed(true);
        return;
      }

      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        setWebglFailed(true);
        return;
      }

      gl.useProgram(program);

      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]);

      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const aPosLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
      const uUvScaleLoc = gl.getUniformLocation(program, 'u_uv_scale');
      const uUvOffsetLoc = gl.getUniformLocation(program, 'u_uv_offset');
      const uTimeLoc = gl.getUniformLocation(program, 'u_time');
      const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
      const uTextureLoc = gl.getUniformLocation(program, 'u_texture');

      let mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
      const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      let imgDimensions = { width: 1024, height: 571 };
      let uvScale = [1.0, 1.0];
      let uvOffset = [0.0, 0.0];

      const updateDimensions = () => {
        if (!canvas || isDisposed) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.floor(window.innerWidth * dpr);
        const height = Math.floor(window.innerHeight * dpr);

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }

        const screenAspect = width / height;
        const imgAspect = imgDimensions.width / imgDimensions.height;

        if (screenAspect > imgAspect) {
          const scaleY = imgAspect / screenAspect;
          uvScale = [1.0, scaleY];
          uvOffset = [0.0, (1.0 - scaleY) * 0.5];
        } else {
          const scaleX = screenAspect / imgAspect;
          uvScale = [scaleX, 1.0];
          uvOffset = [(1.0 - scaleX) * 0.5, 0.0];
        }
      };

      window.addEventListener('resize', updateDimensions);
      updateDimensions();

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/bg.jpg';

      let textureLoaded = false;
      img.onload = () => {
        if (isDisposed) return;
        imgDimensions = {
          width: img.naturalWidth || 1024,
          height: img.naturalHeight || 571,
        };

        updateDimensions();

        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        textureLoaded = true;
      };

      img.onerror = () => {
        console.warn('Failed to load /bg.jpg, trying /bg.png');
        img.src = '/bg.png';
      };

      const startTime = performance.now();
      const render = () => {
        if (isDisposed) return;

        if (textureLoaded && gl && program) {
          gl.useProgram(program);

          const currentTime = (performance.now() - startTime) / 1000;
          gl.uniform1f(uTimeLoc, currentTime);
          gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
          gl.uniform2f(uUvScaleLoc, uvScale[0], uvScale[1]);
          gl.uniform2f(uUvOffsetLoc, uvOffset[0], uvOffset[1]);
          gl.uniform2f(
            uMouseLoc,
            mouse.x * (canvas.width / window.innerWidth),
            mouse.y * (canvas.height / window.innerHeight)
          );

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1i(uTextureLoc, 0);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', updateDimensions);
        if (gl) {
          if (positionBuffer) gl.deleteBuffer(positionBuffer);
          if (texture) gl.deleteTexture(texture);
          if (program) gl.deleteProgram(program);
        }
      };
    } catch (e) {
      console.warn('WebGL exception caught, falling back:', e);
      setWebglFailed(true);
    }
  }, []);

  return (
    <div className="animated-bg-container" aria-hidden="true">
      {/* WebGL Canvas for 60FPS animated floating lines */}
      <canvas ref={canvasRef} className="animated-bg-canvas" />

      {/* Fallback CSS animated image if WebGL is unavailable */}
      {webglFailed && <div className="animated-bg-fallback" />}

      {/* Ultra-subtle overlay allowing the full pattern to float vibrantly behind text */}
      <div className="animated-bg-ambient-layer" />

      {/* Directional luminous shimmer moving across the contours */}
      <div className="animated-bg-light-beams" />
    </div>
  );
}
