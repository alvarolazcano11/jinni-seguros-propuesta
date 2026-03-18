// ===========================
// Jinni AI Proposal — Interactive Scripts
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupScrollAnimations();
  setupSmoothScroll();
  animateCostBars();
});

// ===========================
// Floating Particles
// ===========================
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(124, 58, 237, 0.4)',
    'rgba(217, 70, 239, 0.3)',
    'rgba(6, 182, 212, 0.3)',
    'rgba(245, 158, 11, 0.2)',
    'rgba(244, 63, 94, 0.2)'
  ];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    Object.assign(particle.style, {
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 15 + 20}s`,
      animationDelay: `${Math.random() * -30}s`,
      boxShadow: `0 0 ${size * 3}px ${color}`
    });
    
    container.appendChild(particle);
  }
}

// ===========================
// Scroll Animations (Intersection Observer)
// ===========================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }, observerOptions);

  // Observe challenge cards
  document.querySelectorAll('.challenge-card').forEach(card => {
    observer.observe(card);
  });

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });

  // Observe pilares
  const pilarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pilar').forEach(pilar => {
    pilar.style.opacity = '0';
    pilar.style.transform = 'translateY(30px)';
    pilar.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    pilarObserver.observe(pilar);
  });

  // Observe industry stats
  document.querySelectorAll('.industry-stat').forEach((stat, i) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
    
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });
    statObserver.observe(stat);
  });

  // Observe comparison columns
  document.querySelectorAll('.comparison-col').forEach((col, i) => {
    col.style.opacity = '0';
    col.style.transform = i === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    col.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
    const compObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.2 });
    compObserver.observe(col);
  });

  // Observe vision cards
  document.querySelectorAll('.vision-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
    
    const visionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });
    visionObserver.observe(card);
  });
}

// ===========================
// Cost Bars Animation
// ===========================
function animateCostBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.cost-item-bar');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
            bar.style.width = bar.style.getPropertyValue('--width');
          }, i * 150);
        });
      }
    });
  }, { threshold: 0.3 });

  const costSection = document.querySelector('.cost-details');
  if (costSection) {
    // Initialize bars at 0
    costSection.querySelectorAll('.cost-item-bar').forEach(bar => {
      const targetWidth = getComputedStyle(bar).getPropertyValue('--width');
      bar.style.width = '0%';
    });
    observer.observe(costSection);
  }
}

// ===========================
// Smooth Scroll
// ===========================
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
