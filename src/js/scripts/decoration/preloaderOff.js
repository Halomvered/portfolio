export var preloaderOff = function (animationTimer, entireTimer) {

    // Check if browsed in IOS
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    // If browsed in IOS don't use preloader.
    if (iOS) {
        document.querySelector('.preloader__folding-cube').classList.toggle('page-loaded');
        document.querySelector('.preloader').classList.toggle('page-loaded');
        document.querySelector('.preloader').classList.toggle('hidden');
        document.querySelector('.main-content__field').classList.toggle('page-loaded');
        
    // Use it if broswed by any other browser.
    } else {
        setTimeout(() => {
            document.querySelector('.preloader__folding-cube').classList.toggle('page-loaded');
        }, animationTimer);

        setTimeout(() => {
            document.querySelector('.preloader').classList.toggle('page-loaded');
        }, entireTimer);
        
        setTimeout(() => {
            document.querySelector('.preloader').classList.toggle('hidden');
        }, (entireTimer + 1000));

        setTimeout(() => {
            document.querySelector('.main-content__field').classList.toggle('page-loaded');
        }, 4500);
    }
};