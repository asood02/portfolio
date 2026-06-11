/* Shared behavior: mobile nav, scroll-reveal, project modals. */
(function () {
  "use strict";

  // --- Mobile nav drawer ---
  var toggle = document.querySelector(".nav-toggle");
  var sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { sidebar.classList.remove("open"); });
    });
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el, i) {
      // small stagger for grids/lists
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // --- Project modals ---
  window.openModal = function (id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  window.closeModal = function (el) {
    var m = el && el.classList && el.classList.contains("modal") ? el : (el ? el.closest(".modal") : null);
    if (!m) return;
    m.classList.remove("active");
    document.body.style.overflow = "";
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var open = document.querySelector(".modal.active");
      if (open) window.closeModal(open);
    }
  });
})();
