// BUTTONS
const buttonDaily = document.querySelector(".div-buttons__btnDaily");
const buttonWeekly = document.querySelector(".div-buttons__btnWeekly");
const buttonMonthly = document.querySelector(".div-buttons__btnMonthly");

let jsonData = [];

async function fetchData() {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");
    jsonData = await response.json();
    renderData("daily");
  } catch (e) {
    console.error("Error al obtener el JSON: ", e);
  }
}

function renderData(timeframe) {
  const main = document.querySelector(".container__main");
  main.innerHTML = "";

  jsonData.forEach((item) => {
    const html = `
  <div class="container__main-${item.title
    .toLowerCase()
    .replace(
      /\s+/g,
      "-"
    )} container__main-data" style="background-color: var(--Bg-color-${item.title
      .toLowerCase()
      .replace(/\s+/g, "-")})">

    <div class="main-${item.title
      .toLowerCase()
      .replace(/\s+/g, "-")}__topimg main-topimg">
      <img class="main-topimg__img" src="./images/icon-${item.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.svg" alt="">
    </div>

    <div class="main-${item.title
      .toLowerCase()
      .replace(/\s+/g, "-")}__stats main__stats">

      <div class="stats__title">
        <p class="stats__title-title">${item.title
          .toLowerCase()
          .replace(/\s+/g, "-")}</p>
        <img class="stats__title-ellipsis" src="./images/icon-ellipsis.svg" alt="">
      </div>

      <div class="stats__stats">
        <p class="stats__hours">${item.timeframes[timeframe].current}hrs</p>
        <p class="stats__previous">Last time ${
          item.timeframes[timeframe].previous
        }hrs</p>
      </div>

    </div>

  </div>
    `;
    main.innerHTML += html;
  });
}

function changeTimeframe(timeframe) {
  const statsHours = document.querySelectorAll(".stats__hours");
  const statsPrevious = document.querySelectorAll(".stats__previous");

  jsonData.forEach((item, index) => {
    statsHours[index].textContent = `${item.timeframes[timeframe].current}hrs`;
    statsPrevious[
      index
    ].textContent = `Last time ${item.timeframes[timeframe].previous}hrs`;
  });
}

buttonDaily.addEventListener("click", () => {
  changeTimeframe("daily");
});

buttonWeekly.addEventListener("click", () => {
  changeTimeframe("weekly");
});

buttonMonthly.addEventListener("click", () => {
  changeTimeframe("monthly");
});

fetchData();
