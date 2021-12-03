const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navClose = document.getElementById("navClose");
const filterToggle = document.getElementById("filterToggle");
const filter = document.getElementById("filter");
const filterClose = document.getElementById("filterClose");
burger.addEventListener("click",() => {
  nav.classList.toggle("active");
});

navClose.addEventListener("click", () => {
  nav.classList.remove("active");
});
if (filterToggle) {
  filterToggle.addEventListener("click", () => {
    filter.classList.toggle("active");
  });
}

if (filterClose) {
  filterClose.addEventListener("click", () => {
    filter.classList.remove("active");
  });
}


