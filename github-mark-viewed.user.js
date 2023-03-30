// ==UserScript==
// @name            GitHub mark as viewed
// @namespace       http://tampermonkey.net/
// @version         1.0.1
// @description     marks GitHub PR files as "viewed" when clicking Alt+V
// @author          Kageetai
// @homepageUrl     https://github.com/Kageetai/TamperMonkey
// @contributionUrl https://github.com/Kageetai/TamperMonkey
// @supportUrl      https://github.com/Kageetai/TamperMonkey/issues
// @updateURL       https://openuserjs.org/meta/Kageetai/github-mark-viewed.meta.js
// @match           https://github.com/*/pull/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant           none
// @license         MIT
// @copyright       2023, Kageetai (https://openuserjs.org/users/Kageetai)
// ==/UserScript==

(function () {
    'use strict';

    // IntersectionObserver to detect when a button is visible and add class to it
    const observer = new IntersectionObserver(function (entries) {
        return entries.forEach(function (entry) {
            const elem = entry.target;

            if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                elem.classList.add('isVisible');
            } else {
                elem.classList.remove('isVisible');
            }
        });
    }, {threshold: 1});

    window.addEventListener('load', function () {
        document
            .querySelectorAll('input[value="viewed"]:not(:checked)')
            .forEach(function (button) {
                return observer.observe(button);
            });
    })


    // keyboard shortcut event listener
    document.addEventListener('keyup', function (event) {
        if (event.altKey && event.code === 'KeyV') {
            const e = document.querySelector('input[value="viewed"]:not(:checked).isVisible:first-child');
            e.click();
            e.scrollIntoView({block: "start", behavior: "smooth"});
            observer.unobserve(e);
        }
    });
})();
