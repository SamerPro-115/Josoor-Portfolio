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
function toggleMobileMenu() {
  $(".nav-menu").toggleClass("active");
  $("body").toggleClass("overflow-hidden");
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



i18next
  .use(i18nextHttpBackend)
  .init({
    lng: localStorage.getItem("lang") || 'ar',
    fallbackLng: 'ar',
    debug: false,
    ns: ['common', 'mobile-theater', 'conferences', 'marketing', 'technical', "event-management", "works"], 
    defaultNS: 'common', 
    backend: {
      loadPath: '/public/locals/{{lng}}/{{ns}}.json' 
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



