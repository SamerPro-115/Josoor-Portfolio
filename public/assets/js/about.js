
        // Scroll animations
        $(document).ready(function() {
           
            // Animate numbers
            $('.number-animation').each(function() {
                var $this = $(this);
                var target = parseInt($this.data('target'));
                var duration = 2000;
                var start = 0;
                var increment = target / (duration / 16);
                
                function updateNumber() {
                    start += increment;
                    if (start >= target) {
                        $this.text(target + '+');
                    } else {
                        $this.text(Math.floor(start));
                        requestAnimationFrame(updateNumber);
                    }
                }
                
                var observer = new IntersectionObserver(function(entries) {
                    if (entries[0].isIntersecting) {
                        updateNumber();
                        observer.disconnect();
                    }
                });
                
                observer.observe($this[0]);
            });
            
        
        });



        (function() {
    const canvas = document.getElementById('floatingShapes');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;
    let time = 0;
    let animationId;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    function drawWave(offsetY, amplitude, frequency, speed, colors, alpha) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 10) {
            const y = offsetY + 
                     Math.sin(x * frequency + time * speed) * amplitude +
                     Math.sin(x * frequency * 0.5 + time * speed * 1.3) * (amplitude * 0.5);
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `rgba(${colors[0]}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${colors[1]}, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(${colors[2]}, ${alpha * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.filter = 'none';
    }
    
    function drawOrb(x, y, size, color, blur) {
        ctx.save();
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(${color}, 0.4)`);
        gradient.addColorStop(0.5, `rgba(${color}, 0.2)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        ctx.clearRect(0, 0, width, height);
        
        time += 0.003;
        
        // Floating orbs with slow movement
        const orb1X = width * 0.2 + Math.sin(time * 0.5) * 100;
        const orb1Y = height * 0.3 + Math.cos(time * 0.3) * 80;
        drawOrb(orb1X, orb1Y, 250, '239, 97, 255', 80);
        
        const orb2X = width * 0.8 + Math.sin(time * 0.4) * 120;
        const orb2Y = height * 0.6 + Math.cos(time * 0.5) * 100;
        drawOrb(orb2X, orb2Y, 300, '255, 163, 73', 90);
        
        const orb3X = width * 0.5 + Math.sin(time * 0.6) * 80;
        const orb3Y = height * 0.5 + Math.cos(time * 0.4) * 60;
        drawOrb(orb3X, orb3Y, 200, '168, 139, 250', 70);
        
        // Flowing waves
        drawWave(
            height * 0.7,
            50,
            0.003,
            0.3,
            ['239, 97, 255', '168, 139, 250', '122, 74, 168'],
            0.15
        );
        
        drawWave(
            height * 0.8,
            40,
            0.004,
            0.4,
            ['255, 163, 73', '239, 97, 255', '168, 139, 250'],
            0.12
        );
    }
    
    resize();
    animate();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
        }, 250);
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
    }
})();