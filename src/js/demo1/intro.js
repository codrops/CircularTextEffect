import { randomNumber } from '../utils';
import { gsap } from 'gsap';

const DOM = {
    frame: document.querySelector('.frame'),
    content: document.querySelector('.content'),
    enterCtrl: document.querySelector('.enter'),
    enterBackground: document.querySelector('.enter__bg')
};

export class Intro {
    constructor(el) {
        // the SVG element
        this.DOM = {el: el};
        // SVG texts
        this.DOM.circleText = [...this.DOM.el.querySelectorAll('text.circles__text')];
        // total of texts
        this.circleTextTotal = this.DOM.circleText.length;
        // initial setudp
        this.setup();
    }
    setup() {
        // need to set the transform origin in the center
        gsap.set(this.DOM.circleText, { transformOrigin: '50% 50%' });
        // hide on start
        gsap.set([this.DOM.circleText, DOM.content.children, DOM.frame.children], {opacity: 0});
        // don't allow to hover
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});

        this.initEvents();
    }
    initEvents() {
        // click and hover events for the "enter" button:
        this.enterMouseEnterEv = () => {
            gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);
            
            gsap.to(DOM.enterBackground, {
                duration: 0.8,
                ease: 'power4',
                scale: 1.2,
                opacity: 1
            });
            
            gsap.to(this.DOM.circleText, {
                duration: 4,
                ease: 'power4',
                rotate: '+=180',
                stagger: {
                    amount: -0.3
                }
            });
        };
        this.enterMouseLeaveEv = () => {
            //gsap.killTweensOf(DOM.enterBackground);
            gsap.to(DOM.enterBackground, {
                duration: 0.8,
                ease: 'power4',
                scale: 1
            });
        };
        this.enterClickEv = () => this.enter();
        
        DOM.enterCtrl.addEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.addEventListener('mouseleave', this.enterMouseLeaveEv);
        DOM.enterCtrl.addEventListener('click', this.enterClickEv);
    }
    // initial (intro) animation
    start() {
        this.startTL = gsap.timeline()
        .addLabel('start', 0)
        // scale in the texts & enter button and fade them in
        .to([this.DOM.circleText, DOM.enterCtrl], {
            duration: 2.5,
            ease: 'expo',
            startAt: {opacity: 0, scale: 0.3},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.5
            }
        }, 'start')
        // at start+1 allow the hover over the enter ctrl
        .add(() => gsap.set(DOM.enterCtrl, {pointerEvents: 'auto'}), 'start+=1');
    }
    // animation when clicking the enter button
    enter() {
        // stop the previous timeline
        this.startTL.kill();
        // remove any event listener on the button
        DOM.enterCtrl.removeEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.removeEventListener('mouseleave', this.enterMouseLeaveEv);
        DOM.enterCtrl.removeEventListener('click', this.enterClickEv);
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});
        // show frame and content
        gsap.set([DOM.frame, DOM.content], {opacity: 1});
        // start the animation
        gsap.timeline()
        .addLabel('start', 0)
        .to(DOM.enterCtrl, {
            duration: 1.5,
            ease: 'expo.inOut',
            scale: 0.7,
            opacity: 0
        }, 'start')
        .to(this.DOM.circleText, {
            duration: 1.5,
            ease: 'expo.inOut',
            scale: i => 1.5+(this.circleTextTotal-i)*.3,
            opacity: 0,
            stagger: {
                amount: 0.2
            }
        }, 'start')
        // show the content elements
        .to([DOM.content.children, DOM.frame.children], {
            duration: 1,
            ease: 'power3.out',
            startAt: {opacity: 0, scale: 0.9},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.3
            }
        }, 'start+=1.1')
    }
}