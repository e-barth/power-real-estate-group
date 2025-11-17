function loadFormAssets(onComplete) {
  const cssFiles = [
    "//static.chimeroi.com/site-ssr/modules/md-form/layout3-78b8b5f7.css",
    "//static.chimeroi.com/site-ssr/modules/md-form/get-more-info-v4-d11a9723.css",
    "https://cdn.jsdelivr.net/gh/e-barth/power-real-estate-group/css/global.min.css"
  ];

  const jsFiles = [
    "https://static.chimeroi.com/site-ssr/modules/md-form/layout3-78b8b5f7.js"
  ];

  // Load CSS
  function loadFormCss() {
    if (!document.head) return setTimeout(loadFormCss, 100);

    cssFiles.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  // Load JS sequentially
  function loadFormJs(i = 0) {
    if (i >= jsFiles.length) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    const src = jsFiles[i];

    // Already loaded? Skip
    if (document.querySelector(`script[src="${src}"]`)) {
      return loadFormJs(i + 1);
    }

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;

    script.onload = () => loadFormJs(i + 1);
    script.onerror = () => {
      console.warn("Failed loading Lofty JS:", src);
      loadFormJs(i + 1);
    };

    document.body.appendChild(script);
  }

  function start() {
    if (!document.body) return setTimeout(start, 100);
    loadFormCss();
    loadFormJs();
  }

  start();
}

(function () {
  const TARGET_SELECTOR = "footer.md-footer.layout2:not(.inner)";
  const MAX_ATTEMPTS = 30;
  const INTERVAL = 100;

  // Your form HTML
  const formHTML = `
    <!-- I removed it here to keep this clean -->
  `;

  function waitForFooter(attempt = 0) {
    const footer = document.querySelector(TARGET_SELECTOR);
    if (footer) return Promise.resolve(footer);

    if (attempt >= MAX_ATTEMPTS) {
      console.warn("Contact form: footer not found.");
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(waitForFooter(attempt + 1)), INTERVAL);
    });
  }

  function insertForm(footer) {
    if (!footer) return;
    footer.insertAdjacentHTML("beforebegin", formHTML);
  }

  waitForFooter().then(footer => {
    if (!footer) return;
    insertForm(footer);
  });
})();

function enableSubmitOnCheckbox() {
  function handleChange(e) {
    const target = e.target;
    if (!target || !target.matches("input.checkbox")) return;

    const checkbox = target;
    const form = checkbox.closest("form");
    const submitBox = form?.querySelector(".submit-box");

    if (!submitBox) return;

    if (checkbox.checked) {
      checkbox.classList.remove("unchecked");
      submitBox.classList.remove("disabled");
    } else {
      checkbox.classList.add("unchecked");
      submitBox.classList.add("disabled");
    }
  }

  document.addEventListener("change", handleChange, true);

  // Trigger initial state
  function initialize() {
    const checkbox = document.querySelector("input.checkbox");
    if (!checkbox) return;

    const evt = new Event("change", { bubbles: true });
    checkbox.dispatchEvent(evt);
  }

  initialize();
  setTimeout(initialize, 150);
  setTimeout(initialize, 400);
}

enableSubmitOnCheckbox();

document.addEventListener("form:success", function (e) {
  const form = e.detail?.form;
  if (!form || !form.closest(".footer-contact-form")) return;

  const toast = form.querySelector(".form-toast.toast-mark");
  if (toast) toast.style.display = "block";
});

