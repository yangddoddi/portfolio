"strict";

// navbar

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(navbarHeight);

document.addEventListener("scroll", () => {
  console.log(window.scrollY);
  console.log(navbarHeight);
  if (window.scrollY >= navbarHeight) {
    navbar.classList.add("navbar__grey");
  } else {
    navbar.classList.remove("navbar__grey");
  }
});
