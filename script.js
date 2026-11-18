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
		// Ziele werden hier markiert (nicht im HTML), damit ohne JS alles sichtbar bleibt.
		const revealEls = document.querySelectorAll([
			'.section__title', '.kids__subtitle', '.saal', '.saal__card', '.ig', '.site-footer__inner',
			'.cards > *', '.offers > *', '.kids__tiles > *', '.kids > p', '.kids > .btn', '.team > *', '.contact > *'
		].join(','));
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		revealEls.forEach((el) => el.setAttribute('data-reveal', ''));
		if (reduceMotion || !('IntersectionObserver' in window)) {
			revealEls.forEach((el) => el.classList.add('is-visible'));
		} else {
			const observer = new IntersectionObserver((entries, obs) => {
				// Gleichzeitig sichtbare Elemente nacheinander einblenden (150 ms Versatz, max. 600 ms)
				entries.filter((e) => e.isIntersecting).forEach((entry, i) => {
					entry.target.style.setProperty('--reveal-delay', Math.min(i * 150, 600) + 'ms');
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
				});
			}, { threshold: 0.12 });
			revealEls.forEach((el) => observer.observe(el));
		}

		// --- Info-Dialoge (Impressum / Datenschutz) öffnen ---
		document.querySelectorAll('[data-dialog]').forEach((btn) => {
			btn.addEventListener('click', () => {
				const dialog = document.getElementById(btn.dataset.dialog);
				if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
			});
		});

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
