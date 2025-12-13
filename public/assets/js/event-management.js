  $(document).ready(function() {
            const canvas = document.getElementById('spotlightCanvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const heroSection = document.querySelector('.hero-section');
            let spotlights = [];
            
            function resizeCanvas() {
                canvas.width = heroSection.offsetWidth;
                canvas.height = heroSection.offsetHeight;
            }
            resizeCanvas();
            $(window).resize(resizeCanvas);

            // Spotlight effect - coming from bottom, pointing at title
            class Spotlight {
                constructor(index, total) {
                    this.index = index;
                    this.total = total;
                    this.reset();
                }
                
                reset() {
                    // Fixed positions evenly distributed
                    const spacing = canvas.width / (this.total + 1);
                    this.x = spacing * (this.index + 1);
                    this.startY = canvas.height + 50;
                    this.length = Math.random() * 500 + 400;
                    this.width = Math.random() * 100 + 60;
                    this.angle = (Math.random() * 20 - 10); // Fixed angle
                    this.opacity = Math.random() * 0.2 + 0.1;
                    this.color = Math.random() > 0.5 ? 'rgba(250, 154, 130,' : 'rgba(222, 87, 227,';
                    this.pulseSpeed = Math.random() * 0.02 + 0.01;
                    this.pulseOffset = Math.random() * Math.PI * 2;
                }
                
                update() {
                    // Only pulse effect
                    this.pulseOffset += this.pulseSpeed;
                    this.currentOpacity = this.opacity + Math.sin(this.pulseOffset) * 0.05;
                }
                
                draw() {
                    ctx.save();
                    ctx.translate(this.x, this.startY);
                    ctx.rotate((this.angle * Math.PI) / 180);
                    
                    // Create gradient pointing upward
                    const gradient = ctx.createLinearGradient(0, 0, 0, -this.length);
                    gradient.addColorStop(0, this.color + ' ' + this.currentOpacity + ')');
                    gradient.addColorStop(0.3, this.color + ' ' + (this.currentOpacity * 0.7) + ')');
                    gradient.addColorStop(1, this.color + ' 0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(-this.width / 2, -this.length, this.width, this.length);
                    ctx.restore();
                }
            }

            // Create 5 spotlights with fixed positions
            for (let i = 0; i < 5; i++) {
                spotlights.push(new Spotlight(i, 5));
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                spotlights.forEach(spotlight => {
                    spotlight.update();
                    spotlight.draw();
                });
                
                requestAnimationFrame(animate);
            }
            animate();

            // Counter animation
            $('.counter').each(function() {
                const $this = $(this);
                const target = parseInt($this.data('target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    $this.text(Math.floor(current) + (target === 98 ? '' : '+'));
                }, 30);
            });

            // Smooth scroll
            $('.scroll-indicator').click(function() {
                $('html, body').animate({
                    scrollTop: $(window).height()
                }, 1000);
            });

            // CTA button interaction
            $('.cta-button').hover(
                function() {
                    $(this).addClass('glow');
                },
                function() {
                    $(this).removeClass('glow');
                }
            );

            // Parallax effect on scroll
            $(window).scroll(function() {
                const scrolled = $(window).scrollTop();
                $('.floating-orb').each(function(index) {
                    const speed = (index + 1) * 0.3;
                    $(this).css('transform', 'translateY(' + (scrolled * speed) + 'px)');
                });
            });

            // Card hover effects
            $('.feature-card').hover(
                function() {
                    $(this).find('.icon-wrapper').css('transform', 'translateY(-5px)');
                },
                function() {
                    $(this).find('.icon-wrapper').css('transform', 'translateY(0)');
                }
            );
        });