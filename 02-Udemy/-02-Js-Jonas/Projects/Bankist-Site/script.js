'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav')
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////btn scrolling
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: "smooth" })
})

////// 

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" })
//   }))
//////// event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  }
})

///////tab component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  if (!clicked) return;

  ///remove classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  ////add classes
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

//////////navigation 
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(e => {
      if (e !== link) {
        e.style.opacity = opacity
      }
      logo.style.opacity = opacity
    })
  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, .5)
})
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1)
})

//////STICKY NAV BAR 

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
const navHieght = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////////
/////////reveal sections 
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden')
  sectionObserver.observe(section)
})
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
///LAZY LOADING IMG 

const imgTargets = document.querySelectorAll('img[data-src]');
const lazyImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
}
const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '-10px'
});

imgTargets.forEach(img => imgObserver.observe(img))

///////////////////////////////////////////////////
///////////////////////////////////////////////////
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots');
const maxSlides = slides.length;
let curSlide = 0;

const activateDots = function (slide) {
  document.querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activateDots(0);


const creatDots = function () {
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML('beforeend', `
    <button class="dots__dot dots__dot--active"data-slide="${i}"></button>`)
  )
}

creatDots();
const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}


goToSlide(0)
const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++
  }
  goToSlide(curSlide)
  activateDots(curSlide)
}

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlides - 1;
  else curSlide--;
  goToSlide(curSlide)
  activateDots(curSlide)
}


btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide)
    activateDots(slide)
  }
})