// global variables
// used in nutrition page
let amount = '';
let unit = "";
let food = "";
let amountInput = $('#amountInput');
let unitInput = $('#unitInput');
let itemInput = $('#itemInput');
let table = $('table');

// excercise button functionality
$(function () {
    $(".exercise").hide();
});

$("#exerBtn").click(function () {
    // console.log("exercise"); // or alert($(this).attr('id'));
    $('.nutrition').hide();
    $('.exercise').show();
});

$("#exerciseSearch").click(function () {
    $('.modal').show();
});

$('.delete').click(function () {
    $(".modal").hide();
});

$('.cancelButton').click(function () {
    $(".modal").hide();
});

let requestUrl = 'https://api.api-ninjas.com/v1/exercises?muscle&difficulty='
fetch(requestUrl, {
    headers: {
        'X-Api-Key': 'GKg0l9hlc0fRJEHUdIsVzw==lti9bU3OVAYwF8Wk'
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// nutrition page functionality

//display information if any exists in local storage
if (localStorage.getItem('nutritionRow') !== null) {
    printSavedNutrition();
}

//functionality for button to take input from the user and send out fetch request
$('#submitBtn').on('click', function () {
    //assign user input to API queries and clean up extra spaces
    amount = parseInt(amountInput.val().trim(), 10);

    //exit request if amount is negative
    if (amount < 0) {
        return;
    }

    //round as only whole numbers are taken
    amount = Math.round(amount).toString();

    food = itemInput.val();
    food.trim().toLowerCase();
    food.split("");

    //remove any spaces within the item and replace with %20
    for (let i = 0; i < food.length; i++) {
        if (food[i] = " ") {
            food[i] = "%20";
        }
    }
    food.toString();

    unit = unitInput.val();

    //if unit input is used, use fetch request with only food item name
    if (unit === "item") {
        let itemUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + food;
        getData(itemUrl);
        return;
    }

    // call API with user input
    let requestNutriUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + amount + '%20' + unit + '%20' + food;
    getData(requestNutriUrl);
})

//function to print nutrition data onto the page once information is inputted by the user
function printNutrition(data) {
    let newRow = $('<tr>');

    let itemInfo = $('<td>');
    itemInfo.text(data[0].name);
    newRow.append(itemInfo);

    let calInfo = $('<td>');
    calInfo.text(data[0].calories).addClass('calInfo');
    newRow.append(calInfo);

    let protInfo = $('<td>');
    protInfo.text(data[0].protein_g).addClass('protInfo');
    newRow.append(protInfo);

    let carInfo = $('<td>');
    carInfo.text(data[0].carbohydrates_total_g).addClass('carInfo');
    newRow.append(carInfo);

    let fatInfo = $('<td>');
    fatInfo.text(data[0].fat_total_g).addClass('fatInfo');
    newRow.append(fatInfo);

    let sodInfo = $('<td>');
    sodInfo.text(data[0].sodium_mg).addClass('sodInfo is-hidden-mobile');
    newRow.append(sodInfo);

    let cholInfo = $('<td>');
    cholInfo.text(data[0].cholesterol_mg).addClass('cholInfo is-hidden-mobile');
    newRow.append(cholInfo);

    let remove = $('<td>');
    let removeBtn = $('<button>')
    removeBtn.addClass('removeBtn').text('X');
    remove.append(removeBtn);
    newRow.append(remove);

    table.append(newRow);
}

function addToArray(data) {
    let newSaved = [];

    if (localStorage.getItem('nutritionRow') !== null) {
        newSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    }
    
    newSaved.push(data[0].name);
    newSaved.push(data[0].calories);
    newSaved.push(data[0].protein_g);
    newSaved.push(data[0].carbohydrates_total_g);
    newSaved.push(data[0].fat_total_g);
    newSaved.push(data[0].sodium_mg);
    newSaved.push(data[0].cholesterol_mg);
    
    rowSaved(newSaved);
}

//function to fetch API info
async function getData(url) {
    let response = await fetch(url, {
        headers: {
            'X-Api-Key': 'GKg0l9hlc0fRJEHUdIsVzw==lti9bU3OVAYwF8Wk'
        }
    });
    let data = await response.json();
    printNutrition(data);
    addToArray(data);
}

//save row into local storage
function rowSaved(newSaved) {
    localStorage.setItem('nutritionRow', JSON.stringify(newSaved));
}

//function to print all food info already saved in local storage
function printSavedNutrition() {
    let savedNArray = JSON.parse(localStorage.getItem('nutritionRow'));
    for (let i = 0; i < (savedNArray.length / 7); i++) {
        let base = 7;
        base = base * i;

        let newRow = $('<tr>');

        let itemInfo = $('<td>');
        itemInfo.text(savedNArray[base]);
        newRow.append(itemInfo);

        let calInfo = $('<td>');
        calInfo.text(savedNArray[base + 1]).addClass('calInfo');
        newRow.append(calInfo);

        let protInfo = $('<td>');
        protInfo.text(savedNArray[base + 2]).addClass('protInfo');
        newRow.append(protInfo);

        let carInfo = $('<td>');
        carInfo.text(savedNArray[base + 3]).addClass('carInfo');
        newRow.append(carInfo);

        let fatInfo = $('<td>');
        fatInfo.text(savedNArray[base + 4]).addClass('fatInfo');
        newRow.append(fatInfo);

        let sodInfo = $('<td>');
        sodInfo.text(savedNArray[base + 5]).addClass('sodInfo is-hidden-mobile');
        newRow.append(sodInfo);

        let cholInfo = $('<td>');
        cholInfo.text(savedNArray[base + 6]).addClass('cholInfo is-hidden-mobile');
        newRow.append(cholInfo);

        let remove = $('<td>');
        let removeBtn = $('<button>')
        removeBtn.addClass('removeBtn').text('X');
        remove.append(removeBtn);
        newRow.append(remove);

        table.append(newRow);
    }
}

//remove button functionality within nutrition table
$("#foodValues").on('click', '.removeBtn', function () {
    $(this).closest('tr').remove();
})







