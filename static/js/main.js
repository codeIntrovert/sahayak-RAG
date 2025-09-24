let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "hi" : "en";

  document.querySelectorAll("[data-en]").forEach((el) => {
    if (currentLang === "hi" && el.dataset.hi) {
      el.textContent = el.dataset.hi;
    } else {
      el.textContent = el.dataset.en;
    }
  });

  document.querySelectorAll("[data-hi-placeholder]").forEach((el) => {
    if (currentLang === "hi") {
      el.placeholder = el.dataset.hiPlaceholder;
    } else {
      el.placeholder = el.dataset.enPlaceholder || el.placeholder;
    }
  });
}
