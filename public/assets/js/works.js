 const works = {
            1: {
                title: 'Annual Tech Summit 2024',
                description: 'A comprehensive 3-day international technology conference that brought together 5000+ industry leaders, innovators, and tech enthusiasts. The event featured keynote speeches, panel discussions, and networking opportunities.',
                details: ['Duration: 3 days', 'Attendees: 5000+', 'Speakers: 50+', 'Workshops: 25'],
                image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200'
            },
            2: {
                title: 'Summer Music Festival',
                description: 'An unforgettable outdoor music experience featuring multiple stages, international artists, and cutting-edge production. Over 50,000 fans enjoyed three days of non-stop entertainment.',
                details: ['Stages: 5', 'Artists: 80+', 'Days: 3', 'Attendees: 50,000+'],
                video: 'https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-at-a-rock-show-4685-large.mp4'
            },
            3: {
                title: 'Art & Design Expo',
                description: 'An immersive exhibition showcasing contemporary art and innovative design. Featured interactive installations, live demonstrations, and works from 100+ artists.',
                details: ['Artists: 100+', 'Installations: 50', 'Duration: 1 month', 'Visitors: 30,000+'],
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'
            },
            4: {
                title: 'Luxury Brand Launch',
                description: 'An exclusive VIP event for the unveiling of a luxury brand\'s flagship product line. The evening featured live performances, gourmet dining, and interactive brand experiences.',
                details: ['VIP Guests: 200', 'Media Coverage: International', 'Entertainment: Live performances', 'Duration: 4 hours'],
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200'
            },
            5: {
                title: 'National Day Celebration',
                description: 'A spectacular celebration of national heritage featuring a grand fireworks display, cultural performances, traditional music, and family-friendly activities.',
                details: ['Fireworks: 30 minutes', 'Performers: 500+', 'Attendees: 100,000+', 'Coverage: National TV'],
                video: 'https://assets.mixkit.co/videos/preview/mixkit-fireworks-at-a-festival-4158-large.mp4'
            },
            6: {
                title: 'International Film Awards',
                description: 'A prestigious red carpet gala honoring the year\'s best films and filmmakers. The star-studded event featured live performances, award presentations, and exclusive after-party.',
                details: ['Attendees: 1000+', 'Awards: 25 categories', 'Broadcast: 50+ countries', 'Red Carpet: 100m'],
                image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200'
            },
            7: {
                title: 'Electronic Music Night',
                description: 'A high-energy electronic music event featuring world-renowned DJs, state-of-the-art sound systems, and mesmerizing visual effects that created an unforgettable audiovisual experience.',
                details: ['DJs: 10 international', 'Sound: 150,000 watts', 'Visuals: 4K LED screens', 'Capacity: 8,000'],
                image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200'
            },
            8: {
                title: 'International Trade Expo',
                description: 'A premier B2B exhibition connecting businesses worldwide. Featured 300+ exhibitors from 40 countries, networking events, and industry seminars.',
                details: ['Exhibitors: 300+', 'Countries: 40', 'Visitors: 15,000+', 'Business Deals: $50M+'],
                image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200'
            },
            9: {
                title: 'Luxury Fashion Week',
                description: 'A week-long celebration of haute couture featuring runway shows from international designers, exclusive previews, and industry networking events.',
                details: ['Designers: 50+', 'Shows: 30', 'Models: 200+', 'Media: 500+ outlets'],
                image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200'
            },
            10: {
                title: 'Championship Finals',
                description: 'A thrilling stadium event that brought together 80,000 passionate fans for the championship finals. Complete production with massive screens, sound, and entertainment.',
                details: ['Capacity: 80,000', 'Screens: 4 mega LED', 'Sound: Stadium-grade', 'Duration: 5 hours'],
                image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200'
            }
        };

        // Video hover play/pause
        const videos = document.querySelectorAll('.work-card video');
        videos.forEach(video => {
            const card = video.closest('.work-card');
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });

        // Modal functionality
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach(card => {
            card.addEventListener('click', () => {
                const workId = card.dataset.id;
                const work = works[workId];
                
                let mediaHtml = '';
                if (work.video) {
                    mediaHtml = `<video controls autoplay style="width: 100%; border-radius: 16px; margin-bottom: 2rem;">
                        <source src="${work.video}" type="video/mp4">
                    </video>`;
                } else {
                    mediaHtml = `<img src="${work.image}" style="width: 100%; border-radius: 16px; margin-bottom: 2rem;">`;
                }

                document.getElementById('modalBody').innerHTML = `
                    ${mediaHtml}
                    <h2 class="text-4xl font-bold mb-4 gradient-text">${work.title}</h2>
                    <p class="text-gray-300 text-lg mb-6 leading-relaxed">${work.description}</p>
                    <h3 class="text-2xl font-bold mb-4">Project Details</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${work.details.map(detail => `
                            <div class="bg-white bg-opacity-5 p-4 rounded-xl border border-white border-opacity-10">
                                <p class="text-gray-300">${detail}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                document.getElementById('workModal').classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            document.getElementById('workModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal on backdrop click
        document.getElementById('workModal').addEventListener('click', (e) => {
            if (e.target.id === 'workModal') {
                closeModal();
            }
        });

          // 3D Tilt for Hero Title
        const heroSection = document.getElementById('heroSection');
        const heroTitle = document.getElementById('heroTitle');
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            heroTitle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroTitle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });


        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });