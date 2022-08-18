// Current Date
$(document).ready(function(){
    let currentDay = moment().format("MMMM, DD, YYYY");
    let displayDate = document.getElementById("date");
    displayDate.innerHTML = currentDay;
});

// BMI Calculator
$(function(){
    $("#bmi").hide();
});

$("#bmiBtn").click(function() {
    $('.nutrition').hide();
    $('.exercise').hide();
    $('#bmi').show();
});

function calculateBmi() {
    let weight = document.getElementById("weight").value
    let height = document.getElementById("height").value
    let bmi = (weight / (height * height) * 703)
    
    document.getElementById("heading").innerHTML = "Your BMI is:&nbsp";
    document.getElementById("bmi-output").innerHTML = bmi.toFixed(1)
    console.log(bmi);

    if (bmi <= 18.4) {
        document.getElementById("message").innerHTML = "&nbsp&nbsp&nbsp You are underweight"
    } else if (bmi <= 25 && bmi >= 18.4) {
        document.getElementById("message").innerHTML = "&nbsp&nbsp&nbsp You have a healthy weight"
    } else {
        document.getElementById("message").innerHTML = "&nbsp&nbsp&nbsp You are overweight"
    }
}


$(function(){
    $(".exercise").hide();
});




$("#exerBtn").click(function() {
    // console.log("exercise"); // or alert($(this).attr('id'));
    $('.nutrition').hide();
    $("#bmi").hide();
    $('.exercise').show();
});


$("#nutriBtn").click(function() {
    $('.exercise').hide();
    $("#bmi").hide();
    $('.nutrition').show();
});

$("#exerciseSearch").submit(function(event) {
    event.preventDefault();

    var isError = false;
    $('.modal').show();
    var intensityInput= document.getElementsByName("intensity");
    for(var i=0; i < intensityInput.length; i++) {
        if(intensityInput[i].checked){
            var intensityValue = intensityInput[i].value
        } else{
            isError = true;
            $('.modal-card-title').text("ERROR")
            $('.modal-card-body').text("Need to select one of each category")
            $('.is-success, .cancel-button').hide();
            
        }
    }
    var typeInput= document.getElementsByName("type");
    for(var i=0; i < typeInput.length; i++) {
        if(typeInput[i].checked){
            var typeValue = typeInput[i].value
        } else{
            $('.modal-card-title').text("ERROR")
            $('.modal-card-body').text("Need to select one of each category")
            $('.is-success, .cancel-button').hide();
            
        }
    }
    var muscleInput= document.getElementsByName("muscle");
    for(var i=0; i < muscleInput.length; i++) {
        if(muscleInput[i].checked){
            var muscleValue = muscleInput[i].value
        } else{
            $('.modal-card-title').text("ERROR")
            $('.modal-card-body').text("Need to select one of each category")
            $('.is-success, .cancel-button').hide();
            
        }
    }
    let requestUrl = 'https://api.api-ninjas.com/v1/exercises?muscle='+muscleValue+ '&difficulty='+intensityValue + '&type='+typeValue
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
            $('.modal-card-body').text("")
            for(var i=0; i < data.length; i++) {
                var name = data[i].name
                var equipment = data[i].equipment
                var instructions = data[i].instructions
                var results = $('<input type="radio" name="result" />');
                var labelResults = $('<label for="result"/><br>').text(name)
                $('.modal-card-body').append(results).append(labelResults)

            }
            $('.modal-card-title').text("Exercise Selection")
            $('.is-success, .cancel-button').show();
            $(".ok-button").hide();

        });
    
    


});

$('.delete, .cancel-button, .ok-button').click(function(){
    $(".modal").hide();
});



let amount = '';
let unit = "";
let food = "";
let amountInput = $('#amountInput');
let unitInput = $('#unitInput');
let itemInput = $('#itemInput');
let table= $('table');

// nutrition page functionality

//display information if any exists in local storage
if (localStorage.getItem('nutritionRow') !== null) {
    printSavedNutrition();
}

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

function printNutrition(data) {
    let newRow = $('<tr>');

    let itemInfo = $('<td>');
    itemInfo.text(data[0].name).addClass('nameInfo');
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
        itemInfo.text(savedNArray[base]).addClass('nameInfo');
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


$("#foodValues").on('click', '.removeBtn', function(){
    let removedName = $(this).parent().siblings('.nameInfo').text();
    let removedCal = $(this).parent().siblings('.calInfo').text();
    $(this).closest('tr').remove();
    let oldSaved = JSON.parse(localStorage.getItem('nutritionRow'));
    for ( let i = 0; i < oldSaved.length; i++) {
        if(oldSaved[i] === removedName && oldSaved[i+1] == removedCal) {
            oldSaved.splice(i,7);
            console.log(oldSaved);
            localStorage.setItem('nutritionRow', JSON.stringify(oldSaved));
            return;      
        }
    }
})







