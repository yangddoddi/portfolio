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
  const Link = document.querySelector(Position);
  Link.scrollIntoView({ behavior: "smooth" });
});

// Pressing the Contact Me button moves to the contact item.

const Contacbtn = document.querySelector(".home__contact");
Contacbtn.addEventListener("click", (event) => {
  const ContactMe = document.querySelector("#contact");
  ContactMe.scrollIntoView({ behavior: "smooth" });
});

// Home screen fade out.

const Home = document.querySelector("#home");
const HomeContainer = document.querySelector(".home__container");
document.addEventListener("scroll", () => {
  const Homeheight = Home.getBoundingClientRect().height;
  HomeContainer.style.opacity = 1 - scrollY / Homeheight;
});

// If you click, the button that moves to the top of the page.

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
