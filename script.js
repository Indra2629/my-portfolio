// Enhanced Portfolio JavaScript

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const headerHeight = document.querySelector('header').offsetHeight;
    
    if (targetSection) {
      const targetPosition = targetSection.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Dynamic header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 100) {
    header.style.background = 'rgba(15, 23, 42, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'rgba(15, 23, 42, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero h2');
  const originalText = heroTitle.textContent;
  
  // Add typing effect after a short delay
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 80);
  }, 500);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;
  
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Skill tags animation
document.querySelectorAll('.skills span').forEach((skill, index) => {
  skill.style.animationDelay = `${index * 0.1}s`;
  skill.classList.add('skill-animate');
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Button click effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .skill-animate {
    animation: skillFloat 0.6s ease-out forwards;
  }
  
  @keyframes skillFloat {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize AOS animations with enhanced settings
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic',
  delay: 0
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate hero elements sequentially
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  .hero-content > * {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
`;
document.head.appendChild(loadingStyle);

// Smooth reveal for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  section.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);
