$(document).ready(function() {
  
  // Intersection Observer for scroll animations
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
  
  // Observe all animated elements
  $('.fade-in-up, .fade-in-left, .fade-in-right, .feature-card, .use-case-card, .gallery-item').each(function() {
    observer.observe(this);
  });
  
  // Parallax effect for hero and full-width image
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    
    // Hero parallax
    $('.hero-bg').css('transform', `translateY(${scrolled * 0.5}px)`);
    
    // Full width image parallax
    $('.parallax-img').css('transform', `translateY(${(scrolled - $('.parallax-img').parent().offset().top + $(window).height()) * 0.3}px)`);
  });
  
  // Stagger animation for feature cards
  $('.feature-card').each(function(index) {
    $(this).css('transition-delay', `${index * 0.1}s`);
  });
  
  // Stagger animation for use case cards
  $('.use-case-card').each(function(index) {
    $(this).css('transition-delay', `${index * 0.1}s`);
  });
  
  // Stagger animation for gallery items
  $('.gallery-item').each(function(index) {
    $(this).css('transition-delay', `${index * 0.15}s`);
  });
  
  // Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 100
      }, 1000);
    }
  });
  
  // Add hover effect enhancement
  $('.feature-card, .use-case-card, .gallery-item').hover(
    function() {
      $(this).css('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
    },
    function() {
      $(this).css('transition', 'all 0.4s ease');
    }
  );
  
});

 // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });