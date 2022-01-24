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
  const Hometop = Home.getBoundingClientRect().top;
  const Homebottom = Home.getBoundingClientRect().bottom;
  console.log(Homeheight);
  console.log(Hometop);
  console.log(Homebottom);
  console.log(scrollY);
  console.log(1 - scrollY / Homeheight);
  HomeContainer.style.opacity = 1 - scrollY / Homeheight;
});
