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