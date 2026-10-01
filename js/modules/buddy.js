import { pointer } from "./cursor.js";

// Bolinha no canto inferior direito: os olhos seguem o cursor, o corpo inclina
// na direção dele e ela pisca de tempos em tempos. Um clique faz ela pular.
export function initBuddy({ reduced }) {
  const root = document.getElementById("buddy");
  const body = root.querySelector(".buddy__body");
  const eyes = root.querySelector(".buddy__eyes");

  let ex = 0, ey = 0, tilt = 0, wander = 0;

  const loop = (t) => {
    const r = body.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;

    let tx, ty;
    if (pointer.active) {
      const dx = pointer.x - cx, dy = pointer.y - cy;
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 260);
      tx = (dx / d) * reach;
      ty = (dy / d) * reach;
    } else {
      // Sem mouse (celular), olha em volta devagar.
      wander = t * 0.0006;
      tx = Math.sin(wander) * 0.7;
      ty = Math.sin(wander * 1.7) * 0.4;
    }

    ex += (tx - ex) * 0.15;
    ey += (ty - ey) * 0.15;
    tilt += (tx * 10 - tilt) * 0.08;

    eyes.style.translate = `${ex * 9}px ${ey * 7}px`;
    body.style.rotate = `${tilt}deg`;
    requestAnimationFrame(loop);
  };

  const blink = () => {
    root.classList.add("is-blinking");
    setTimeout(() => root.classList.remove("is-blinking"), 130);
  };
  const scheduleBlink = () => {
    setTimeout(() => {
      blink();
      if (Math.random() < 0.25) setTimeout(blink, 220); // às vezes pisca duas vezes
      scheduleBlink();
    }, 2200 + Math.random() * 3800);
  };

  root.addEventListener("click", () => {
    root.classList.remove("is-hopping");
    void root.offsetWidth;
    root.classList.add("is-hopping");
    blink();
  });

  if (reduced) return;
  requestAnimationFrame(loop);
  scheduleBlink();
}
