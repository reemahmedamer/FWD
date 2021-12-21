/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section");
const list = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const isInViewport = (e) => {
  const item = e.getBoundingClientRect();
  const elementHeight = e.offsetHeight;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const screenFactor = windowHeight > 1000 ? 1.5 : 0.75;

  return (
    // rect.bottom > 0 &&
    //     rect.right > 0 &&
    //     rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
    //     rect.top < (window.innerHeight || document.documentElement.clientHeight)
    item.top >= -(elementHeight / 2) && item.bottom <= windowHeight / 0.8
  );
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const buildNav = () => {
  for (let section of sections) {
    let sectionName = section.attributes["data-nav"].nodeValue;
    let listElement = document.createElement("li");
    listElement.innerHTML = `<a href="#${section.id}" data-section-id="${section.id}" class="menu__link">${sectionName}</a>`;
    list.appendChild(listElement);
  }
};

// Add class 'active' to section when near top of viewport

const active = () => {
  document.addEventListener("scroll", function () {
    for (let section of sections) {
      let navItem = document.querySelector(`[data-section-id="${section.id}"]`);

      if (isInViewport(section)) {
        section.classList.add("active");
        navItem.classList.add("itemActive");
      } else {
        section.classList.remove("active");
        navItem.classList.remove("itemActive");
      }
    }
  });
};

// Scroll to anchor ID using scrollTO event

const scrollTo = () => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      let sectionId = e.target.attributes["data-section-id"].nodeValue;
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    });
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
const links = document.querySelectorAll(".menu__link");

// Scroll to section on link click
scrollTo();

// Set sections as active
active();
