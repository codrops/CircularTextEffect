import { preloadFonts } from '../utils';
import { Intro } from './intro';

const intro = new Intro(document.querySelector('.circles'));

// Preload images and fonts
Promise.all([preloadFonts('kxo3pgz')]).then(() => {
    // remove loader (loading class)
    document.body.classList.remove('loading');
    // start intro animation
    intro.start();
});
