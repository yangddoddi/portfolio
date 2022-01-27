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
  selectNavItem(Target);
});

// Navbar toggle button

const hamburger = document.querySelector(".navbar__hamburger");

hamburger.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// 1. 모든 섹션 요소들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonial",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
const ObserverOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, ObserverOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }

  selectNavItem(navItems[selectedNavIndex]);
});

// Pressing the Contact Me button moves to the contact item.

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
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
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

//$ git commit --allow-empty -m "Trigger rebuild" $ git push
