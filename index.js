function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
AOS.init({ once: !0, duration: 800, offset: 100 });
function toggleMobileMenu() {
  $(".nav-menu").toggleClass("active");
  $(".mobile-menu-toggle").toggleClass("active");
  if ($(window).scrollTop() === 0 && $(".nav-menu").hasClass("active")) {
    $(".navbar").addClass("toggle-top");
    $(".mobile-menu-toggle span").addClass("menu-toggle-on-top");
    $(".lang-text").addClass("lang-toggle-on-top");
  } else {
    $(".navbar").removeClass("toggle-top");
    $(".mobile-menu-toggle span").removeClass("menu-toggle-on-top");
    $(".lang-text").removeClass("lang-toggle-on-top");
  }
}
$(".dropdown > .nav-link").on("click", function (e) {
  if ($(window).width() <= 768) {
    e.preventDefault();
    $(this).parent().toggleClass("active");
  }
});
$(".nav-link:not(.dropdown .nav-link), .dropdown-item").on(
  "click",
  function () {
    if ($(window).width() <= 768) {
      $(".nav-menu, .mobile-menu-toggle").removeClass("active");
    }
  }
);
(function () {
  const $navbar = $(".navbar");
  const $mobileToggle = $(".mobile-menu-toggle span");
  const $langText = $(".lang-text");
  let ticking = !1;
  let lastScrollTop = 0;
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === lastScrollTop) {
      ticking = !1;
      return;
    }
    if (scrollTop > 0) {
      $navbar.addClass("scrolled").removeClass("toggle-top");
      $mobileToggle.removeClass("menu-toggle-on-top");
      $langText.removeClass("lang-toggle-on-top");
    } else {
      $navbar.removeClass("scrolled");
    }
    lastScrollTop = scrollTop;
    ticking = !1;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = !0;
      }
    },
    { passive: !0 }
  );
  updateNavbar();
})();
const handleResize = throttle(function () {
  if ($(window).width() > 768) {
    $(".nav-menu, .mobile-menu-toggle, .dropdown").removeClass("active");
  }
}, 250);
$(window).on("resize", handleResize);
$(document).ready(function () {
  function createParticles() {
    const about = $("#about");
    for (let i = 0; i < 10; i++) {
      const particle = $('<div class="particle"></div>');
      const randomDelay = Math.random() * 15;
      const randomDuration = 15 + Math.random() * 10;
      const randomStart = -(Math.random() * 100);
      particle.css({
        left: Math.random() * 100 + "%",
        bottom: randomStart + "vh",
        animationDelay: randomDelay + "s",
        animationDuration: randomDuration + "s",
        willChange: "transform",
      });
      about.append(particle);
    }
  }
  createParticles();
});
$(document).ready(function () {
  const $serviceCards = $(".service-card");
  const isMobile = window.innerWidth <= 768;
  let ticking = false;

  const handleServiceScroll = function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (isMobile) {
      $serviceCards.each(function () {
        const $card = $(this);
        const cardTop = $card.offset().top;
        const cardBottom = cardTop + $card.outerHeight();
        const triggerPoint = scrollTop + 210;

        if (triggerPoint >= cardTop && triggerPoint < cardBottom) {
          $card.addClass("active-card");
        } else {
          $card.removeClass("active-card");
        }
      });
    } else {
      const scrollPosition = scrollTop + windowHeight;
      $serviceCards.each(function () {
        const $card = $(this);
        const cardOffset = $card.offset().top;

        if (
          scrollPosition > cardOffset &&
          scrollTop < cardOffset + $card.height()
        ) {
          const movement = (scrollPosition - cardOffset) * 0.02;
          $card
            .find(".service-image")
            .css(
              "transform",
              `scale(1.1) translateY(${movement}px) translateZ(0)`
            );
        }
      });
    }

    ticking = false;
  };

  $(window).on("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(handleServiceScroll);
      ticking = true;
    }
  });

  if (isMobile) {
    $serviceCards
      .on("touchstart", function (e) {
        // Remove touch-active from all other cards
        $serviceCards.removeClass("touch-active");
        // Add to current card
        $(this).addClass("touch-active");
      })
      .on("touchend touchcancel", function () {
        // Keep the class for a brief moment for visual feedback
        const $card = $(this);
        setTimeout(function () {
          $card.removeClass("touch-active");
        }, 300);
      });

    // Remove touch-active when touching outside cards
    $(document).on("touchstart", function (e) {
      if (!$(e.target).closest(".service-card").length) {
        $serviceCards.removeClass("touch-active");
      }
    });
  }

  handleServiceScroll();
});
function initPartnersScroll() {
  const $scrollContent = $(".scroll-content");
  if ($scrollContent.length === 0) return;
  const $originalLogos = $scrollContent.children().clone();
  $scrollContent.append($originalLogos.clone());
  $scrollContent.append($originalLogos.clone());
  let scrollPosition = 0;
  let scrollSpeed = 0.7;
  const baseSpeed = 0.7;
  const containerWidth = $scrollContent.width() / 3;
  let isPaused = !1;
  let animationId = null;
  $(".partner-logo").hover(
    function () {
      isPaused = !0;
      scrollSpeed = 0.2;
    },
    function () {
      isPaused = !1;
      scrollSpeed = baseSpeed;
    }
  );
  $(".partner-logo").on("mouseenter", function () {
    const $logo = $(this);
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        const $sparkle = $('<div class="sparkle"></div>');
        const rect = $logo[0].getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        $sparkle.css({ left: x + "px", top: y + "px" });
        $logo.append($sparkle);
        setTimeout(() => $sparkle.remove(), 1000);
      }, i * 150);
    }
  });
  function animate() {
    scrollPosition += scrollSpeed;
    if (scrollPosition >= containerWidth) {
      scrollPosition = 0;
    }
    $scrollContent.css(
      "transform",
      `translateX(-${scrollPosition}px) translateZ(0)`
    );
    animationId = requestAnimationFrame(animate);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
  animate();
}
$(document).ready(function () {
  initPartnersScroll();
});


i18next
  .use(i18nextHttpBackend)
  .init({
    lng: localStorage.getItem("lang") || 'ar', // Set initial language
    fallbackLng: 'ar',
    debug: true, // Enable for testing
    backend: {
      loadPath: '/public/locals/{{lng}}/common.json' 
    }
  }, function(err, t) {
    if (err) console.error('i18next initialization error:', err);
    updateContent();
  });

function changeLang() {
  // Toggle between 'ar' and 'en'
  const currentLang = i18next.language;
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  
  i18next.changeLanguage(newLang, function(err, t) {
    if (err) console.error('Language change error:', err);
    localStorage.setItem("lang", newLang);
    updateContent();
  });
}

function updateContent() {
  const currentLang = i18next.language;
  document.documentElement.lang = currentLang;
  
  // Set text direction
  const rtl = currentLang === "ar";
  document.body.dir = rtl ? "rtl" : "ltr";
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(function(element) {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
  
  // Update language toggle button text
  const langText = document.querySelector('.lang-text');
  if (langText) {
    langText.textContent = currentLang === 'ar' ? 'En' : 'عربي';
  }
  
  // Toggle flag visibility (optional - show opposite language flag)
  const flagAr = document.querySelector('.flag-ar');
  const flagEn = document.querySelector('.flag-en');
  if (flagAr && flagEn) {
    if (currentLang === 'ar') {
      flagAr.style.display = 'none';
      flagEn.style.display = 'inline-block';
    } else {
      flagAr.style.display = 'inline-block';
      flagEn.style.display = 'none';
    }
  }


  
}


  $(document).ready(function() {
            // Animated Counter Function
            function animateCounter($element, target) {
                $({ counter: 0 }).animate({ counter: target }, {
                    duration: 2500,
                    easing: 'swing',
                    step: function() {
                        $element.text(Math.ceil(this.counter));
                    },
                    complete: function() {
                        $element.text(target);
                    }
                });
            }

            // Intersection Observer for counter animation
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !$(entry.target).hasClass('animated')) {
                        const target = parseInt($(entry.target).data('target'));
                        animateCounter($(entry.target), target);
                        $(entry.target).addClass('animated');
                    }
                });
            }, observerOptions);

            // Observe all stat numbers
            $('.stat-number').each(function() {
                observer.observe(this);
            });

            // Add scroll reveal animation
            const fadeElements = $('.animate-fade-in-up');
            
            const fadeObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $(entry.target).css('animation-play-state', 'running');
                    }
                });
            }, { threshold: 0.2 });

            fadeElements.each(function() {
                fadeObserver.observe(this);
            });
        });

         $(document).ready(function() {
            const $timelineLine = $('#timelineLine');
            const $timelineItems = $('.timeline-item');
            
            function updateTimeline() {
                const scrollTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                const timelineStart = $timelineItems.first().offset().top - 100;
                const timelineEnd = $timelineItems.last().offset().top;
                const scrollProgress = Math.max(0, scrollTop - timelineStart + windowHeight * 0.5);
                const totalHeight = timelineEnd - timelineStart;
                const lineHeight = Math.min(scrollProgress, totalHeight);
                
                $timelineLine.css('height', lineHeight + 'px');
                
                $timelineItems.each(function() {
                    const $item = $(this);
                    const itemTop = $item.offset().top;
                    const triggerPoint = scrollTop + windowHeight * 0.7;
                    
                    if (triggerPoint > itemTop) {
                        $item.addClass('active');
                    }
                });
            }
            
            updateTimeline();
            $(window).on('scroll', updateTimeline);
            $(window).on('resize', updateTimeline);
        });