const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.03)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UX Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display='none', 500);
    }
    if (mainPage) {
      mainPage.classList.add("visible");
    }
  }, 4000);

  // CV Modal Pop-up Handlers
  const openCvBtn = document.getElementById('open-cv-btn');
  const closeCvBtn = document.getElementById('close-cv-modal');
  const cvModal = document.getElementById('cv-modal');

  if (openCvBtn && cvModal) {
    openCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.add('open');
    });
  }

  if (closeCvBtn && cvModal) {
    closeCvBtn.addEventListener('click', () => {
      cvModal.classList.remove('open');
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('open');
      }
    });
  }

  // Contact Form Direct Email Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = contactForm.querySelector('[name="user_name"]').value.trim();
      const userEmail = contactForm.querySelector('[name="user_email"]').value.trim();
      const userMessage = contactForm.querySelector('[name="message"]').value.trim();

      const subject = encodeURIComponent(`Portfolio Contact from ${userName}`);
      const body = encodeURIComponent(`Sender Name: ${userName}\nSender Email: ${userEmail}\n\nMessage:\n${userMessage}`);

      window.location.href = `mailto:rakaaikox05@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Dark / Light Theme Toggle Logic
  const themeToggles = [
    document.getElementById('theme-toggle'),
    document.getElementById('mobile-theme-toggle')
  ];

  function updateThemeIcons(isDark) {
    themeToggles.forEach(toggle => {
      if (!toggle) return;
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isDark) {
          icon.className = 'fa-solid fa-sun';
        } else {
          icon.className = 'fa-solid fa-moon';
        }
      }
    });
  }

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('portfolio-theme', 'light');
    }
    updateThemeIcons(isDark);
  }

  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  themeToggles.forEach(toggle => {
    if (toggle) {
      toggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        setTheme(!isDark);
      });
    }
  });
});

