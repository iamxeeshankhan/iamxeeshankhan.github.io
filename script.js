///////////////////////////////////////
///////// Theme Toggle
///////////////////////////////////////
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-toggle i");

  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  }
}

///////////////////////////////////////
///////// Load saved theme
///////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.querySelector(".theme-toggle i");

  if (savedTheme === "light") {
    document.body.removeAttribute("data-theme");
    themeIcon.className = "fas fa-moon";
  } else {
    // Default is dark if nothing saved
    document.body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-sun";
  }
});

///////////////////////////////////////
///////// Mobile Menu Toggle
///////////////////////////////////////
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");

  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
}

///////////////////////////////////////
///////// Close Mobile Menu
///////////////////////////////////////
function closeMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");

  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
  overlay.classList.remove("active");
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

///////////////////////////////////////
///////// Modal Functions
///////////////////////////////////////
function openModal() {
  const modal = document.getElementById("cvModal");
  modal.style.display = "block";
  document.body.classList.add("modal-open");

  // Trigger animation
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("cvModal");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }, 400);
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("cvModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Keyboard event listeners
document.addEventListener("keydown", function (event) {
  // Close mobile menu on Escape key
  if (event.key === "Escape") {
    closeMobileMenu();
    closeModal();
  }
});

///////////////////////////////////////
///////// Smooth scrolling for navigation links
///////////////////////////////////////
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

///////////////////////////////////////
///////// Scroll animations
///////////////////////////////////////
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on page load

///////////////////////////////////////
///////// Dynamic Active Navigation & Sticky Navbar
///////////////////////////////////////
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const nav = document.querySelector("nav");
  const aboutSection = document.getElementById("about");

  // Sticky Navbar
  const aboutRect = aboutSection.getBoundingClientRect();
  if (aboutRect.top <= 0) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }

  // Active Link logic
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.clientHeight;
    const offset = window.innerHeight * 0.5; // Use 50% of the viewport height as offset

    if (sectionTop - offset <= 0 && sectionTop + sectionHeight - offset > 0) {
      current = section.getAttribute("id");
    }
  });

  // Handle the case when the user is at the very top of the page
  if (!current) {
    current = "home";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

///////////////////////////////////////
///////// Initial check on page load
///////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const aboutSection = document.getElementById("about");
  const aboutRect = aboutSection.getBoundingClientRect();
  if (aboutRect.top <= 0) {
    nav.classList.add("sticky");
  }
  // Set initial active link
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) {
    homeLink.classList.add("active");
  }
});
