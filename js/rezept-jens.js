//Set standard value for protion size
let portionsStart = 4;


//declare recipie variables
let recipieIngedredients;
let recipieText;

//Initialize recipie variables according to recipieId

    recipieIngedredients = [
        ['0.5', 'EL', 'Olivenöl'],
        ['125', 'g', 'Hackfleisch, gemischtes'],
        ['0.25', '', 'Zwiebel(n)'],
        ['0.125', '', 'Knoblauchzehe(n)'],
        ['0.5', 'EL', 'Tomatenmark'],
        ['0.5', 'Dosen', ' Tomate(n)'],
        ['0.125', 'L', 'Milch'],
        ['5', 'g', 'Butter'],
        ['10', 'g', 'Mehl'],
        ['75', 'g', 'Lasagneplatten'],
        ['125', 'g','Reibekäse'],
    ];

function renderTable(portions) {

    //Check for correct input field value 
    if (!portions || portions < 1 || portions > 20) {
        //Display error message
        showErrorMessage();
    } else {
        //Hide error message, if visible
        hideErrorMessage();
        // clear current table
        document.getElementById('recipie-table').innerHTML = '';
        //render new table
        for (let i = 0; i < recipieIngedredients.length; i++) {
            let ingredient = recipieIngedredients[i];

            let amount = +ingredient[0] * portions;
            let unit = ingredient[1];
            let ingredientName = ingredient[2];

            document.getElementById('recipie-table').innerHTML += `
                <tr>
                    <td>${amount}</td>
                     <td>${unit}</td>
                    <td>${ingredientName}</td>
                </tr>`;
        }
    }
};

function showErrorMessage(){
    document.getElementById('input-warning-msg').classList.remove('dont-show');
    document.getElementById('input-amount').classList.add("input-warning");
}

function hideErrorMessage(){
    document.getElementById('input-warning-msg').classList.add("dont-show");
    document.getElementById('input-amount').classList.remove("input-warning");
}

function calcTable() {
    //Get current portions amount from input field and render table anew
    let currentAmount = document.getElementById('input-amount').value;
    renderTable(currentAmount);
}

function setup() {
    //Set displayed value in input field to defined standard value
    document.getElementById('input-amount').value = portionsStart;
    //Render recipie table for the first time
    renderTable(portionsStart);
    //Add event listener to button
    document.getElementById('btn-amount').addEventListener("click", calcTable);

};

//As soon as page is loaded, initialise the setup function
window.addEventListener("load", setup);