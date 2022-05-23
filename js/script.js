"use strict"

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// Swiper
const swiper = new Swiper('.swiper', {
	watchOverflow: true,
	spaceBetween: 100,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
});
const clientsSwiper = new Swiper('.clients__slider', {
	watchOverflow: true,
	spaceBetween: 100,
	speed: 800,
	autoplay: {
		delay: 1000,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		280: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 4,
		},
	},
});

// Validator
const form = document.querySelector('#form');

const checkValidity = (input) => {
	input.classList.remove('form__input_valid');
	input.classList.remove('form__input_invalid');
	input.nextElementSibling.textContent = '';
	if (input.checkValidity()) {
		input.classList.add('form__input_valid');
		input.nextElementSibling.textContent = 'Отлично!';
	} else {
		input.classList.add('form__input_invalid');
		input.nextElementSibling.textContent = input.validationMessage;
	}
}
const checkValidityAll = () => {
	const inputs = form.querySelectorAll('input');
	inputs.forEach((input) => {
		checkValidity(input);
	});
}

const onCheckValidity = (e) => {
	const target = e.target;
	if (!target.classList.contains('form__input')) {
		return;
	}
	checkValidity(target);
}

form.addEventListener('change', onCheckValidity);
form.addEventListener('keydown', onCheckValidity);
form.addEventListener('keyup', onCheckValidity);
checkValidityAll();

form.addEventListener('submit', (e) => {
	e.preventDefault();
	checkValidityAll();
});
