// project/scripts/index.js

// ---------- helpers ----------
function qs(sel, scope = document) {
  return scope.querySelector(sel);
}
function setText(sel, text) {
  const el = qs(sel);
  if (el) el.textContent = text;
}

// ---------- nav (safe/no-op if not present) ----------
function setupNav() {
  const btn = qs("#menu");
  const nav = qs("nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.classList.toggle("open");
  });
}

// ---------- footer ----------
function setupFooter() {
  setText("#year", new Date().getFullYear());

  const greeting = qs("#greeting");
  if (!greeting) return;

  const hr = new Date().getHours();
  const text = hr < 12 ? "Good morning." : hr < 18 ? "Good afternoon." : "Good evening.";
  greeting.textContent = `${text} Welcome to the student project site.`;
}

// ---------- index page feature ----------
function setupMessageBuilder() {
  const clientName = qs("#clientName");
  const serviceType = qs("#serviceType");
  const btn = qs("#buildMessage");
  const out = qs("#messageOut");

  if (!clientName || !serviceType || !btn || !out) return;

  // restore last message
  const saved = localStorage.getItem("wm_lastMessage");
  if (saved) out.textContent = saved;

  btn.addEventListener("click", () => {
    const name = clientName.value.trim() || "there";
    const type = serviceType.value;

    let subject = "health insurance";
    if (type === "immigration") subject = "immigration assistance";
    else if (type === "taxes") subject = "tax preparation";

    const msg = `Hello, my name is ${name}. I would like information about ${subject}. What documents do you need and what are the next steps?`;
    out.textContent = msg;
    localStorage.setItem("wm_lastMessage", msg);
  });
}

// ---------- run ----------
setupNav();
setupFooter();
setupMessageBuilder();