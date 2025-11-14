// Add id to contact form section
function addContactId() {
  const targets = document.querySelectorAll('.md-form.layout3.mg-bg, .md-form.layout10.mg-bg');
  let added = false;

  targets.forEach(target => {
    if (!target.id) {
      target.id = 'contact';
      added = true;
    }
  });

  return added;
}

window.addEventListener('load', () => {
  if (addContactId()) return;

  const interval = setInterval(() => {
    if (addContactId()) {
      clearInterval(interval);
    }
  }, 300);
});

// CONTACT FORM
function loadLoftyAssets(onComplete) {
  const cssFiles = [
    "//static.chimeroi.com/site-ssr/modules/md-form/layout3-78b8b5f7.css",
    "//static.chimeroi.com/site-ssr/modules/md-form/get-more-info-v4-d11a9723.css"
  ];

  const jsFiles = [
    "https://static.chimeroi.com/site-ssr/modules/md-form/layout3-78b8b5f7.js"
  ];

  function loadLoftyCss() {
    if (!document.head) return setTimeout(loadLoftyCss, 100);

    cssFiles.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  function loadLoftyJs(i = 0) {
    if (i >= jsFiles.length) {
      if (typeof onComplete === "function") onComplete();
      return;
    }

    const src = jsFiles[i];

    if (document.querySelector(`script[src="${src}"]`)) {
      return loadLoftyJs(i + 1);
    }

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;

    script.onload = () => loadLoftyJs(i + 1);
    script.onerror = () => {
      console.warn("Failed loading Lofty JS:", src);
      loadLoftyJs(i + 1);
    };

    document.body.appendChild(script);
  }

  function start() {
    if (!document.body) return setTimeout(start, 100);
    loadLoftyCss();
    loadLoftyJs();
  }

  start();
}

function loadContactForm() {
  const scriptUrl = "https://cdn.jsdelivr.net/gh/e-barth/power-real-estate-group/js/contact-form.js";

  if (document.querySelector(`script[src="${scriptUrl}"]`)) return;

  function appendScript() {
    if (!document.body) return setTimeout(appendScript, 100);

    const s = document.createElement("script");
    s.src = scriptUrl;
    s.defer = true;
    document.body.appendChild(s);
  }

  appendScript();
}

loadLoftyAssets(() => {
  console.log("Lofty JS finished loading — now loading contact-form.js");
  loadContactForm();
});

