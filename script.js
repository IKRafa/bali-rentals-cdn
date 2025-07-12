function tampilkanWaktu() {
    const waktuElement = document.querySelector('.time-text');
    const dateElement = document.querySelector('.date-text');

    function updateWaktu() {
        const sekarang = new Date();
        const jam = String(sekarang.getHours()).padStart(2, '0');
        const menit = String(sekarang.getMinutes()).padStart(2, '0');
        const detik = String(sekarang.getSeconds()).padStart(2, '0');

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const tanggal = sekarang.toLocaleDateString('id-ID', options);

        waktuElement.textContent = `${jam}:${menit}:${detik}`;
        if (dateElement) {
            dateElement.textContent = tanggal;
        }
    }

    updateWaktu();
    setInterval(updateWaktu, 1000);
}

function initCarousel() {
    if (window.innerWidth <= 768) {
        const container = document.querySelector('.motor-section');
        const items = document.querySelectorAll('.motor-item');

        const updateItems = () => {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width / 2;
                const distance = itemCenter - containerCenter;

                item.classList.remove('is-previous', 'is-current', 'is-next');

                if (Math.abs(distance) < itemRect.width * 0.5) {
                    item.classList.add('is-current');
                } else if (distance < 0) {
                    item.classList.add('is-previous');
                } else {
                    item.classList.add('is-next');
                }
            });
        };

        container.addEventListener('scroll', updateItems);
        window.addEventListener('resize', updateItems);
        updateItems();
    }
}

function initScrollButton() {
    const scrollButton = document.querySelector('.sticky-button');

    if (scrollButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollButton.classList.remove('hidden');
            } else {
                scrollButton.classList.add('hidden');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initScrollReveal() {
    const motorItems = document.querySelectorAll('.motor-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    motorItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    tampilkanWaktu();
    initCarousel();
    initScrollButton();
    initScrollReveal();
});