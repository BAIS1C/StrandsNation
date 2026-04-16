'use client';

import { useRef, useEffect } from 'react';
import styles from './ParticleHero.module.css';

// ─── STRANDS BnW LOGO COORDINATES (extracted from actual SVG paths) ───
const LOGO_RAW: [number, number][] = [
  [0.0261,-0.4899],[0.0442,-0.4655],[0.0562,-0.4422],[0.0837,-0.4269],[0.1111,-0.4114],
  [0.1384,-0.3958],[0.1657,-0.3801],[0.1931,-0.3646],[0.2206,-0.3492],[0.2472,-0.3483],
  [0.277,-0.354],[0.304,-0.3409],[0.3169,-0.3133],[0.311,-0.283],[0.2865,-0.2639],
  [0.2553,-0.2632],[0.2317,-0.2832],[0.2258,-0.3128],[0.2095,-0.3343],[0.1818,-0.3493],
  [0.1546,-0.365],[0.1271,-0.3804],[0.0997,-0.3959],[0.0724,-0.4116],[0.0451,-0.4272],
  [0.0226,-0.4099],[-0.0078,-0.4066],[-0.0294,-0.3981],[-0.0478,-0.3726],[-0.0662,-0.347],
  [-0.0846,-0.3215],[-0.1029,-0.2959],[-0.1207,-0.2699],[-0.1395,-0.2446],[-0.1291,-0.2262],
  [-0.1019,-0.2103],[-0.0747,-0.1945],[-0.0477,-0.1783],[-0.0203,-0.1627],[0.007,-0.1471],
  [0.034,-0.1309],[0.061,-0.1147],[0.0881,-0.0987],[0.1151,-0.0825],[0.1419,-0.066],
  [0.1687,-0.0495],[0.1955,-0.033],[0.2223,-0.0164],[0.2507,-0.0082],[0.281,-0.0129],
  [0.3079,0.0014],[0.3192,0.0294],[0.3109,0.0583],[0.2856,0.0753],[0.2791,0.1008],
  [0.2794,0.1322],[0.2798,0.1637],[0.2802,0.1952],[0.2805,0.2267],[0.2804,0.2582],
  [0.3078,0.2698],[0.3219,0.2973],[0.3167,0.3281],[0.2923,0.347],[0.2621,0.3492],
  [0.2358,0.3362],[0.2078,0.3505],[0.1802,0.3658],[0.1527,0.381],[0.1249,0.3958],
  [0.0971,0.4107],[0.0695,0.4256],[0.0415,0.4399],[0.0409,0.4686],[0.0231,0.4934],
  [-0.0068,0.5],[-0.0339,0.4877],[-0.0486,0.461],[-0.0592,0.4358],[-0.0865,0.4201],
  [-0.1142,0.4051],[-0.1418,0.3899],[-0.1691,0.3743],[-0.1966,0.359],[-0.2236,0.3428],
  [-0.2494,0.3454],[-0.2792,0.3509],[-0.306,0.337],[-0.3204,0.3096],[-0.3128,0.2793],
  [-0.2879,0.2608],[-0.2574,0.2616],[-0.2334,0.2805],[-0.2271,0.3106],[-0.21,0.3311],
  [-0.1822,0.346],[-0.155,0.3618],[-0.1275,0.3771],[-0.0999,0.3922],[-0.0725,0.4077],
  [-0.0451,0.4233],[-0.0193,0.4092],[0.0068,0.3962],[0.0249,0.3704],[0.0429,0.3446],
  [0.0609,0.3187],[0.079,0.293],[0.0971,0.2673],[0.1152,0.2415],[0.1325,0.2152],
  [0.1065,0.1998],[0.0794,0.1837],[0.0523,0.1677],[0.0253,0.1516],[-0.0016,0.1351],
  [-0.0284,0.1186],[-0.0552,0.1022],[-0.0823,0.0861],[-0.1097,0.0707],[-0.137,0.055],
  [-0.1641,0.0389],[-0.1913,0.0231],[-0.2185,0.0073],[-0.2451,-0.0067],[-0.274,0.0025],
  [-0.3029,-0.0076],[-0.3187,-0.0344],[-0.316,-0.0643],[-0.2943,-0.0861],[-0.2842,-0.1075],
  [-0.2842,-0.1389],[-0.2842,-0.1704],[-0.2842,-0.2019],[-0.2841,-0.2334],[-0.2854,-0.2639],
  [-0.3112,-0.2795],[-0.3219,-0.3084],[-0.3114,-0.3376],[-0.2844,-0.3533],[-0.2542,-0.3495],
  [-0.2275,-0.3455],[-0.2003,-0.3612],[-0.1729,-0.3768],[-0.1455,-0.3922],[-0.1181,-0.4077],
  [-0.0906,-0.4231],[-0.0629,-0.4381],[-0.0429,-0.4588],[-0.0297,-0.4854],[-0.0031,-0.5],
  [0.0525,-0.1016],[0.088,-0.0796],[0.1233,-0.0574],[0.1591,-0.036],[0.1944,-0.0138],
  [0.2303,0.0075],[0.2103,0.0318],[0.1697,0.0416],[0.1289,0.0504],[0.0884,0.0604],
  [0.0478,0.0701],[0.0071,0.0791],[-0.0334,0.0891],[-0.0702,0.0737],[-0.1061,0.0524],
  [-0.1423,0.0316],[-0.1785,0.0108],[-0.2144,-0.0104],[-0.2286,-0.0421],[-0.1893,-0.0542],
  [-0.1486,-0.0635],[-0.1083,-0.0741],[-0.0678,-0.0842],[-0.0273,-0.0944],[0.0132,-0.104],
  [-0.1569,-0.2216],[-0.1341,-0.2086],[-0.1115,-0.1952],[-0.0885,-0.1823],[-0.0657,-0.1692],
  [-0.0427,-0.1562],[-0.0196,-0.1435],[0.0034,-0.1308],[0.0108,-0.1178],[-0.0148,-0.1116],
  [-0.0405,-0.1058],[-0.066,-0.0993],[-0.0917,-0.0933],[-0.1174,-0.0873],[-0.1429,-0.0809],
  [-0.1685,-0.0746],[-0.1941,-0.0682],[-0.2197,-0.062],[-0.2393,-0.0725],[-0.2483,-0.0927],
  [-0.2333,-0.1143],[-0.2176,-0.1355],[-0.2025,-0.1571],[-0.1873,-0.1786],[-0.1718,-0.1999],
  [0.2292,0.042],[0.2415,0.0643],[0.2281,0.0863],[0.2127,0.1072],[0.1974,0.1281],
  [0.1828,0.1494],[0.1671,0.1701],[0.1524,0.1914],[0.1333,0.1961],[0.1112,0.1826],
  [0.089,0.1691],[0.0668,0.1558],[0.0444,0.1427],[0.022,0.1296],[-0.0003,0.1165],
  [-0.0214,0.1017],[0.0021,0.0946],[0.0273,0.0887],[0.0526,0.0829],[0.0779,0.0771],
  [0.1031,0.0713],[0.1283,0.0652],[0.1535,0.0592],[0.1787,0.0533],[0.2041,0.0479],
  [0.1486,0.225],[0.1707,0.2364],[0.1921,0.2493],[0.2132,0.2624],[0.2348,0.275],
  [0.2291,0.2972],[0.2286,0.3208],[0.2067,0.3328],[0.1847,0.3445],[0.1626,0.356],
  [0.1407,0.3681],[0.1188,0.38],[0.0969,0.3918],[0.075,0.4039],[0.0532,0.416],
  [0.0312,0.4256],[0.0188,0.4081],[0.033,0.3877],[0.0474,0.3674],[0.0618,0.347],
  [0.0762,0.3266],[0.0906,0.3062],[0.1052,0.286],[0.1196,0.2656],[0.134,0.2453],
  [-0.0391,-0.4309],[-0.0416,-0.4106],[-0.0553,-0.3923],[-0.0685,-0.3738],[-0.0816,-0.355],
  [-0.0945,-0.3362],[-0.1077,-0.3177],[-0.1213,-0.2993],[-0.1347,-0.2809],[-0.1476,-0.2621],
  [-0.1618,-0.2449],[-0.1816,-0.2562],[-0.201,-0.2682],[-0.2204,-0.2802],[-0.2319,-0.2954],
  [-0.2316,-0.3178],[-0.2185,-0.332],[-0.1986,-0.3431],[-0.1788,-0.3545],[-0.1591,-0.366],
  [-0.1391,-0.377],[-0.119,-0.3878],[-0.099,-0.3988],[-0.0791,-0.4098],[-0.0591,-0.4208],
  [0.2556,0.073],[0.2633,0.0847],[0.2633,0.104],[0.2633,0.1234],[0.2633,0.1428],
  [0.2633,0.1621],[0.2633,0.1815],[0.2633,0.2009],[0.2633,0.2203],[0.2633,0.2396],
  [0.2633,0.259],[0.247,0.2646],[0.2301,0.2552],[0.2136,0.245],[0.1971,0.2348],
  [0.1807,0.2246],[0.1643,0.2143],[0.1652,0.1989],[0.1762,0.1829],[0.1873,0.1671],
  [0.1989,0.1516],[0.2105,0.1361],[0.2217,0.1202],[0.233,0.1045],[0.2445,0.0889],
  [-0.2438,-0.2743],[-0.2279,-0.2666],[-0.2126,-0.2575],[-0.1974,-0.2483],[-0.1821,-0.2392],
  [-0.1724,-0.2265],[-0.1825,-0.2122],[-0.1931,-0.1979],[-0.2034,-0.1834],[-0.2136,-0.1687],
  [-0.2237,-0.1541],[-0.2339,-0.1395],[-0.2443,-0.1251],[-0.2548,-0.1107],[-0.2653,-0.0963],
  [-0.2673,-0.1119],[-0.2677,-0.1297],[-0.268,-0.1475],[-0.2683,-0.1653],[-0.2686,-0.1831],
  [-0.2687,-0.2009],[-0.2688,-0.2187],[-0.2687,-0.2365],[-0.2686,-0.2543],[-0.2591,-0.2657],
];

// Exact Strands logo gradient: cyan → blue → purple → violet → magenta
const BANNER_COLORS = ['#13F8FD','#29CEFD','#44ADFB','#628BF9','#8E6BFC','#B550FF','#DA34F2','#EA32FD'];
const CYCLE = 4000;

interface PhaseRange { start: number; end: number }
const PHASES: Record<string, PhaseRange> = {
  GLOBE:            { start: 0,     end: 0.28 },
  LOGO_FORM:        { start: 0.28,  end: 0.40 },
  LOGO_HOLD_BW:     { start: 0.40,  end: 0.48 },
  LOGO_HOLD_COLOR:  { start: 0.48,  end: 0.82 },
  GLOBE_RETURN:     { start: 0.82,  end: 1.0 },
};

function getPhase(t: number) {
  for (const [name, range] of Object.entries(PHASES)) {
    if (t >= range.start && t < range.end) {
      return { name, progress: (t - range.start) / (range.end - range.start) };
    }
  }
  return { name: 'GLOBE', progress: 0 };
}

function getGlobePoint(index: number, total: number, time: number) {
  const latLines = 12, lonLines = 20;
  const gridIdx = index % (latLines * lonLines);
  const lat = (Math.floor(gridIdx / lonLines) / (latLines - 1)) * Math.PI - Math.PI / 2;
  const lon = ((gridIdx % lonLines) / lonLines) * Math.PI * 2 + time * 0.001;
  const r = 0.38;
  const x = Math.cos(lat) * Math.sin(lon) * r;
  const y = Math.sin(lat) * r;
  const z = Math.cos(lat) * Math.cos(lon) * r;
  const perspective = 2 / (2 + z);
  const lonSector = Math.floor((((lon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * 8);
  return { x: x * perspective, y: y * perspective, z, scale: perspective, isPeel: lonSector % 2 === 0 };
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cx = 0, cy = 0;
    let mouseX = -9999, mouseY = -9999;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = rect?.width || 400; H = rect?.height || 400;
      cx = W / 2; cy = H / 2;
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);
    resize();

    const COUNT = W > 768 ? 450 : W > 480 ? 300 : 180;
    const dim = () => Math.min(W, H);

    // Particle state arrays (SoA for perf)
    const px = new Float32Array(COUNT), py = new Float32Array(COUNT);
    const tx = new Float32Array(COUNT), ty = new Float32Array(COUNT);
    const pr = new Float32Array(COUNT), pg = new Float32Array(COUNT), pb = new Float32Array(COUNT);
    const tr = new Float32Array(COUNT), tg = new Float32Array(COUNT), tb = new Float32Array(COUNT);
    const opacity = new Float32Array(COUNT), size = new Float32Array(COUNT);
    const baseSize = new Float32Array(COUNT), speed = new Float32Array(COUNT);
    const connected = new Uint8Array(COUNT);

    // Init in globe positions
    for (let i = 0; i < COUNT; i++) {
      const gp = getGlobePoint(i, COUNT, 0);
      const d = dim();
      px[i] = cx + gp.x * d; py[i] = cy + gp.y * d;
      tx[i] = px[i]; ty[i] = py[i];
      pr[i] = tr[i] = 200; pg[i] = tg[i] = 200; pb[i] = tb[i] = 200;
      baseSize[i] = 1.5 + Math.random() * 0.8;
      size[i] = baseSize[i];
      speed[i] = 0.5 + Math.random() * 0.5;
      opacity[i] = 0.5;
      connected[i] = 1;
    }

    let lastPhase = '';
    const startTime = performance.now();
    let rafId: number;

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const elapsed = now - startTime;
      const t = (elapsed % CYCLE) / CYCLE;
      const phase = getPhase(t);
      const d = dim();

      ctx.clearRect(0, 0, W, H);

      if (phase.name !== lastPhase) { lastPhase = phase.name; }

      // Update targets
      for (let i = 0; i < COUNT; i++) {
        switch (phase.name) {
          case 'GLOBE': {
            const gp = getGlobePoint(i, COUNT, elapsed);
            tx[i] = cx + gp.x * d; ty[i] = cy + gp.y * d;
            tr[i] = gp.isPeel ? 200 : 120; tg[i] = tr[i]; tb[i] = tr[i];
            opacity[i] = (gp.scale * 0.5 + 0.3) * (gp.isPeel ? 0.8 : 0.45);
            size[i] = baseSize[i] * gp.scale;
            connected[i] = gp.isPeel ? 1 : 0;
            break;
          }
          case 'LOGO_FORM':
          case 'LOGO_HOLD_BW': {
            const coord = LOGO_RAW[i % LOGO_RAW.length];
            tx[i] = cx + coord[0] * 0.85 * d;
            ty[i] = cy + coord[1] * 0.85 * d;
            tr[i] = 248; tg[i] = 248; tb[i] = 248;
            opacity[i] = 0.85; size[i] = baseSize[i] * 1.2;
            connected[i] = 1;
            break;
          }
          case 'LOGO_HOLD_COLOR': {
            const coord2 = LOGO_RAW[i % LOGO_RAW.length];
            tx[i] = cx + coord2[0] * 0.85 * d;
            ty[i] = cy + coord2[1] * 0.85 * d;
            // Map x-position across full gradient (logo x spans ~-0.33 to +0.33)
            const norm = Math.max(0, Math.min(1, (coord2[0] + 0.35) / 0.7));
            const ci = Math.min(BANNER_COLORS.length - 1, Math.floor(norm * BANNER_COLORS.length));
            const hex = BANNER_COLORS[ci];
            tr[i] = parseInt(hex.slice(1, 3), 16);
            tg[i] = parseInt(hex.slice(3, 5), 16);
            tb[i] = parseInt(hex.slice(5, 7), 16);
            opacity[i] = 0.9; connected[i] = 1;
            break;
          }
          case 'GLOBE_RETURN': {
            // Morph directly from logo back to globe — no scatter
            const gp = getGlobePoint(i, COUNT, elapsed);
            tx[i] = cx + gp.x * d; ty[i] = cy + gp.y * d;
            // Fade color from current back to grey
            tr[i] = 200; tg[i] = 200; tb[i] = 200;
            opacity[i] = (gp.scale * 0.5 + 0.3) * (gp.isPeel ? 0.8 : 0.45);
            size[i] = baseSize[i] * gp.scale;
            connected[i] = gp.isPeel ? 1 : 0;
            break;
          }
        }
      }

      // Physics + draw
      const moveSpeed = phase.name === 'GLOBE' || phase.name === 'GLOBE_RETURN' ? 0.25
        : phase.name.includes('FORM') ? 0.22 + phase.progress * 0.1 : 0.2;

      // Globe wireframe
      if (phase.name === 'GLOBE' || phase.name === 'GLOBE_RETURN') {
        const wireOpacity = phase.name === 'GLOBE' ? 0.25
          : 0.25 * phase.progress;
        if (wireOpacity > 0.01) {
          const r = 0.38 * d;
          const rotY = elapsed * 0.001;
          ctx.strokeStyle = `rgba(100,100,100,${wireOpacity})`;
          ctx.lineWidth = 0.5;
          for (let lat = -80; lat <= 80; lat += 20) {
            const latR = (lat / 180) * Math.PI;
            ctx.beginPath(); let started = false;
            for (let lon = 0; lon <= 360; lon += 5) {
              const lonR = (lon / 180) * Math.PI + rotY;
              const z3 = Math.cos(latR) * Math.cos(lonR);
              if (z3 < -0.1) { started = false; continue; }
              const p = 2 / (2 + z3);
              const sx = cx + Math.cos(latR) * Math.sin(lonR) * p * r;
              const sy = cy + Math.sin(latR) * p * r;
              if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
            }
            ctx.stroke();
          }
          for (let lon = 0; lon < 360; lon += 45) {
            const lonR = (lon / 180) * Math.PI + rotY;
            ctx.beginPath(); let started = false;
            for (let lat2 = -90; lat2 <= 90; lat2 += 5) {
              const latR = (lat2 / 180) * Math.PI;
              const z3 = Math.cos(latR) * Math.cos(lonR);
              if (z3 < -0.1) { started = false; continue; }
              const p = 2 / (2 + z3);
              const sx = cx + Math.cos(latR) * Math.sin(lonR) * p * r;
              const sy = cy + Math.sin(latR) * p * r;
              if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
            }
            ctx.stroke();
          }
        }
      }

      // Connection lines
      if (phase.name.includes('LOGO_HOLD') || phase.name === 'LOGO_FORM') {
        const lineOp = phase.name === 'LOGO_FORM' ? phase.progress * 0.08 : 0.08;
        ctx.strokeStyle = `rgba(255,255,255,${lineOp})`;
        ctx.lineWidth = 0.4;
        for (let i = 0; i < COUNT; i += 2) {
          if (!connected[i]) continue;
          for (let j = i + 3; j < COUNT; j += 3) {
            if (!connected[j]) continue;
            const ddx = px[i] - px[j], ddy = py[i] - py[j];
            if (ddx * ddx + ddy * ddy < 900) {
              ctx.beginPath(); ctx.moveTo(px[i], py[i]); ctx.lineTo(px[j], py[j]); ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < COUNT; i++) {
        // Color lerp
        pr[i] += (tr[i] - pr[i]) * 0.25;
        pg[i] += (tg[i] - pg[i]) * 0.25;
        pb[i] += (tb[i] - pb[i]) * 0.25;

        // Move
        let vx = (tx[i] - px[i]) * moveSpeed * speed[i];
        let vy = (ty[i] - py[i]) * moveSpeed * speed[i];
        // Ambient drift — particles never fully stop
        vx += Math.sin(elapsed * 0.002 + i * 0.7) * 0.15;
        vy += Math.cos(elapsed * 0.002 + i * 1.1) * 0.15;

        // Mouse repulsion
        const mdx = px[i] - mouseX, mdy = py[i] - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 100 && mDist > 0) {
          const f = (100 - mDist) / 100;
          vx += (mdx / mDist) * f * 4; vy += (mdy / mDist) * f * 4;
        }

        px[i] += vx; py[i] += vy;

        // Draw
        if (opacity[i] < 0.02) continue;
        ctx.globalAlpha = Math.min(1, opacity[i]);
        ctx.fillStyle = `rgb(${pr[i] | 0},${pg[i] | 0},${pb[i] | 0})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], Math.max(0.5, size[i]), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    // Check reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
