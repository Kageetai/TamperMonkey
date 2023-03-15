// ==UserScript==
// @name         GitHub mark as viewed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  marks GitHub PR files as "viewed" when clicking Alt+V
// @author       Kageetai
// @match        https://github.com/*/pull/*/files*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const buttons = document.querySelectorAll('input[value="viewed"]:not(:checked)');

    const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
            const elem = entry.target;

            if (entry.isIntersecting) {

                if (entry.intersectionRatio >= 1) {
                    elem.classList.add('isVisible');
                }
            } else {
                elem.classList.remove('isVisible');
            }
        });
    };

    const observer = new IntersectionObserver(intersectionCallback, {threshold: 1});
    buttons.forEach(button => observer.observe(button));

    document.addEventListener('keydown', event => {
        if (event.altKey && event.code === 'KeyV') {
            const e = document.querySelector('input[value="viewed"]:not(:checked).isVisible:first-child');
            e.click();
            e.scrollIntoView(true);
        }
    });
})();
