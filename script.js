const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img')?.alt || 'Project image';
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#quoteForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website quote request - ${data.get('service')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Phone: ${data.get('phone')}
Email: ${data.get('email') || 'Not provided'}
Area: ${data.get('area') || 'Not provided'}
Service: ${data.get('service')}

Job details:
${data.get('message')}`
  );
  window.location.href = `mailto:rmahvac@outlook.com?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
