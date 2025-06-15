const projectList = document.getElementById('project-list');

fetch('https://api.github.com/users/meqxs/repos')
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .forEach(repo => {
        // Skip PvPHud since it's featured separately
        if (repo.name.toLowerCase() === 'pvphud') return;
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || ''}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        projectList.appendChild(card);
      });
  });

// Smooth scroll for 'See My Work' button
const seeMyWorkBtn = document.querySelector('.btn[href="#projects"]');
if (seeMyWorkBtn) {
  seeMyWorkBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Smooth scroll for 'Contact Me' button in hero section
const heroContactBtn = document.querySelector('.btn-hero-contact');
if (heroContactBtn) {
  heroContactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('.contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Smooth scroll for 'Shop' button in hero section
const heroShopBtn = document.querySelector('.btn-hero-shop');
if (heroShopBtn) {
  heroShopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('.shop');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Contact form handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    emailjs.sendForm('service_785zqgs', 'template_sudzf56', contactForm)
      .then(function() {
        formStatus.textContent = 'Message sent! Thank you!';
        contactForm.reset();
      }, function(error) {
        formStatus.textContent = 'Failed to send. Please try again later.';
        console.error('EmailJS error:', error);
      });
  });
}

// View counter logic
const viewCountEl = document.getElementById('view-count');
const VIEW_KEY = 'portfolio_view_count';
let count = parseInt(localStorage.getItem(VIEW_KEY) || '0', 10);
count++;
localStorage.setItem(VIEW_KEY, count);
if (viewCountEl) {
  viewCountEl.textContent = count;
}

// Shop Contact button handler: scroll to contact and pre-fill message
const shopBtns = document.querySelectorAll('.shop-btn');
const contactMessage = document.getElementById('message');
shopBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const product = btn.getAttribute('data-product');
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (contactMessage && product) {
      contactMessage.value = `I'm interested in: ${product}\n`;
      contactMessage.focus();
    }
  });
}); 