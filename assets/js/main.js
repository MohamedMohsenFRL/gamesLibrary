let navLinks = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
let category = "mmorpg";

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    category = e.target.innerHTML;
    getAllGames();
  });
});

import { Games } from "./game.js";
import { Ui } from "./ui.js";

function getAllGames() {
  let games = new Games(category);
  let displayGames = new Ui(games.callApi());
  displayGames.displayAllgames();
}

(() => {
  getAllGames();
})();
