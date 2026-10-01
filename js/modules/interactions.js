// Microinterações: cartões 3D, botões magnéticos e revelação no scroll.

const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export function initTilt() {
  if (!fine()) return;

  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest("[data-tilt]");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = Number(el.dataset.tiltMax || 8);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.dataset.baseTransition ??= getComputedStyle(el).transition;
    el.style.transition = `${el.dataset.baseTransition}, transform 0.12s ease-out`;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
  });

  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest("[data-tilt]");
    if (!el || el.contains(e.relatedTarget)) return;
    el.style.transition = `${el.dataset.baseTransition ?? "all 0s"}, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.transform = "";
  });
}

export function initMagnetic() {
  if (!fine()) return;

  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest("[data-magnetic]");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--bx", `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
    el.style.setProperty("--by", `${(e.clientY - r.top - r.height / 2) * 0.25}px`);
  });
  document.addEventListener("pointerout", (e) => {
    const el = e.target.closest("[data-magnetic]");
    if (!el || el.contains(e.relatedTarget)) return;
    el.style.setProperty("--bx", "0px");
    el.style.setProperty("--by", "0px");
  });
}

export function initReveal({ reduced }) {
  if (reduced || !("IntersectionObserver" in window)) return;
  const items = [...document.querySelectorAll("[data-reveal], [data-draw]")];
  document.documentElement.classList.add("reveal-ready");

  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }),
    { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
  );
  requestAnimationFrame(() => items.forEach((el) => io.observe(el)));
}
