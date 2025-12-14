 // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      const increment = target / speed;
      let count = 0;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count).toLocaleString();
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      updateCount();
    };

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));


// Video play functionality
document.querySelectorAll('.video-container').forEach(container => {
  const video = container.querySelector('video');
  const playButton = container.querySelector('.play-button');
  const overlay = container.querySelector('.video-overlay');
  
  if (video && playButton) {
    playButton.addEventListener('click', (e) => {
      e.stopPropagation();
      video.play();
    });

    video.addEventListener('play', () => {
      container.classList.add('playing');
      playButton.style.opacity = '0';
      overlay.style.opacity = '0';
      playButton.style.pointerEvents = 'none';      
    });

    video.addEventListener('pause', () => {
      container.classList.remove('playing');
      playButton.style.opacity = '1';
      overlay.style.opacity = '1';

      playButton.style.pointerEvents = 'auto';
    });

    video.addEventListener('ended', () => {
      container.classList.remove('playing');
      playButton.style.opacity = '1';
      playButton.style.pointerEvents = 'auto';
    });
  }
});

