// ---- Custom Cursor ----
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

document
  .querySelectorAll("a, button, .social-card, .skill-tags span")
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

// ---- Theme ----
function toggleTheme() {
  const isLight = document.body.getAttribute("data-theme") === "light";
  const icon = document.getElementById("themeIcon");
  if (isLight) {
    document.body.removeAttribute("data-theme");
    icon.className = "fas fa-sun";
    localStorage.setItem("mzk-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
    icon.className = "fas fa-moon";
    localStorage.setItem("mzk-theme", "light");
  }
}

(function initTheme() {
  const saved = localStorage.getItem("mzk-theme");
  const icon = document.getElementById("themeIcon");
  if (saved === "light") {
    document.body.setAttribute("data-theme", "light");
    if (icon) icon.className = "fas fa-moon";
  } else {
    document.body.removeAttribute("data-theme");
    if (icon) icon.className = "fas fa-sun";
  }
})();

// ---- Mobile Menu ----
function toggleMobileMenu() {
  const menu = document.getElementById("navMenu");
  const ham = document.getElementById("hamburger");
  const overlay = document.getElementById("navOverlay");
  menu.classList.toggle("active");
  ham.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("navMenu").classList.remove("active");
  document.getElementById("hamburger").classList.remove("active");
  document.getElementById("navOverlay").classList.remove("active");
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
    closeModal();
  }
});

// ---- Sticky Nav ----
const nav = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// ---- Active Nav Link ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveLink() {
  let current = "";
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight * 0.45 &&
      rect.bottom >= window.innerHeight * 0.45
    ) {
      current = sec.id;
    }
  });
  if (!current && window.scrollY < 100) current = "home";
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ---- Modal ----
function openModal() {
  const modal = document.getElementById("cvModal");
  modal.classList.add("open");
  document.body.classList.add("modal-open");
  // Scroll to top of modal panel
  modal.scrollTop = 0;
}

function closeModal() {
  const modal = document.getElementById("cvModal");
  const panel = modal.querySelector(".modal-panel");
  panel.style.animation = "none";
  panel.style.transform = "translateY(20px) scale(0.98)";
  panel.style.opacity = "0";
  panel.style.transition = "all 0.3s ease";
  setTimeout(() => {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    panel.style.transform = "";
    panel.style.opacity = "";
    panel.style.transition = "";
    panel.style.animation = "";
  }, 280);
}
