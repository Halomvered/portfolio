export var preloaderOff = function (animationTimer, entireTimer) {

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
};