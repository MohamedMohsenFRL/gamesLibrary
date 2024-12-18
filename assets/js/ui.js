let gameArray = [];
let cardContaienr = document.querySelector("#cardContaienr");
let detailsContainer = document.querySelector("#detailsContainer");
let gameHolder = document.querySelector("#gameHolder");

import { Details } from "./details.js";

export class Ui {
  constructor(games) {
    this.games = games;
  }

  displayAllgames() {
    this.games.then((resolve) => {
      gameArray = [...resolve];
      let blackBox = ``;

      for (let i = 0; i < gameArray.length; i++) {
        blackBox += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-4">
                <div class="inner h-100">
                  <div data-id="${gameArray[i].id}" id="card" class="card h-100 bg-transparent">
                    <div class="card-body">
                      <img class="w-100 mb-3" src="${gameArray[i].thumbnail}" alt="">
                      <div class="top d-flex gap-1 align-items-center justify-content-between">
                        <h2 class="card-title fs-14 text-white">${gameArray[i].title}</h2>
                        <button class="btn btn-primary px-2 py-1 fw-bolder fs-12">Free</button>
                      </div>
                      <p class="card-text text-center fs-14 text-alt">${gameArray[i].short_description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between text-body-secondary">
                      <span class="badge badge-color">${gameArray[i].genre}</span>
                      <span class="badge badge-color">${gameArray[i].platform}</span>
                    </div>
                  </div>
                </div>
              </div>`;
      }

      cardContaienr.innerHTML = blackBox;
      this.displayDetails();
    });
  }

  displayDetails() {
    let gamesCards = document.querySelectorAll("#card");

    gamesCards.forEach((card) => {
      card.addEventListener("click", () => {
        let gameId = new Details(card.getAttribute("data-id"));
        gameId.callApi().then((resolve) => {
          let selectedGame = resolve;

          let blackBox = `<div class="container">
        <header class="d-flex justify-content-between align-items-center">
          <h1 class="text-center text-white h3 py-4 nerko-one">Details Game</h1>
          <button id="closeDetails" class="btn-close btn-close-white"></button>
        </header>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="inner">
              <img class="w-100" src="${selectedGame.thumbnail}" alt="">
            </div>
          </div>
          <div class="col-md-8">
            <div class="inner text-white">
              <h3>Title: ${selectedGame.title}</h3>
              <p>Category: <span class="badge text-bg-info"> ${selectedGame.genre}</span> </p>
              <p>Platform: <span class="badge text-bg-info"> ${selectedGame.platform}</span> </p>
              <p>Status: <span class="badge text-bg-info"> ${selectedGame.status}</span> </p>
              <p class="fs-14">${selectedGame.description}</p>
                <a class="btn btn-outline-warning text-white" target="_blank" href="${selectedGame.game_url}">Show Game</a>
            </div>
          </div>
        </div>
      </div>`;

          detailsContainer.innerHTML = blackBox;
          detailsContainer.classList.remove("d-none");
          gameHolder.classList.add("d-none");
          
              document.querySelector("#closeDetails").addEventListener("click" , () => {
                  detailsContainer.classList.add("d-none");
                  gameHolder.classList.remove("d-none");
              })
        });
      });
    });
  }
}
