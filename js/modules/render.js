import { profile, experience, categories, stack, extraIcons } from "../data.js";

const $ = (sel) => document.querySelector(sel);

const arrow =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

const techItem = (name) => {
  const s = stack.find((t) => t.name === name);
  if (!s) {
    const icon = extraIcons[name];
    return `<li>${icon ? `<span class="role__icon"><img src="${icon}" alt="" width="22" height="22" loading="lazy"></span>` : ""}${name}</li>`;
  }
  return `<li><span class="role__icon">${s.icon ? `<img src="${s.icon}" alt="" width="22" height="22" loading="lazy">` : s.svg.replace("<svg ", `<svg style="color:${s.c}" `)}</span>${name}</li>`;
};
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const monthYear = (iso) => `${MONTHS.at(Number(iso.slice(5, 7)) - 1)} ${iso.slice(0, 4)}`;

// "1 ano e 3 meses", calculado a partir da data de início até hoje.
const duration = (iso) => {
  const start = new Date(`${iso}T00:00:00`), now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months--;
  const y = Math.floor(months / 12), m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} ${y === 1 ? "ano" : "anos"}`);
  if (m) parts.push(`${m} ${m === 1 ? "mês" : "meses"}`);
  return parts.join(" e ") || "menos de 1 mês";
};
const period = (e) => `${monthYear(e.start)} até ${e.end ? monthYear(e.end) : "hoje"}`;

const catLabel = (id) => categories.find((c) => c.id === id)?.label ?? id;

export function renderContent() {
  $("#profile-card").href = profile.linkedin;
  $("#year").textContent = new Date().getFullYear();

  $("#xp").innerHTML = experience
    .map(
      (e, i) => `<article class="role role--${e.id}" data-reveal style="--d:${i * 120}">
        <div class="role__aside">
          <span class="role__logo"><img src="${e.logo}" alt="Logo ${e.org ?? e.title}" width="96" height="96" style="scale:${e.logoScale ?? 1}"></span>
          <span class="role__dates">
            <span class="role__period">${period(e)}</span>
            <span class="role__when${e.live ? " role__when--live" : ""}">${e.badge}</span>
            ${e.end ? "" : `<span class="role__duration">${duration(e.start)}</span>`}
          </span>
        </div>
        <div>
          <h3 class="role__name">${e.title}</h3>
          <p class="role__sub">${e.sub}</p>
        </div>
        <div class="role__body">
          <p class="role__desc">${e.desc}</p>
          <ul class="role__tech" aria-label="Tecnologias">${e.skills.map(techItem).join("")}</ul>
        </div>
      </article>`
    )
    .join("");

  $("#tabs").insertAdjacentHTML(
    "beforeend",
    categories
      .map((c, i) => `<button class="tabs__btn${i === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${i === 0}" data-filter="${c.id}">${c.label}</button>`)
      .join("")
  );

  $("#stack-grid").innerHTML = stack
    .map(
      (s, i) => `<li class="tech glass" style="--c:${s.c};--d:${(i % 4) * 70}" data-cat="${s.cat}" data-reveal data-tilt data-tilt-max="10">
        <span class="tech__glow" aria-hidden="true"></span>
        <span class="tech__icon">${s.icon ? `<img src="${s.icon}" alt="" width="52" height="52" loading="lazy">` : s.svg}</span>
        <span class="tech__name">${s.name}</span>
        <span class="tech__cat">${catLabel(s.cat).toLowerCase()}</span>
      </li>`
    )
    .join("");

  const links = [
    `<a class="btn btn--solid" href="${profile.linkedin}" target="_blank" rel="noopener" data-magnetic data-cursor="abrir">LinkedIn ${arrow}</a>`,
    `<a class="btn btn--ghost" href="${profile.github}" target="_blank" rel="noopener" data-magnetic data-cursor="abrir">GitHub ${arrow}</a>`,
  ];
  if (profile.email) {
    $("#footer-mail").innerHTML = `<a class="footer__address" href="mailto:${profile.email}">${profile.email}</a><button class="footer__copy" type="button" id="copy-email" data-email="${profile.email}">Copiar</button>`;
  }
  $("#footer-links").innerHTML = links.join("");
}

// Abas da stack com o "glider" deslizando sob a aba ativa.
export function initTabs() {
  const wrap = $("#tabs");
  const glider = wrap.querySelector(".tabs__glider");
  const buttons = [...wrap.querySelectorAll(".tabs__btn")];

  const move = (btn) => {
    glider.style.width = `${btn.offsetWidth}px`;
    glider.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
  };

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      move(btn);
      const f = btn.dataset.filter;
      document.querySelectorAll(".tech").forEach((el) => el.classList.toggle("is-dim", f !== "todas" && el.dataset.cat !== f));
    })
  );

  const sync = () => move(buttons.find((b) => b.classList.contains("is-active")));
  sync();
  document.fonts?.ready.then(sync);
  addEventListener("resize", sync);
}
