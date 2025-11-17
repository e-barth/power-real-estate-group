(function () {

  const TARGET_SELECTOR = "footer.md-footer.layout2:not(.inner)";
  const MAX_ATTEMPTS = 30; 
  const INTERVAL = 100;   
  
  const formHTML = `
    <!-- I removed the html to make the code smaller for chatgpt --> 
  `;

  function waitForFooter(attempt = 0) {
    const footer = document.querySelector(TARGET_SELECTOR);

    if (footer) {
      return Promise.resolve(footer);
    }

    if (attempt >= MAX_ATTEMPTS) {
      console.warn("Contact form: footer not found.");
      return Promise.resolve(null);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(waitForFooter(attempt + 1));
      }, INTERVAL);
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

  function onChange(e) {
    const target = e.target;
    if (!target || !target.matches('input.checkbox')) return;

    const checkbox = target;
    const form = checkbox.closest('form');
    const submitBox = form?.querySelector('.submit-box');

    if (!submitBox) return;

    if (checkbox.checked) {
      checkbox.classList.remove('unchecked');
      submitBox.classList.remove('disabled');
    } else {
      checkbox.classList.add('unchecked');
      submitBox.classList.add('disabled');
    }
  }

  document.addEventListener('change', onChange, true);

  function initialize() {
    const checkbox = document.querySelector('input.checkbox');
    if (!checkbox) return;
    const evt = new Event('change', { bubbles: true });
    checkbox.dispatchEvent(evt);
  }

  initialize();
  setTimeout(initialize, 150);
  setTimeout(initialize, 400);
}

enableSubmitOnCheckbox();