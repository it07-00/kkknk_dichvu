(function () {
    'use strict';

    var section = document.querySelector('.bao-chau-partners');
    if (!section) return;

    var track = section.querySelector('.bao-chau-partners__track');
    var slides = section.querySelectorAll('.bao-chau-partners__slide');
    var previousButton = section.querySelector('.bao-chau-partners__nav--prev');
    var nextButton = section.querySelector('.bao-chau-partners__nav--next');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var currentIndex = 0;
    var autoplayTimer = null;

    function visibleSlides() {
        if (window.innerWidth >= 1536) return 8;
        if (window.innerWidth >= 1280) return 7;
        if (window.innerWidth >= 1024) return 6;
        if (window.innerWidth >= 768) return 4;
        if (window.innerWidth >= 640) return 3;
        return 2;
    }

    function render() {
        var visible = visibleSlides();
        var maximumIndex = Math.max(0, slides.length - visible);
        currentIndex = Math.min(currentIndex, maximumIndex);
        track.style.transform = 'translate3d(' + (currentIndex * (-100 / visible)) + '%, 0, 0)';
    }

    function move(direction) {
        var maximumIndex = Math.max(0, slides.length - visibleSlides());
        currentIndex += direction;

        if (currentIndex > maximumIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maximumIndex;

        render();
    }

    function stopAutoplay() {
        if (autoplayTimer) window.clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function startAutoplay() {
        stopAutoplay();
        if (!reduceMotion) {
            autoplayTimer = window.setInterval(function () {
                move(1);
            }, 3500);
        }
    }

    previousButton.addEventListener('click', function () {
        move(-1);
        startAutoplay();
    });

    nextButton.addEventListener('click', function () {
        move(1);
        startAutoplay();
    });

    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);
    section.addEventListener('focusin', stopAutoplay);
    section.addEventListener('focusout', startAutoplay);
    window.addEventListener('resize', render);

    render();
    startAutoplay();
})();
