import { profile } from "./data.js";
import { renderContent, initTabs } from "./modules/render.js";
import { initCursor } from "./modules/cursor.js";
import { initSpace } from "./modules/space.js";
import { initTilt, initMagnetic, initReveal } from "./modules/interactions.js";
import { initHeroMotion } from "./modules/motion.js";
import { toast } from "./modules/toast.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

renderContent();
initCursor({ reduced });
initSpace({ reduced });
initTilt();
initMagnetic();
initReveal({ reduced });
initTabs();
initHeroMotion({ reduced });

// Copiar e-mail (só existe se profile.email estiver preenchido).
document.getElementById("copy-email")?.addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(profile.email);
    btn.textContent = "Copiado";
    setTimeout(() => (btn.textContent = "Copiar"), 1800);
    toast("E-mail copiado");
  } catch {
    getSelection().selectAllChildren(document.querySelector(".footer__address"));
    toast("E-mail selecionado, é só copiar");
  }
});
