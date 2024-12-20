// Load data from localStorage on page load
const playerList = JSON.parse(localStorage.getItem("players")) || [];
const listElement = document.getElementById("playerList");

const teamNamesList = JSON.parse(localStorage.getItem("teamNames")) || [];

const scoreTable = JSON.parse(localStorage.getItem("scoreTable")) || [];


// Render Teams
function tableCreate() {
    const body = document.body;
    const teamColors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#886cd5"];

    const existingTable = document.querySelector("table");
    if (existingTable) {
        existingTable.remove();
    }

    const tbl = document.createElement("table");

    for (let i = 0; i < scoreTable.length + 1; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < teamNamesList.length + 1; j++) {
            if (i === 0 && j === 0) {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`Round`));
                td.style.backgroundColor = "#CCCCCC";
            } else if (j === 0) {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(i));
                td.style.backgroundColor = "#f1f1f1";
            } else if (i === 0) {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(teamNamesList[j - 1]));
                td.style.backgroundColor = teamColors[j - 1];
            } else {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(scoreTable[i - 1][j - 1]));
            }
        }
    }
    body.appendChild(tbl);
}

// Create Response Form
function createAnswerForm() {

    const existingForm = document.querySelector("#teamResponse");
    if (existingForm) {
        existingForm.remove();
    }

    const form = document.createElement("form")
    form.id = "teamResponse"


    for (let i =0; i < teamNamesList.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = teamNamesList[i];
        input.placeholder = `${teamNamesList[i]} Response`;
        input.required = true;
        form.appendChild(input);
    }


    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Go to Google Trends!";


    // Collect Responses
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        var responses = [];
        for (let i = 0; i < teamNamesList.length; i++) {
            const response = document.getElementById(teamNamesList[i]).value;
            responses.push(response);
        }
        console.log(responses)

        var trendsURL = "https://trends.google.com/trends/explore?q="

        for (let i = 0; i < responses.length; i++) {
            trendsURL = trendsURL.concat(responses[i], ",")
        };
        
        console.log(trendsURL)
        window.open(trendsURL, "_blank")
    });

    form.appendChild(submitButton);
    document.body.appendChild(form);
}


// Create Score Form
function createScoreForm() {

    const existingForm = document.querySelector("#teamScore");
    if (existingForm) {
        existingForm.remove();
    }

    const form = document.createElement("form")
    form.id = "teamScore"


    for (let i =0; i < teamNamesList.length; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.id = `${teamNamesList[i]}-score`;
        input.placeholder = `${teamNamesList[i]} Score`;
        input.required = true;
        form.appendChild(input);
    }


    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Scores!";


    // Collect Scores
    form.addEventListener("submit", (e) => {
         e.preventDefault();
        var scores = [];
        for (let i = 0; i < teamNamesList.length; i++) {
            const score = document.getElementById(`${teamNamesList[i]}-score`).value;
            scores.push(score);
        }
        scoreTable.push(scores)
        localStorage.setItem("scoreTable", JSON.stringify(scoreTable))
        console.log(scoreTable)
        tableCreate();
        createAnswerForm();
        createScoreForm();
    });

    form.appendChild(submitButton);
    document.body.appendChild(form);
}



// Add Team
document.getElementById("teamForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("teamName").value;
    teamNamesList.push(name);
    localStorage.setItem("teamNames", JSON.stringify(teamNamesList));
    tableCreate();
    createAnswerForm();
    createScoreForm();
});


// Delete All Teams Button
document.getElementById("deleteAllTeams").addEventListener("click", () => {
    teamNamesList.length = 0;
    localStorage.setItem("teamNames", JSON.stringify(teamNamesList)); 
    scoreTable.length = 0;
    localStorage.setItem("scoreTable", JSON.stringify(teamNamesList)); 

    tableCreate();
    createAnswerForm();
    createScoreForm();
});



// Initial render
tableCreate();
createAnswerForm();
createScoreForm();
console.log();