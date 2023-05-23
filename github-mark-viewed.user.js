// ==UserScript==
// @name            GitHub mark as viewed
// @namespace       http://tampermonkey.net/
// @version         1.0.2
// @description     marks GitHub PR files as "viewed" when clicking Alt+V
// @author          Kageetai
// @homepageUrl     https://github.com/Kageetai/TamperMonkey
// @contributionUrl https://github.com/Kageetai/TamperMonkey
// @supportUrl      https://github.com/Kageetai/TamperMonkey/issues
// @updateURL       https://openuserjs.org/meta/Kageetai/github-mark-viewed.meta.js
// @downloadURL       https://openuserjs.org/meta/Kageetai/github-mark-viewed.meta.js
// @match           https://github.com/*/pull/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant           none
// @license         MIT
// @copyright       2023, Kageetai (https://openuserjs.org/users/Kageetai)
// ==/UserScript==

(() => {
    'use strict';

    // IntersectionObserver to detect when a button is visible and add class to it
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        const elem = entry.target;

        if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            elem.classList.add('isVisible');
        } else {
            elem.classList.remove('isVisible');
        }
    }), {threshold: 1});

    const observeButtons = () => {
        // wait if GitHub is still loading more diffs
        if (document.querySelector('.diff-progressive-loader') !== null) {
            setTimeout(observeButtons, 1000);
        } else {
            document
                .querySelectorAll('input[value="viewed"]:not(:checked)')
                .forEach(button => observer.observe(button));
        }
    };

    window.addEventListener('load', observeButtons);


    // keyboard shortcut event listener
    document.addEventListener('keyup', event => {
        if (event.altKey && event.code === 'KeyV') {
            const e = document.querySelector('input[value="viewed"]:not(:checked).isVisible:first-child');

            if (e !== null) {
                e.click();
                e.scrollIntoView({block: "start", behavior: "smooth"});
                observer.unobserve(e);
            }
        }
    });
})();
