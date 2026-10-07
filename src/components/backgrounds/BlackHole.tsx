import React, { useEffect, useRef } from 'react';
import { cursorState, waveAt } from '../../data/cursorState';

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uRes;
uniform vec2 uCenter;
uniform float uScale;
uniform float uTime;
uniform float uElev;
uniform vec3 uLens;
uniform vec4 uWaves[4];
uniform float uPx;

const float CAM_DIST = 26.0;
const float DISK_IN = 3.0;
const float DISK_OUT = 8.0;
const int MAX_STEPS = 260;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return v;
}

vec3 blackbody(float t) {
  t = clamp(t, 1000.0, 40000.0) / 100.0;
  vec3 c;
  c.r = t <= 66.0 ? 1.0 : 1.292936 * pow(t - 60.0, -0.1332048);
  c.g = t <= 66.0 ? 0.3900816 * log(t) - 0.6318414 : 1.129891 * pow(t - 60.0, -0.0755148);
  c.b = t >= 66.0 ? 1.0 : (t <= 19.0 ? 0.0 : 0.5432068 * log(t - 10.0) - 1.1962541);
  c = clamp(c, 0.0, 1.0);
  return c * c;
}

vec3 starLayer(vec3 d, float scale, float density, float sharpness) {
  vec3 p = d * scale;
  vec3 cell = floor(p);
  vec3 f = fract(p) - 0.5;
  float h = hash(cell);
  if (h < density) return vec3(0.0);
  vec3 offset = vec3(hash(cell + 1.3), hash(cell + 2.7), hash(cell + 5.1)) - 0.5;
  float dist = length(f - offset * 0.5);
  float brightness = pow(hash(cell + 9.1), 5.0) * 6.0 + 0.15;
  vec3 tint = blackbody(3000.0 + hash(cell + 4.4) * 9000.0);
  return tint * brightness * exp(-dist * dist * sharpness);
}

vec3 sky(vec3 d) {
  float n1 = fbm(d * 2.2 + 3.0);
  float n2 = fbm(d * 4.5 - 7.0);
  vec3 col = vec3(0.16, 0.07, 0.38) * pow(n1, 3.0) * 0.22
           + vec3(0.05, 0.16, 0.30) * pow(n2, 4.0) * 0.18;
  col += starLayer(d, 80.0, 0.955, 70.0);
  col += starLayer(d, 190.0, 0.965, 110.0) * 0.6;
  return col;
}

vec4 disk(vec3 hit, vec3 dir) {
  float r = length(hit.xz);
  if (r < DISK_IN || r > DISK_OUT) return vec4(0.0);

  float phi = atan(hit.z, hit.x);
  float beta = sqrt(0.5 / (r - 1.0));
  vec3 orbit = vec3(-sin(phi), 0.0, cos(phi));
  float gamma = 1.0 / sqrt(1.0 - beta * beta);
  float doppler = 1.0 / (gamma * (1.0 + beta * dot(orbit, dir)));
  float g = doppler * sqrt(1.0 - 1.0 / r);

  float x = DISK_IN / r;
  float profile = x * x * x * (1.0 - sqrt(x)) / 0.05666;

  float omega = beta / r;
  float cycle = 10.0;
  float pa = fract(uTime / cycle);
  float pb = fract(uTime / cycle + 0.5);
  float wa = 1.0 - abs(2.0 * pa - 1.0);
  float aa = phi - omega * pa * cycle * 1.4;
  float ab = phi - omega * pb * cycle * 1.4;
  float ta = fbm(vec3(cos(aa) * 2.4, sin(aa) * 2.4, r * 1.5));
  float tb = fbm(vec3(cos(ab) * 2.4 + 11.0, sin(ab) * 2.4, r * 1.5));
  float turb = mix(tb, ta, wa);

  float temp = 5400.0 * pow(profile, 0.25) * g;
  float intensity = profile * pow(g, 4.0) * (0.45 + 1.1 * turb * turb);

  float alpha = smoothstep(DISK_IN, DISK_IN + 0.35, r)
              * (1.0 - smoothstep(DISK_OUT * 0.55, DISK_OUT, r));
  alpha *= clamp(0.45 + 0.9 * turb, 0.0, 1.0);

  return vec4(blackbody(temp) * intensity * 3.2, alpha);
}

vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec3 camPos = vec3(0.0, sin(uElev), -cos(uElev)) * CAM_DIST;
  vec3 forward = -normalize(camPos);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);

  vec2 frag = gl_FragCoord.xy;

  for (int i = 0; i < 4; i++) {
    vec4 w = uWaves[i];
    if (w.w > 0.0) {
      vec2 q = frag - w.xy;
      float d = max(length(q), 1.0);
      frag -= q / d * w.w * exp(-pow((d - w.z) / (28.0 * uPx), 2.0));
    }
  }

  if (uLens.z > 0.0) {
    vec2 q = frag - uLens.xy;
    frag -= q * (uLens.z * uLens.z) / max(dot(q, q), 1.0);
  }

  vec2 p = (frag - uCenter) / uScale;
  vec3 pos = camPos;
  vec3 vel = normalize(forward * CAM_DIST + right * p.x + up * p.y);
  float h2 = dot(cross(pos, vel), cross(pos, vel));

  vec3 col = vec3(0.0);
  float transmittance = 1.0;
  bool captured = false;

  for (int i = 0; i < MAX_STEPS; i++) {
    float r = length(pos);
    if (r < 1.0) { captured = true; break; }
    if (r > CAM_DIST + 4.0 && dot(pos, vel) > 0.0) break;
    if (transmittance < 0.01) break;

    float dt = 0.045 * r;
    vec3 prev = pos;
    vel += -1.5 * h2 * pos / pow(r, 5.0) * dt;
    pos += vel * dt;

    if (prev.y * pos.y < 0.0) {
      vec3 hit = mix(prev, pos, prev.y / (prev.y - pos.y));
      vec4 d = disk(hit, normalize(vel));
      col += transmittance * d.rgb * d.a;
      transmittance *= 1.0 - d.a;
    }
  }

  if (!captured) col += transmittance * sky(normalize(vel));

  col = aces(col * 1.1);
  gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}
`;

interface BlackHoleProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  shadowScale?: number;
  className?: string;
}

const SHADOW_RADIUS_RS = 2.6;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export const BlackHole: React.FC<BlackHoleProps> = ({ anchorRef, shadowScale = 1.3, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) {
      canvas.style.display = 'none';
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uCenter = gl.getUniformLocation(program, 'uCenter');
    const uScale = gl.getUniformLocation(program, 'uScale');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uElev = gl.getUniformLocation(program, 'uElev');
    const uLens = gl.getUniformLocation(program, 'uLens');
    const uWaves = gl.getUniformLocation(program, 'uWaves');
    const uPx = gl.getUniformLocation(program, 'uPx');
    const waveData = new Float32Array(16);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let quality = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    let frame = 0;
    let visible = true;
    let lastKey = '';
    let slowFrames = 0;
    let lastTime = performance.now();
    const start = lastTime;

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!visible) return;

      const delta = now - lastTime;
      lastTime = now;
      if (delta > 34 && quality > 0.4) {
        if (++slowFrames > 20) {
          quality = Math.max(0.4, quality * 0.8);
          slowFrames = 0;
        }
      } else {
        slowFrames = 0;
      }

      const canvasRect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(canvasRect.width * quality));
      const height = Math.max(1, Math.round(canvasRect.height * quality));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const anchor = anchorRef.current?.getBoundingClientRect();
      const scaleX = width / canvasRect.width;
      const cx = anchor ? (anchor.left + anchor.width / 2 - canvasRect.left) * scaleX : width / 2;
      const cy = anchor ? height - (anchor.top + anchor.height / 2 - canvasRect.top) * scaleX : height / 2;
      const shadowPx = anchor ? (anchor.width / 2) * shadowScale * scaleX : Math.min(width, height) * 0.15;

      const lensX = (cursorState.x - canvasRect.left) * scaleX;
      const lensY = height - (cursorState.y - canvasRect.top) * scaleX;
      const lensR = cursorState.einsteinRadius * scaleX;

      waveData.fill(0);
      cursorState.waves.slice(-4).forEach((wave, i) => {
        const { radius, amplitude } = waveAt(wave, now);
        waveData.set([
          (wave.x - canvasRect.left) * scaleX,
          height - (wave.y - canvasRect.top) * scaleX,
          radius * scaleX,
          amplitude * scaleX,
        ], i * 4);
      });

      const key = `${width}x${height}:${cx.toFixed(1)},${cy.toFixed(1)},${shadowPx.toFixed(1)}:${lensX.toFixed(1)},${lensY.toFixed(1)},${lensR.toFixed(2)}`;
      if (reducedMotion && key === lastKey) return;
      lastKey = key;

      gl.uniform2f(uRes, width, height);
      gl.uniform2f(uCenter, cx, cy);
      gl.uniform1f(uScale, shadowPx / SHADOW_RADIUS_RS);
      gl.uniform1f(uTime, reducedMotion ? 4 : (now - start) / 1000);
      gl.uniform1f(uElev, 0.16);
      gl.uniform3f(uLens, lensX, lensY, lensR);
      gl.uniform4fv(uWaves, waveData);
      gl.uniform1f(uPx, scaleX);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    frame = requestAnimationFrame(render);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [anchorRef, shadowScale]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};
