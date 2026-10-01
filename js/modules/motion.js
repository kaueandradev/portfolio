import { pointer } from "./cursor.js";

// Movimentos ligados ao mouse e ao scroll: luz no nome, leve deslocamento da abertura,
// planeta e nebulosas em parallax.

export function initHeroMotion({ reduced }) {
  const name = document.getElementById("hero-name");
  const inner = document.getElementById("hero-inner");
  const planet = document.querySelector(".hero__planet");
  const nebulas = [...document.querySelectorAll(".space__nebula")];
  const cue = document.querySelector(".hero__cue");
  if (reduced) return;

  let lx = 0.5, ly = 0.4, sx = 0, sy = 0;
  const loop = () => {
    const y = scrollY;
    const tx = pointer.active ? pointer.x / innerWidth : 0.5;
    const ty = pointer.active ? pointer.y / innerHeight : 0.4;

    if (y < innerHeight * 1.2) {
      // Reflexo de luz no nome acompanha o cursor.
      const r = name.getBoundingClientRect();
      const nx = pointer.active ? (pointer.x - r.left) / r.width : 0.5;
      const ny = pointer.active ? (pointer.y - r.top) / r.height : 0.4;
      lx += (nx - lx) * 0.1;
      ly += (ny - ly) * 0.1;
      name.style.setProperty("--lx", `${lx * 100}%`);
      name.style.setProperty("--ly", `${ly * 100}%`);

      // Deslocamento suave do bloco com o mouse e afastamento no scroll.
      sx += ((tx - 0.5) * -14 - sx) * 0.06;
      sy += ((ty - 0.5) * -10 - sy) * 0.06;
      inner.style.transform = `translate3d(${sx}px, ${y * 0.25 + sy}px, 0)`;
      inner.style.opacity = String(Math.max(0, 1 - y / (innerHeight * 0.8)));

      planet.style.setProperty("--px", `${(tx - 0.5) * -40}px`);
      planet.style.setProperty("--py", `${(ty - 0.5) * -20 + y * 0.35}px`);
      cue.style.opacity = String(Math.max(0, 1 - y / 200));
    }

    nebulas.forEach((n, i) => {
      const k = (i + 1) * 18;
      n.style.setProperty("--nx", `${(tx - 0.5) * -k}px`);
      n.style.setProperty("--ny", `${(ty - 0.5) * -k - y * 0.05 * (i + 1)}px`);
    });
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

