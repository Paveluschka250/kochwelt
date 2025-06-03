let portionsStart = 4;
let recipieIngedredients;
let recipieText;

recipieIngedredients = [
  ["0.5", "EL", "Olivenöl"],
  ["125", "g", "Hackfleisch, gemischtes"],
  ["0.25", "", "Zwiebel(n)"],
  ["0.125", "", "Knoblauchzehe(n)"],
  ["0.5", "EL", "Tomatenmark"],
  ["0.5", "Dosen", " Tomate(n)"],
  ["0.125", "L", "Milch"],
  ["5", "g", "Butter"],
  ["10", "g", "Mehl"],
  ["75", "g", "Lasagneplatten"],
  ["125", "g", "Reibekäse"],
];

function renderTable(portions) {
  if (!portions || portions < 1 || portions > 20) {
    showErrorMessage();
  } else {
    hideErrorMessage();

    document.getElementById("recipie-table").innerHTML = "";

    for (let i = 0; i < recipieIngedredients.length; i++) {
      let ingredient = recipieIngedredients[i];

      let amount = +ingredient[0] * portions;
      let unit = ingredient[1];
      let ingredientName = ingredient[2];

      document.getElementById("recipie-table").innerHTML += `
                <tr>
                    <td>${amount}</td>
                     <td>${unit}</td>
                    <td>${ingredientName}</td>
                </tr>`;
    }
  }
}

function showErrorMessage() {
  document.getElementById("input-warning-msg").classList.remove("dont-show");
  document.getElementById("input-amount").classList.add("input-warning");
}

function hideErrorMessage() {
  document.getElementById("input-warning-msg").classList.add("dont-show");
  document.getElementById("input-amount").classList.remove("input-warning");
}

function calcTable() {
  let currentAmount = document.getElementById("input-amount").value;
  renderTable(currentAmount);
}

function setup() {
  document.getElementById("input-amount").value = portionsStart;
  renderTable(portionsStart);
  document.getElementById("btn-amount").addEventListener("click", calcTable);
}

window.addEventListener("load", setup);
