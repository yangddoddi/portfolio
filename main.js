"strict";

// When scrolling down the page, switch the navigation bar from transparent to smoke white.

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY >= navbarHeight) {
    navbar.classList.add("navbar__grey");
  } else {
    navbar.classList.remove("navbar__grey");
  }
});

// Pressing the menu button scrolls to the corresponding page.

const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const Target = event.target;
  const Position = Target.dataset.link;
  if (Position == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  const Link = document.querySelector(Position);

  Link.scrollIntoView({ behavior: "smooth" });
});

// Navbar toggle button

const hamburger = document.querySelector(".navbar__hamburger");

hamburger.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Navbar Active controll (retouch)

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonial",
  "#contact",
];

const sections = sectionIds.map(function (sectionId) {
  return document.querySelector(sectionId);
});
const navItems = sectionIds.map(function (sectionId) {
  return document.querySelector(`[data-link="${sectionId}"]`);
});

let indexNumber = 0;

function ActiveNavItem(target) {
  for (i = 0; i < navItems.length; i++) {
    if (i == indexNumber) {
      navItems[i].classList.add("active");
    } else {
      navItems[i].classList.remove("active");
    }
  }
}

function observerCallback(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting == false && entry.intersectionRatio > 0) {
      const entryIndex = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.intersectionRect.y == 0) {
        indexNumber = entryIndex + 1;
        console.log(entry.target);
        ActiveNavItem();
      } else {
        indexNumber = entryIndex - 1;
        ActiveNavItem();
      }
    }
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.clientHeight - 2) {
    // -2를 해줘야 macOS에서 정상적으로 작동함
    indexNumber = sectionIds.length - 1;
    ActiveNavItem();
  }
});

const observerOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(observerCallback, observerOption);

sections.forEach(function (entry) {
  observer.observe(entry);
});

const Contacbtn = document.querySelector(".home__contact");
Contacbtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// Home screen fade out.

const Home = document.querySelector("#home");
const HomeContainer = document.querySelector(".home__container");
document.addEventListener("scroll", () => {
  const Homeheight = Home.getBoundingClientRect().height;
  HomeContainer.style.opacity = 1 - scrollY / Homeheight;
});

//the button that moves to the top of the page.

const ArrowButton = document.querySelector(".arrowbutton");
const About = document.querySelector("#about");
const AboutTop = About.getBoundingClientRect().top;
document.addEventListener("scroll", () => {
  if (scrollY >= AboutTop) {
    ArrowButton.classList.add("pop");
  } else {
    ArrowButton.classList.remove("pop");
  }
});

function scrollIntoView(selector) {
  const Scrollto = document.querySelector(selector);
  Scrollto.scrollIntoView({ behavior: "smooth" });
}

ArrowButton.addEventListener("click", () => {
  scrollIntoView("#home");
});

// My work's menu

const Categories = document.querySelector(".work__categories");
const Categorybtn = document.querySelector(".categories__btn");
const Projects = document.querySelectorAll(".projects");
const Allprojects = document.querySelector(".work__projects");
Categories.addEventListener("click", (event) => {
  const Target = event.target;
  const Category =
    Target.dataset.category || Target.parentNode.dataset.category;

  // select diasble || able
  const Selected = document.querySelector(".categories__btn.selected");
  const SeletTarget =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  Selected.classList.remove("selected");
  SeletTarget.classList.add("selected");

  Allprojects.classList.add("animation__out");
  setTimeout(() => {
    Projects.forEach(function (e) {
      if (e.dataset.project == Category || "*" == Category) {
        e.classList.remove("projects__none");
      } else {
        e.classList.add("projects__none");
      }
    });
    Allprojects.classList.remove("animation__out");
  }, 300);
});
