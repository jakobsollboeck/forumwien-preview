// UTSC Forum Wien – Vanilla JS

// --- Mobile Navigation ---
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

toggle.addEventListener('click', () => {
	const open = menu.classList.toggle('is-open');
	toggle.setAttribute('aria-expanded', String(open));
	toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});

// Menü schließen nach Klick auf einen Link (mobil)
menu.addEventListener('click', (e) => {
	if (e.target.tagName === 'A') {
		menu.classList.remove('is-open');
		toggle.setAttribute('aria-expanded', 'false');
	}
});

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

// --- Dialoge (Impressum / Datenschutz) ---
document.querySelectorAll('[data-dialog]').forEach((btn) => {
	btn.addEventListener('click', () => {
		const dialog = document.getElementById(btn.dataset.dialog);
		if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
	});
});

document.querySelectorAll('dialog').forEach((dialog) => {
	// Schließen-Buttons
	dialog.querySelectorAll('[data-close]').forEach((btn) => {
		btn.addEventListener('click', () => dialog.close());
	});
	// Klick auf Backdrop schließt
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) dialog.close();
	});
});
