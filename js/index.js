const timeRadios = document.querySelectorAll('input[name="timeframe"]');
const timeframeLabels = {
  daily: "Last time",
  weekly: "Last week",
  monthly: "Last month",
};

fetch("./data.json")
  .then((response) => {
    if (!response.ok)
      throw new Error("Ha ocurrido un error al intentar cargar el archivo.");
    return response.json();
  })
  .then((data) => {
    updateData(data, "daily");
    timeRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        let timeframe = radio.id;
        updateData(data, timeframe);
      });
    });
  });

function updateData(jsonData, timeframe) {
  const cardTitle = document.querySelectorAll(".stats__title-title");
  const statsHours = document.querySelectorAll(".stats__hours");
  const statsPrevious = document.querySelectorAll(".stats__previous");

  jsonData.forEach((data, index) => {
    if (!cardTitle[index] || !statsHours[index] || !statsPrevious[index])
      return;

    cardTitle[index].textContent = data.title;
    statsHours[index].textContent = `${data.timeframes[timeframe].current}hrs`;
    statsPrevious[
      index
    ].textContent = `${timeframeLabels[timeframe]}: ${data.timeframes[timeframe].previous}hrs`;
  });
}
