/* ============================================
   Phool - Flower Photography Website
   Interactive Features & Animations
   ============================================ */

// ============================================
// 1. Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
  
  // Close menu on link click
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// ============================================
// 2. Active Navigation Link
// ============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ============================================
// 3. Scroll Reveal Animations
// ============================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// 4. Gallery Filtering
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'scaleIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// 5. Lightbox Gallery
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg && lightboxClose) {
  // Open lightbox on gallery item click
  document.querySelectorAll('.gallery-item img, .gallery-item .overlay').forEach(el => {
    el.addEventListener('click', function() {
      const item = this.closest('.gallery-item');
      if (item) {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });
  
  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// 6. Stat Counter Animation (About page)
// ============================================
const statNumbers = document.querySelectorAll('.stat-item .number');

if (statNumbers.length > 0) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.textContent.replace(/[^0-9]/g, ''));
        animateCounter(target, finalValue);
        statObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(el => statObserver.observe(el));
  
  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current + '+';
    }, 25);
  }
}

// ============================================
// 7. Smooth Scroll for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ============================================
// 8. Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (name && email && message) {
      // Show success message
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
      
      // You can add actual form submission logic here
      console.log('Form submitted:', { name, email, message });
    }
  });
}

// ============================================
// 9. Page Load Animation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.animation = 'fadeIn 0.5s ease';
  
  // Add floating leaves to all pages
  if (!document.querySelector('.floating-leaves')) {
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'floating-leaves';
    for (let i = 1; i <= 8; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leavesContainer.appendChild(leaf);
    }
    document.body.prepend(leavesContainer);
  }
  
  console.log('🌸 Phool - Flower Photography Website loaded!');
});

// ============================================
// 10. Header scroll effect
// ============================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(26, 60, 46, 0.97)';
  } else {
    header.style.background = 'rgba(26, 60, 46, 0.92)';
  }
  
  lastScroll = currentScroll;
});

