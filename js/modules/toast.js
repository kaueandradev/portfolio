let timer;

export function toast(message, ms = 2600) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("is-visible"), ms);
}
