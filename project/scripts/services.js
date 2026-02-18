function qs(sel, parent = document) { return parent.querySelector(sel); }
function setupNav() {
  const btn = qs(".nav__toggle");
  const links = qs("#navLinks");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    links.classList.toggle("nav__links--open");
  });
}

const services = [
  { id: "im1", title: "Immigration Forms Support", cat: "immigration", popular: true,  details: "Help organizing documents and preparing forms." },
  { id: "im2", title: "Case Tracking Checklist",   cat: "immigration", popular: false, details: "A structured checklist to track a case." },
  { id: "tx1", title: "Tax Return Preparation",    cat: "taxes",       popular: true,  details: "Document checklist + preparation guidance." },
  { id: "tx2", title: "Self-Employed Basics",      cat: "taxes",       popular: false, details: "Mileage, expenses, and basic records." },
  { id: "in1", title: "ACA Enrollment Support",    cat: "insurance",   popular: true,  details: "Enrollment help and plan comparisons." },
  { id: "in2", title: "Agent Updates",             cat: "insurance",   popular: false, details: "Help updating agent of record where applicable." }
];

function render(list) {
  const grid = qs("#servicesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  list.forEach(s => {
    const card = document.createElement("article");
    card.className = "service";
    card.innerHTML = `
      <span class="badge">${s.cat}</span>
      <h2>${s.title}</h2>
      <p>${s.details}</p>
      <button class="btn btn--outline" type="button" data-id="${s.id}">Save</button>
    `;
    grid.appendChild(card);
  });
}

function setupFilters() {
  const sel = qs("#serviceFilter");
  const chk = qs("#showOnlyPopular");
  if (!sel || !chk) return;

  const savedCat = localStorage.getItem("wm_services_cat") || "all";
  const savedPop = localStorage.getItem("wm_services_pop") === "true";

  sel.value = savedCat;
  chk.checked = savedPop;

  function apply() {
    const cat = sel.value;
    const onlyPop = chk.checked;

    localStorage.setItem("wm_services_cat", cat);
    localStorage.setItem("wm_services_pop", String(onlyPop));

    let list = services;

    if (cat !== "all") list = list.filter(s => s.cat === cat);
    if (onlyPop) list = list.filter(s => s.popular);

    
    list = list.slice().sort((a,b) => a.title.localeCompare(b.title));

    render(list);
  }

  sel.addEventListener("change", apply);
  chk.addEventListener("change", apply);
  apply();
}

function setupSaveButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;

    const id = btn.dataset.id;
    const item = services.find(s => s.id === id);
    if (!item) return;


    const saved = JSON.parse(localStorage.getItem("wm_saved_services") || "[]");
    const exists = saved.some(x => x.id === item.id);

    if (!exists) saved.push({ id: item.id, title: item.title, cat: item.cat });
    localStorage.setItem("wm_saved_services", JSON.stringify(saved));

    btn.textContent = exists ? "Saved" : "Saved ✓";
  });

  const year = qs("#year");
  if (year) year.textContent = new Date().getFullYear();
}

setupNav();
setupFilters();
setupSaveButtons();