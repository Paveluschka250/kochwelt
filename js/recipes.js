const portionsStart = 4;

const allRecipes = {
  "lagnase-bolognese": [
    ["0.5", "EL", "Olivenöl"],
    ["125", "g", "Hackfleisch, gemischtes"],
    ["0.25", "", "Zwiebel(n)"],
    ["0.125", "", "Knoblauchzehe(n)"],
    ["0.5", "EL", "Tomatenmark"],
    ["0.5", "Dosen", "Tomate(n)"],
    ["0.125", "L", "Milch"],
    ["5", "g", "Butter"],
    ["10", "g", "Mehl"],
    ["75", "g", "Lasagneplatten"],
    ["125", "g", "Reibekäse"],
  ],
  "spaghetti-carbonara": [
    ["100", "g", "Spaghetti"],
    ["50", "g", "Pancetta oder Guanciale (alternativ: Speck)"],
    ["1", "", "Ei(er)"],
    ["30", "g", "Parmesan oder Pecorino, frisch gerieben"],
    ["1", "", "Knoblauchzehe"],
    ["1", "EL", "Olivenöl (optional)"],
  ],
  "spaghetti-aglio-e-olio": [
    ["100", "g", "Spaghetti"],
    ["1", "Stk", "Knoblauchzehe"],
    ["0.25", "Bund", "Petersielie"],
    ["37.5", "ml", "Olivenöl"],
    ["0.25", "Prise", "Salz"],
    ["0.25", "Stk", "Pfefferoni"],
  ],
  tortellini: [
    ["0.25", "", "Zwiebel"],
    ["125", "g", "Kochschinken"],
    ["100", "g", "Tortellini"],
    ["0.5", "EL", "Olivenöl"],
    ["50", "ml", "Sahne "],
    ["25", "ml", "Milch"],
    ["37.5", "g", "Schmelzkäse"],
  ],
};

function getRecipeIdFromURL() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  return fileName.replace(".html", "");
}

const recipeId = getRecipeIdFromURL();
let recipieIngedredients = allRecipes[recipeId];

if (!recipieIngedredients) {
  console.warn(`Kein Rezept mit dem Namen '${recipeId}' gefunden.`);
  recipieIngedredients = [];
}

function renderTable(portions) {
  const tableBody = document.getElementById("recipie-table");
  if (!tableBody) return;

  if (!isValidPortion(portions)) {
    showErrorMessage();
    return;
  }

  hideErrorMessage();
  tableBody.innerHTML = "";

  recipieIngedredients.forEach(([amountRaw, unit, name]) => {
    const amount = parseFloat(amountRaw) * portions;
    tableBody.innerHTML += `
      <tr>
        <td>${formatAmount(amount)}</td>
        <td>${unit}</td>
        <td>${name}</td>
      </tr>`;
  });
}

function isValidPortion(value) {
  const n = parseInt(value);
  return !isNaN(n) && n >= 1 && n <= 20;
}

function formatAmount(value) {
  return Number(value.toFixed(2)).toLocaleString("de-DE");
}

function showErrorMessage() {
  document.getElementById("input-warning-msg")?.classList.remove("dont-show");
  document.getElementById("input-amount")?.classList.add("input-warning");
}

function hideErrorMessage() {
  document.getElementById("input-warning-msg")?.classList.add("dont-show");
  document.getElementById("input-amount")?.classList.remove("input-warning");
}

function calcTable() {
  const input = document.getElementById("input-amount");
  if (!input) return;
  renderTable(parseInt(input.value));
}

function setup() {
  const input = document.getElementById("input-amount");
  const button = document.getElementById("btn-amount");

  if (!input || !button) return;

  input.value = portionsStart;
  renderTable(portionsStart);
  button.addEventListener("click", calcTable);
}

window.addEventListener("load", setup);
