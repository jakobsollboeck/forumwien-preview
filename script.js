// UTSC Forum Wien – Vanilla JS (robust, ohne Abhängigkeiten)
(function () {
	'use strict';

	function init() {
		// --- Mobile Navigation ---
		const toggle = document.getElementById('navToggle');
		const menu = document.getElementById('navMenu');
		if (toggle && menu) {
			toggle.addEventListener('click', () => {
				const open = menu.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', String(open));
				toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
			});
			menu.addEventListener('click', (e) => {
				if (e.target.tagName === 'A') {
					menu.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
				}
			});
		}

		// --- Scroll-Reveal ---
		const revealEls = document.querySelectorAll('[data-reveal]');
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion || !('IntersectionObserver' in window)) {
			revealEls.forEach((el) => el.classList.add('is-visible'));
		} else {
			const observer = new IntersectionObserver((entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						obs.unobserve(entry.target);
					}
				});
			}, { threshold: 0.15 });
			revealEls.forEach((el) => observer.observe(el));
		}

		// --- Info-Dialoge (Impressum / Datenschutz) öffnen ---
		document.querySelectorAll('[data-dialog]').forEach((btn) => {
			btn.addEventListener('click', () => {
				const dialog = document.getElementById(btn.dataset.dialog);
				if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
			});
		});

		// --- Flyer-Lightbox (Desktop) öffnen ---
		const lightbox = document.getElementById('flyerLightbox');
		const flyerBtn = document.querySelector('.flyer-preview-button');
		if (lightbox && flyerBtn && typeof lightbox.showModal === 'function') {
			flyerBtn.addEventListener('click', () => lightbox.showModal());
		}

		// --- Zurück-nach-oben-Button ---
		const backToTop = document.getElementById('backToTop');
		if (backToTop) {
			const onScroll = () => {
				backToTop.classList.toggle('is-visible', window.scrollY > 400);
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
			backToTop.addEventListener('click', (e) => {
				e.preventDefault();
				const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
				window.scrollTo({ top: 0, behavior: behavior });
			});
		}

		// --- Alle <dialog> schließbar: X-Button und Klick auf Backdrop (ESC ist nativ) ---
		document.querySelectorAll('dialog').forEach((dialog) => {
			dialog.querySelectorAll('[data-close]').forEach((btn) => {
				btn.addEventListener('click', () => dialog.close());
			});
			dialog.addEventListener('click', (e) => {
				if (e.target === dialog) dialog.close();
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
