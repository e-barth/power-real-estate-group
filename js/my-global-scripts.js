function addGlobalStylesheet() {
  const href = "https://cdn.jsdelivr.net/gh/e-barth/power-real-estate-group/css/global.min.css";
  function inject() {
    if (!document.head) {
      return setTimeout(inject, 100);
    }   
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }
  inject();
}
addGlobalStylesheet();

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