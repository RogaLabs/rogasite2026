/* Roga Labs · interações do site */

// ⚙️ Ajuste aqui os canais de contato
const CONFIG = {
  email: "contato@rogalabs.com",          // e-mail que recebe os contatos do formulário
  whatsapp: "5582900000000",               // DDI + DDD + número, só dígitos
  whatsappMsg: "Olá! Vim pelo site da Roga Labs e gostaria de conversar sobre um projeto."
};

document.documentElement.classList.remove("no-js");

// Header com fundo ao rolar
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  document.body.classList.toggle("nav-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

// Animação de entrada
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 70}ms`;
      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-in"));
}

// Links dos serviços pré-selecionam o assunto do formulário
document.querySelectorAll("[data-assunto]").forEach((link) => {
  link.addEventListener("click", () => {
    const radio = document.querySelector(`input[name="assunto"][value="${link.dataset.assunto}"]`);
    if (radio) radio.checked = true;
    else document.querySelector('input[name="assunto"][value="Outro"]').checked = true;
  });
});

// WhatsApp
const waLink = document.getElementById("whatsapp-link");
if (waLink) waLink.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`;

// Formulário: abre o e-mail já preenchido (troque por um endpoint quando tiver backend/CRM)
const form = document.getElementById("contact-form");
const status = form ? form.querySelector(".form__status") : null;
if (form) form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((f) => {
    const valid = f.value.trim() !== "" && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) { status.textContent = "Preencha nome, e-mail válido e a mensagem."; return; }

  const d = Object.fromEntries(new FormData(form));
  const subject = `[Site] ${d.assunto} · ${d.nome}${d.empresa ? " (" + d.empresa + ")" : ""}`;
  const body = `Nome: ${d.nome}\nE-mail: ${d.email}\nEmpresa: ${d.empresa || "-"}\nAssunto: ${d.assunto}\n\n${d.mensagem}`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Abrimos seu e-mail com a mensagem pronta. É só enviar.";
});

// Fundo animado do hero: sinais de luz percorrendo a grade
(() => {
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector(".hero__canvas");
  const spot = document.querySelector(".hero__spot");
  if (!hero || !canvas) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // brilho que segue o mouse
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
    spot.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  if (reduce) return;
  const ctx = canvas.getContext("2d");
  const CELL = 72;               // mesmo tamanho da grade do CSS
  const MAX = window.innerWidth < 700 ? 6 : 14;
  let w = 0, h = 0, dpr = 1, pulses = [], running = false, last = 0, spawnAt = 0;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth; h = hero.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const rand = (a, b) => a + Math.random() * (b - a);
  const spawn = () => {
    const horizontal = Math.random() < 0.5;
    const dir = Math.random() < 0.5 ? 1 : -1;
    const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
    const p = {
      x: horizontal ? (dir > 0 ? 0 : cols * CELL) : Math.floor(rand(1, cols)) * CELL,
      y: horizontal ? Math.floor(rand(1, rows)) * CELL : (dir > 0 ? 0 : rows * CELL),
      dx: horizontal ? dir : 0, dy: horizontal ? 0 : dir,
      speed: rand(70, 160), len: rand(90, 200), trail: [], life: 1,
      accent: Math.random() < 0.06
    };
    p.trail.push({ x: p.x, y: p.y });
    pulses.push(p);
  };

  const step = (p, dt) => {
    const dist = p.speed * dt;
    const px = p.x, py = p.y;
    p.x += p.dx * dist; p.y += p.dy * dist;
    // ao cruzar uma interseção, às vezes vira 90°
    const crossedX = p.dx && Math.floor(px / CELL) !== Math.floor(p.x / CELL);
    const crossedY = p.dy && Math.floor(py / CELL) !== Math.floor(p.y / CELL);
    if ((crossedX || crossedY) && Math.random() < 0.28) {
      if (crossedX) { p.x = Math.round(p.x / CELL) * CELL; }
      if (crossedY) { p.y = Math.round(p.y / CELL) * CELL; }
      p.trail.push({ x: p.x, y: p.y });
      const turn = Math.random() < 0.5 ? 1 : -1;
      [p.dx, p.dy] = p.dx ? [0, turn] : [turn, 0];
    }
    if (p.x < -CELL || p.y < -CELL || p.x > w + CELL || p.y > h + CELL) p.life -= dt * 2;
  };

  const draw = (p) => {
    // monta o rastro (cabeça + pontos de curva) limitado ao comprimento
    const pts = [{ x: p.x, y: p.y }, ...p.trail.slice().reverse()];
    let remaining = p.len;
    ctx.lineWidth = 1.25; ctx.lineCap = "round";
    const color = p.accent ? "255, 90, 31" : "255, 255, 255";
    for (let i = 0; i < pts.length - 1 && remaining > 0; i++) {
      const a = pts[i], b = pts[i + 1];
      const seg = Math.hypot(b.x - a.x, b.y - a.y);
      const use = Math.min(seg, remaining);
      const ex = a.x + (b.x - a.x) * (use / (seg || 1));
      const ey = a.y + (b.y - a.y) * (use / (seg || 1));
      const t0 = 1 - (p.len - remaining) / p.len, t1 = 1 - (p.len - remaining + use) / p.len;
      const g = ctx.createLinearGradient(a.x, a.y, ex, ey);
      g.addColorStop(0, `rgba(${color}, ${0.55 * t0 * p.life})`);
      g.addColorStop(1, `rgba(${color}, ${0.55 * t1 * p.life})`);
      ctx.strokeStyle = g;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(ex, ey); ctx.stroke();
      remaining -= use;
    }
    if (p.trail.length > 6) p.trail.shift();
    // ponto de luz na cabeça
    ctx.fillStyle = `rgba(${color}, ${0.9 * p.life})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
  };

  const frame = (now) => {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    ctx.clearRect(0, 0, w, h);
    if (now > spawnAt && pulses.length < MAX) { spawn(); spawnAt = now + rand(250, 700); }
    pulses.forEach((p) => { step(p, dt); draw(p); });
    pulses = pulses.filter((p) => p.life > 0);
    requestAnimationFrame(frame);
  };

  const start = () => { if (running) return; running = true; last = performance.now(); requestAnimationFrame(frame); };
  const stop = () => { running = false; };

  resize();
  window.addEventListener("resize", resize);
  // só anima quando o hero está visível e a aba está ativa
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }).observe(hero);
  document.addEventListener("visibilitychange", () => (document.hidden || !visible ? stop() : start()));
})();

// Ano no rodapé
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// Linha do tempo (Quem somos): botões de avançar/voltar
(() => {
  const vp = document.querySelector(".timeline__viewport");
  if (!vp) return;
  const btns = document.querySelectorAll(".tl-btn");
  const item = () => vp.querySelector(".tl__item")?.offsetWidth || 300;
  const update = () => {
    btns[0].disabled = vp.scrollLeft < 4;
    btns[1].disabled = vp.scrollLeft + vp.clientWidth >= vp.scrollWidth - 4;
  };
  btns.forEach((b) => b.addEventListener("click", () => vp.scrollBy({ left: item() * Number(b.dataset.dir), behavior: "smooth" })));
  vp.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// Linha do tempo: arrastar com o mouse
(() => {
  const vp = document.querySelector(".timeline__viewport");
  if (!vp) return;
  let down = false, startX = 0, startLeft = 0, moved = false;
  vp.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true; moved = false; startX = e.clientX; startLeft = vp.scrollLeft;
    vp.classList.add("is-dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    vp.scrollLeft = startLeft - dx;
  });
  const end = () => {
    if (!down) return;
    down = false;
    vp.classList.remove("is-dragging");
    // devolve o encaixe suave no item mais próximo
    const w = vp.querySelector(".tl__item")?.offsetWidth || 300;
    vp.scrollTo({ left: Math.round(vp.scrollLeft / w) * w, behavior: "smooth" });
  };
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
  vp.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  vp.addEventListener("dragstart", (e) => e.preventDefault());
})();
