// Footer dynamic content
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");

  if (hamburger.textContent === "☰") {
    hamburger.textContent = "✖";
  } else {
    hamburger.textContent = "☰";
  }
});