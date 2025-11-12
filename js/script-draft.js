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



// Fix Top Navigation Contact link
function fixContactLinkHref() {  
  const contactSections = document.querySelectorAll('.md-form.layout3.mg-bg, .md-form.layout10.mg-bg');  
  if (contactSections.length === 0) return;
  const links = document.querySelectorAll('header .head-menu .menu-item a[href="/contact"]');
  links.forEach(link => {
    link.setAttribute('href', '#contact');
  });
}
window.addEventListener('load', fixContactLinkHref);


// Add link to the navigation
// function addContactLink() {
  
//   const nav = document.querySelector('header .head-menu');

//   if (!nav) return;
  
//   const li = document.createElement('li');
//   li.className = 'menu-item';
  
//   const a = document.createElement('a');
//   a.href = '#contact';
//   a.target = '_self';
//   a.rel = 'noopener noreferrer';
//   a.className = 'uppercase';
//   a.textContent = 'Contact';
  
//   li.appendChild(a);
//   nav.appendChild(li);
// }

// window.addEventListener('load', addContactLink);


// Close menu when clicking on contact link on mobile
// function closeLoftyMobileNav() {  
//   if (!document.body.classList.contains('mobile')) return;

//   const html = document.documentElement;
//   const body = document.body;
//   const navContainer = document.querySelector('.nav-container');
//   const navMask = document.querySelector('.nav-mask');
//   const menuIcon = document.querySelector('.menu-icon');

//   html.style.overflow = '';
//   body.classList.remove('overflow-hidden');
//   if (navContainer) navContainer.classList.remove('show');
//   if (navMask) navMask.classList.remove('active');
//   if (menuIcon) menuIcon.classList.remove('sideMenuShow');
// }

// function setupContactNavClose() {
//   const contactLink = document.querySelector('a[href="#contact"]');
//   if (!contactLink) return;

//   contactLink.addEventListener('click', (e) => {
//     e.preventDefault(); 
//     closeLoftyMobileNav();
    
//     const contactSection = document.querySelector('#contact');
//     if (contactSection) {
//       setTimeout(() => {
//         contactSection.scrollIntoView({ behavior: 'smooth' });
//       }, 200);
//     }
//   });
// }

// window.addEventListener('load', setupContactNavClose);


// Copy Featured Area Links
function moveFeaturedListToFooter() {
  // Run only on Home page
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

  // Find the source element
  const source = document.querySelector('.md-featured-area.layout7.mg-bg .list-wrap');
  const footerCol = document.querySelector('footer .f-col.footer-container');

  if (!source || !footerCol) return;

  // Clone the list
  const clone = source.cloneNode(true);

  // Remove unwanted elements
  clone.querySelectorAll('.img-box, .item-right, .default-wrap').forEach(el => el.remove());

  // Insert clone as the first child in the footer container
  footerCol.insertBefore(clone, footerCol.firstChild);
}

window.addEventListener('load', moveFeaturedListToFooter);


// Remove colums from footer menu
function flattenMainMenuColumns() {
  const menuWrap = document.querySelector('.menu-wrap.main-menu');
  if (!menuWrap) return;
  const columns = menuWrap.querySelectorAll('.first-col, .second-col, .third-col');
  if (!columns.length) return;
  columns.forEach(col => {    
    while (col.firstChild) {
      menuWrap.insertBefore(col.firstChild, col);
    }    
    col.remove();
  });
}
window.addEventListener('load', flattenMainMenuColumns);


function addFormToFooter() {       
  jQuery('footer').append(jQuery('#contactForm').html());        
}
window.addEventListener('load',() => {       
  addFormToFooter();  
});
