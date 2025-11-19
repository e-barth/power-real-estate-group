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