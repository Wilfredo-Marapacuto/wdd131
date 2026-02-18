// project/scripts/contact.js

// ---------- helpers ----------
function qs(sel, scope = document) {
  return scope.querySelector(sel);
}
function qsa(sel, scope = document) {
  return Array.from(scope.querySelectorAll(sel));
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
}

// ---------- draft save/load ----------
const DRAFT_KEY = "wm_contact_draft";

function getDraftData() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveDraftIfEnabled(form) {
  const enabled = qs("#saveDraft");
  if (enabled && !enabled.checked) return;

  const data = {};
  qsa("input, select, textarea", form).forEach((el) => {
    if (!el.name && !el.id) return;
    const key = el.name || el.id;

    if (el.type === "checkbox" || el.type === "radio") data[key] = el.checked;
    else data[key] = el.value;
  });

  localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

function loadDraft(form) {
  const data = getDraftData();
  if (!data || Object.keys(data).length === 0) return;

  qsa("input, select, textarea", form).forEach((el) => {
    const key = el.name || el.id;
    if (!key || !(key in data)) return;

    if (el.type === "checkbox" || el.type === "radio") el.checked = Boolean(data[key]);
    else el.value = data[key];
  });
}

// ---------- validation ----------
function validateForm() {
  const fullName = qs("#fullName")?.value.trim() || "";
  const email = qs("#email")?.value.trim() || "";
  const topic = qs("#topic")?.value || "";
  const message = qs("#message")?.value.trim() || "";

  if (fullName.length < 2) return "Please enter your full name.";
  if (!email.includes("@") || !email.includes(".")) return "Please enter a valid email address.";
  if (!topic) return "Please choose a topic.";
  if (message.length < 10) return "Please enter a message (at least 10 characters).";

  return "";
}

// ---------- contact form ----------
function setupForm() {
  const form = qs("form");
  const status = qs("#formStatus") || qs("#status") || qs("#messageOut");

  if (!form) return;

  // load saved draft on start
  loadDraft(form);

  // auto-save draft when typing (only if #saveDraft is checked, if it exists)
  ["input", "change"].forEach((evt) => {
    form.addEventListener(evt, () => saveDraftIfEnabled(form));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      if (status) status.textContent = error;
      return;
    }

    const name = qs("#fullName")?.value.trim() || "Friend";
    const topic = qs("#topic")?.value || "your";
    if (status) {
      status.textContent = `Thank you, ${name}. Your ${topic} request was recorded for this student project site.`;
    }

    // clear draft after successful submit
    localStorage.removeItem(DRAFT_KEY);
    form.reset();
  });
}

// ---------- run ----------
setupNav();
setupFooter();
setupForm();