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
    document.querySelectorAll('.media-item').forEach(item => {
      const video = item.querySelector('video');
      const playButton = item.querySelector('.play-button');
      
      if (video && playButton) {
        playButton.addEventListener('click', (e) => {
          e.stopPropagation();
          if (video.paused) {
            video.play();
            playButton.style.opacity = '0';
          } else {
            video.pause();
            playButton.style.opacity = '1';
          }
        });

        video.addEventListener('click', () => {
          if (!video.paused) {
            video.pause();
            playButton.style.opacity = '1';
          }
        });

        video.addEventListener('ended', () => {
          playButton.style.opacity = '1';
        });
      }
    });

    // Intersection Observer for animations
    const mediaOb = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.media-item').forEach(item => {
      mediaOb.observe(item);
    });


