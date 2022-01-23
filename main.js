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
console.log(navbarMenu);
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

const Home = document.querySelector("#home");
Home.addEventListener("click", (event) => {
  const ContactMe = document.querySelector("#contact");
  ContactMe.scrollIntoView({ behavior: "smooth" });
});
