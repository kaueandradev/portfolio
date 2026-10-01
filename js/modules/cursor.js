// Cursor: um ponto que inverte a cor do que está embaixo (visível no claro e no escuro)
// e cresce sobre links e botões.
// Só em dispositivos com mouse.
export const pointer = { x: innerWidth / 2, y: innerHeight / 2, active: false };

export function initCursor({ reduced }) {
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  addEventListener("pointermove", (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; }, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.active = false; });
  if (!fine || reduced) return;

  document.documentElement.classList.add("has-cursor");
  const root = document.querySelector(".cursor");
  const dot = root.querySelector(".cursor__dot");

  addEventListener("pointermove", (e) => {
    // Posição via "translate" (e não "transform") para o "scale" do hover/clique
    // aumentar o ponto no lugar, sem deslocar a posição.
    dot.style.translate = `${e.clientX}px ${e.clientY}px`;
  }, { passive: true });

  document.addEventListener("pointerover", (e) => {
    root.classList.toggle("is-hover", Boolean(e.target.closest("a, button, [data-cursor]")));
  });
  addEventListener("pointerdown", () => root.classList.add("is-down"));
  addEventListener("pointerup", () => root.classList.remove("is-down"));
  document.addEventListener("mouseleave", () => (root.style.opacity = "0"));
  document.addEventListener("mouseenter", () => (root.style.opacity = "1"));
}
