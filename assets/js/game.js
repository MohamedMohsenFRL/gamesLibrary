let loading = document.querySelector("#loading");

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d7b657df34msh55c6fa777c88345p1f42fbjsn4e228e2c0d10",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

export class Games {
  constructor(category) {
    this.category = category;
  }

  getApi() {
    return `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
  }

  async callApi() {
    loading.classList.replace("d-none", "d-flex");
    let result = await fetch(this.getApi(), options);
    let finalRes = await result.json();
    if (result.ok) {
      loading.classList.replace("d-flex", "d-none");
      return finalRes;
    }
  }
}
