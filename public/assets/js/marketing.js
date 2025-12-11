$(document).ready(function() {
  // ==================== CANVAS ANIMATED BACKGROUND ====================
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  
  // Responsive particle count based on screen size
  function getParticleCount() {
    const width = window.innerWidth;
    if (width < 480) return 15;        // Mobile small
    if (width < 768) return 25;        // Mobile/tablet
    if (width < 1024) return 35;       // Tablet landscape
    return 50;                         // Desktop
  }
  
  let particleCount = getParticleCount();
  
  // Set canvas size - FIXED: Use viewport height instead of scrollHeight
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Update particle count on resize
    const newCount = getParticleCount();
    if (newCount !== particleCount) {
      particleCount = newCount;
      // Adjust particles array
      if (particles.length > particleCount) {
        particles = particles.slice(0, particleCount);
      } else {
        while (particles.length < particleCount) {
          particles.push(new Particle());
        }
      }
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.3 + 0.1;
      this.color = Math.random() > 0.5 ? '#F69959' : '#8E4A8C';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // FIXED: Better boundary checking
      if (this.y > canvas.height + 10) {
        this.reset();
      }
      
      // Handle horizontal boundaries without full reset
      if (this.x < -10) {
        this.x = canvas.width + 10;
      } else if (this.x > canvas.width + 10) {
        this.x = -10;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Responsive connection distance for lines
  function getConnectionDistance() {
    return window.innerWidth < 768 ? 100 : 150;
  }
  
  // Animation loop with performance optimization
  let lastTime = 0;
  const fps = 30;
  const interval = 1000 / fps;
  
  function animate(currentTime) {
    requestAnimationFrame(animate);
    
    const deltaTime = currentTime - lastTime;
    if (deltaTime < interval) return;
    
    lastTime = currentTime - (deltaTime % interval);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connecting lines between nearby particles
    const connectionDistance = getConnectionDistance();
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = (1 - distance / connectionDistance) * 0.2;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });
  }
  
  animate(0);
  
  // FIXED: Better visibility change handling
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && particles.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
  });

  // ==================== INTERSECTION OBSERVER ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          $(entry.target).addClass('visible');
        }, index * 100);
      }
    });
  }, observerOptions);
  
  $('.fade-in-up, .timeline-step').each(function() {
    observer.observe(this);
  });

  // Smooth scroll
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 100
      }, 1000);
    }
  });
});