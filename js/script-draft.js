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

loadContactForm();