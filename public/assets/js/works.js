
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
        
        // Get translated work data from i18next
        const workKey = `works:Modal.Works.Work${workId}`;
        const title = i18next.t(`${workKey}.Title`);
        const description = i18next.t(`${workKey}.Description`);
        const details = [
            i18next.t(`${workKey}.Details.Detail1`),
            i18next.t(`${workKey}.Details.Detail2`),
            i18next.t(`${workKey}.Details.Detail3`),
            i18next.t(`${workKey}.Details.Detail4`)
        ];
        
        // Get media paths (these stay the same)
        const mediaPath = {
            1: { type: 'image', src: '/public/assets/images/works/04.jpg' },
            2: { type: 'video', src: '/public/assets/videos/حديقة الليوان بحي الفلاح.mp4' },
            3: { type: 'image', src: '/public/assets/images/works/kids.jpg' },
            4: { type: 'image', src: '/public/assets/images/works/حديقة-الكناري-الرياض.png' },
            5: { type: 'video', src: '/public/assets/videos/فعالية حديقة الكناري حي الحمراء.mp4' },
            6: { type: 'video', src: '/public/assets/videos/فعاليات منتزه الدوح حي طويق.mp4' },
            7: { type: 'video', src: '/public/assets/videos/تجهيز-الفعالية.mp4' }
        }[workId];
        
        let mediaHtml = '';
        if (mediaPath.type === 'video') {
            mediaHtml = `<video controls autoplay style="width: 100%; border-radius: 16px; margin-bottom: 2rem;">
                <source src="${mediaPath.src}" type="video/mp4">
            </video>`;
        } else {
            mediaHtml = `<img src="${mediaPath.src}" style="width: 100%; border-radius: 16px; margin-bottom: 2rem;">`;
        }

        // Get translated "Details" heading
        const detailsHeading = i18next.t('works:Modal.DetailsHeading');

        document.getElementById('modalBody').innerHTML = `
            ${mediaHtml}
            <h2 class="text-3xl sm:text-4xl font-bold mb-4 gradient-text">${title}</h2>
            <p class="text-gray-300 text-lg mb-6 leading-relaxed">${description}</p>
            <h3 class="text-2xl font-bold mb-4">${detailsHeading}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${details.map(detail => `
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
    const modal = document.getElementById('workModal');

    // Pause modal video if exists
    const modalVideo = modal.querySelector('video');
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.remove(); // stops background playback completely
    }

    // Pause card videos
    document.querySelectorAll('.work-card video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

        // Close modal on backdrop click
        document.getElementById('workModal').addEventListener('click', (e) => {
            if (e.target.id === 'workModal') {
                closeModal();
            }
        });

      const heroSection = document.getElementById('heroSection');
const heroTitle = document.getElementById('heroTitle');

let mouseX = 0;
let mouseY = 0;
let rafId = null;

heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
    }
});

function updateTilt() {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (mouseY - centerY) / 40;
    const rotateY = (centerX - mouseX) / 40;

    heroTitle.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateZ(20px)`;

    rafId = null;
}

heroSection.addEventListener('mouseleave', () => {
    heroTitle.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
});



        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });




        