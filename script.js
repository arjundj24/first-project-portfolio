const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeBtn = document.getElementById('themeBtn');
const typeText = document.getElementById('typeText');
const cursorGlow = document.getElementById('cursorGlow');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-showcase');
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');

menuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('active');
  });
});

themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('light-theme')) {
    themeBtn.textContent = '☀️';
    localStorage.setItem('portfolioTheme', 'light');
  } else {
    themeBtn.textContent = '🌙';
    localStorage.setItem('portfolioTheme', 'dark');
  }
});

function loadTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    themeBtn.textContent = '🌙';
  }
}

const roles = [
  'Full-Stack Developer',
  'CSE Student',
  'Backend Learner',
  'Problem Solver',
  'Project Builder'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typeText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1300);
      return;
    }
  } else {
    typeText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 45 : 80;
  setTimeout(typeRole, speed);
}

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const selectedFilter = button.dataset.filter;

    projectCards.forEach(function (card) {
      const category = card.dataset.category;

      if (selectedFilter === 'all' || selectedFilter === category) {
        card.style.display = 'grid';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

skillTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    skillTabs.forEach(function (item) {
      item.classList.remove('active');
    });

    skillPanels.forEach(function (panel) {
      panel.classList.remove('active');
    });

    tab.classList.add('active');

    const panelId = tab.dataset.tab;
    document.getElementById(panelId).classList.add('active');
  });
});

function revealOnScroll() {
  revealElements.forEach(function (element) {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.addEventListener('mousemove', function (event) {
  if (!cursorGlow) {
    return;
  }

  cursorGlow.style.left = event.clientX + 'px';
  cursorGlow.style.top = event.clientY + 'px';
});

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  const subject = encodeURIComponent('Portfolio Contact Message from ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );

  window.location.href = `mailto:24b821@nssce.ac.in?subject=${subject}&body=${body}`;

  contactForm.reset();
});

loadTheme();
typeRole();
revealOnScroll();
