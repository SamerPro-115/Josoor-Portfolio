
          AOS.init();
    
        // Mobile menu toggle
        function toggleMobileMenu() {
            $('.nav-menu').toggleClass('active');
            $('.mobile-menu-toggle').toggleClass('active');
        }

        // Mobile dropdown toggle
        $('.dropdown > .nav-link').on('click', function(e) {
            if ($(window).width() <= 768) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
            }
        });

        // Close mobile menu when clicking on a link
        $('.nav-link:not(.dropdown .nav-link), .dropdown-item').on('click', function() {
            if ($(window).width() <= 768) {
                $('.nav-menu').removeClass('active');
                $('.mobile-menu-toggle').removeClass('active');
            }
        });

        // Navbar scroll effect
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(event) {
            event.preventDefault();
            const target = $(this.getAttribute('href'));
            if(target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });

        // Close mobile menu on window resize
        $(window).resize(function() {
            if ($(window).width() > 768) {
                $('.nav-menu').removeClass('active');
                $('.mobile-menu-toggle').removeClass('active');
                $('.dropdown').removeClass('active');
            }
        });
$(window).on('load', function() {
    setTimeout(function() {
        $('body').removeClass('loading');

        // 🔥 Remove loader background after animation
        $('.page-loader').css('background', 'transparent');

        setTimeout(function() {
            $('.page-loader').fadeOut(400);
        }, 2000);
    }, 100);
});


 $(document).ready(function() {
      // Create floating particles
      function createParticles() {
        const about = $('#about');
        for (let i = 0; i < 20; i++) {
          const particle = $('<div class="particle"></div>');
          const randomDelay = Math.random() * 15;
          const randomDuration = 10 + Math.random() * 10;
          
          // Start particles at random positions throughout their journey
          const randomStart = -(Math.random() * 100);
          
          particle.css({
            left: Math.random() * 100 + '%',
            bottom: randomStart + 'vh',
            animationDelay: randomDelay + 's',
            animationDuration: randomDuration + 's'
          });
          about.append(particle);
        }
      }

      createParticles();

      // Scroll animations
      $(window).on('scroll load', function() {
        const aboutTop = $('#about').offset().top;
        const scrollBottom = $(window).scrollTop() + $(window).height();

        if (scrollBottom > aboutTop + 100) {
          $('.about-text').addClass('show');
          $('.scroller').addClass('show');
        }
      });

      // Trigger on load
      $(window).trigger('scroll');

      // Mobile detection
      const isMobile = $(window).width() < 768;
      if (isMobile) {
        $('.slide-overlay-1').removeClass('mix-blend-multiply');
      }
    });

    $(document).ready(function() {
            // Smooth parallax effect on scroll
            let lastScroll = 0;
            $(window).on('scroll', function() {
                const scrolled = $(window).scrollTop();
                const direction = scrolled > lastScroll ? 1 : -1;
                
                $('.service-card').each(function(index) {
                    const cardOffset = $(this).offset().top;
                    const windowHeight = $(window).height();
                    const scrollPosition = scrolled + windowHeight;
                    
                    if (scrollPosition > cardOffset && scrolled < cardOffset + $(this).height()) {
                        const movement = (scrollPosition - cardOffset) * 0.02 * direction;
                        $(this).find('.service-image').css('transform', 
                            `scale(1.1) translateY(${movement}px)`
                        );
                    }
                });
                
                lastScroll = scrolled;
            });

            // Add touch support for mobile
            $('.service-card').on('touchstart', function() {
                $(this).addClass('touch-active');
            });

            $('.service-card').on('touchend', function() {
                $(this).removeClass('touch-active');
            });

            
        });
        

        // Partners Infinity Scroll - Enhanced
function initPartnersScroll() {
    const scrollContent = $('.scroll-content');
    
    if (scrollContent.length === 0) return;
    
    const originalLogos = scrollContent.children().clone();
    
    // Clone enough times for seamless loop
    scrollContent.append(originalLogos.clone());
    scrollContent.append(originalLogos.clone());
    scrollContent.append(originalLogos.clone());
    
    let scrollPosition = 0;
    let scrollSpeed = 0.7;
    const baseSpeed = 0.7;
    const containerWidth = scrollContent.width() / 4;
    
    let isPaused = false;
    
    // Pause on hover with smooth transition
    $('.partner-logo').hover(
        function() { 
            isPaused = true;
            scrollSpeed = 0.2; // Slow down smoothly
        },
        function() { 
            isPaused = false;
            scrollSpeed = baseSpeed; // Return to normal speed
        }
    );
    
    // Add sparkle effect on hover
    $('.partner-logo').on('mouseenter', function() {
        createSparkles($(this));
    });
    
    function animate() {
        if (!isPaused) {
            scrollPosition += scrollSpeed;
            
            if (scrollPosition >= containerWidth) {
                scrollPosition = 0;
            }
            
            scrollContent.css('transform', 'translateX(-' + scrollPosition + 'px)');
        } else {
            // Still move slightly when paused for alive feeling
            scrollPosition += scrollSpeed;
            if (scrollPosition >= containerWidth) {
                scrollPosition = 0;
            }
            scrollContent.css('transform', 'translateX(-' + scrollPosition + 'px)');
        }
        
        requestAnimationFrame(animate);
    }
    
    // Create sparkle particles
    function createSparkles($element) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = $('<div class="sparkle"></div>');
                const rect = $element[0].getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                
                sparkle.css({
                    left: x + 'px',
                    top: y + 'px'
                });
                
                $element.append(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    }
    
    animate();
}

$(document).ready(function() {
    initPartnersScroll();
});



