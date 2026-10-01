import { pointer } from "./cursor.js";

// Céu em canvas: três camadas de estrelas com profundidade, que se deslocam contra o mouse
// (parallax), uma luz suave que acompanha o cursor, estrelas cadentes ocasionais e um pulso de "ping" a cada clique.
export function initSpace({ reduced }) {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let w, h, dpr, stars = [], meteors = [], pings = [];
  let ox = 0, oy = 0, gx = innerWidth / 2, gy = innerHeight / 3, lastMeteor = 0;

  const LAYERS = [
    { depth: 8, size: [0.4, 0.9], alpha: 0.55, share: 0.6 },
    { depth: 20, size: [0.7, 1.3], alpha: 0.75, share: 0.3 },
    { depth: 42, size: [1.1, 1.9], alpha: 0.95, share: 0.1 },
  ];
  const TINTS = ["233, 239, 255", "190, 214, 255", "159, 230, 255", "214, 200, 255"];

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const total = Math.round(Math.min(420, (innerWidth * innerHeight) / 4200));
    stars = [];
    LAYERS.forEach((layer, li) => {
      const n = Math.round(total * layer.share);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (layer.size[0] + Math.random() * (layer.size[1] - layer.size[0])) * dpr,
          a: layer.alpha * (0.5 + Math.random() * 0.5),
          tw: Math.random() * Math.PI * 2,
          ts: 0.6 + Math.random() * 1.6,
          li,
          tint: TINTS[(Math.random() * TINTS.length) | 0],
        });
      }
    });
  }

  function spawnMeteor() {
    const fromLeft = Math.random() > 0.5;
    meteors.push({
      x: (fromLeft ? Math.random() * 0.5 : 0.5 + Math.random() * 0.5) * w,
      y: Math.random() * h * 0.4,
      vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 5) * dpr,
      vy: (3 + Math.random() * 2) * dpr,
      life: 1,
    });
  }

  addEventListener("pointerdown", (e) => {
    if (reduced) return;
    pings.push({ x: e.clientX * dpr, y: e.clientY * dpr, r: 0, life: 1 });
  });

  function frame(t) {
    ctx.clearRect(0, 0, w, h);

    // Parallax: o céu se desloca contra o mouse, com inércia.
    const tx = pointer.active ? (pointer.x / innerWidth - 0.5) : 0;
    const ty = pointer.active ? (pointer.y / innerHeight - 0.5) : 0;
    ox += (tx - ox) * 0.05;
    oy += (ty - oy) * 0.05;
    const scrollShift = scrollY * 0.04 * dpr;

    // Luz que segue o cursor.
    gx += ((pointer.active ? pointer.x : innerWidth / 2) - gx) * 0.08;
    gy += ((pointer.active ? pointer.y : innerHeight / 3) - gy) * 0.08;
    const glow = ctx.createRadialGradient(gx * dpr, gy * dpr, 0, gx * dpr, gy * dpr, 380 * dpr);
    glow.addColorStop(0, "rgba(122, 167, 255, 0.13)");
    glow.addColorStop(0.5, "rgba(74, 46, 168, 0.05)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const mx = pointer.x * dpr, my = pointer.y * dpr;
    for (const s of stars) {
      const depth = LAYERS[s.li].depth * dpr;
      let x = s.x - ox * depth * 2;
      let y = s.y - oy * depth * 2 - scrollShift * (s.li + 1);
      x = ((x % w) + w) % w;
      y = ((y % h) + h) % h;

      const twinkle = reduced ? 1 : 0.65 + Math.sin(t * 0.001 * s.ts + s.tw) * 0.35;
      let alpha = s.a * twinkle;
      const d = pointer.active ? Math.hypot(x - mx, y - my) : Infinity;
      const boost = d < 160 * dpr ? 1 - d / (160 * dpr) : 0;
      alpha = Math.min(1, alpha + boost * 0.8);

      ctx.fillStyle = `rgba(${s.tint}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, s.r * (1 + boost * 0.8), 0, Math.PI * 2);
      ctx.fill();
      if (s.li === 2 && alpha > 0.7) {
        ctx.fillStyle = `rgba(${s.tint}, ${alpha * 0.12})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!reduced) {
      // Estrelas cadentes.
      if (t - lastMeteor > 5000 + Math.random() * 6000) { spawnMeteor(); lastMeteor = t; }
      for (const m of meteors) {
        m.x += m.vx; m.y += m.vy; m.life -= 0.014;
        const tail = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        tail.addColorStop(0, `rgba(233, 239, 255, ${m.life})`);
        tail.addColorStop(1, "rgba(233, 239, 255, 0)");
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.4 * dpr;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14); ctx.stroke();
      }
      meteors = meteors.filter((m) => m.life > 0);

      // Pulso do clique.
      for (const p of pings) {
        p.r += 6 * dpr; p.life -= 0.022;
        ctx.strokeStyle = `rgba(159, 230, 255, ${p.life * 0.6})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.stroke();
      }
      pings = pings.filter((p) => p.life > 0);

      requestAnimationFrame(frame);
    }
  }

  resize();
  addEventListener("resize", resize);
  requestAnimationFrame(frame);
}
