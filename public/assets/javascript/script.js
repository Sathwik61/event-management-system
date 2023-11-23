window.addEventListener("load", () => {
  /* preloader */
  document.querySelector(".js-preloader").classList.add("loaded");
  document
    .querySelector(".js-preloader .js-bg-item")
    .addEventListener("transitionend", () => {
      document.querySelector(".js-preloader").style.display = "none";

      // initialize AOS
      AOS.init({
        duration: 1200,
        easing: "ease-in-out-cubic",
        once: true,
      });
    });
});

/* header menu */
function headerMenu() {
  const toggler = document.querySelector(".js-header-toggler");
  const menu = document.querySelector(".js-header-menu");
  const overlay = document.querySelector(".js-overlay");
  const items = menu.querySelectorAll("li");

  const menuToggle = () => {
    menu.classList.toggle("open");
    toggler.classList.toggle("active");
    overlay.classList.toggle("open");
  };
  toggler.addEventListener("click", menuToggle);

  // Close the menu when the overlay is clicked
  overlay.addEventListener("click", () => {
    if (menu.classList.contains("open")) {
      menuToggle();
    }
  });

  // Close the menu when the "Esc" key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      menuToggle();
    }

    // Open the menu when "Ctrl + M" is pressed
    if (
      event.ctrlKey &&
      event.key === "m" &&
      !menu.classList.contains("open")
    ) {
      menuToggle();
    }
  });

  // Remove the hash fragment from the URL after reaching the section
  items.forEach((item) => {
    item.querySelector("a").addEventListener("click", (event) => {
      if (window.innerWidth <= 991) {
        menuToggle();
      }

      // Get the href attribute of the clicked link
      const href = item.querySelector("a").getAttribute("href");

      // Check if the href is a hash fragment
      if (href.startsWith("#")) {
        // Prevent the default scroll behavior
        event.preventDefault();

        // Get the target element by the hash fragment
        const targetElement = document.querySelector(href);

        // Scroll to the target element
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });

          // Remove the hash fragment from the URL
          history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });
}

headerMenu();

/* SCROLL TO TOP */
let mybutton = document.getElementById("top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

/* schedule tabs
function scheduleTabs() {
  const tabs = document.querySelectorAll(".js-schedule-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) {
        return;
      }
      document
        .querySelector(".js-schedule-tab.active")
        .classList.remove("active");
      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      document
        .querySelector(".js-schedule-table.active")
        .classList.remove("active");
      document.querySelector(target).classList.add("active");
    });
  });
}
scheduleTabs(); */

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

//splitting
Splitting();
