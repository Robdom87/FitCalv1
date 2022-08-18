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

$("#exerciseSearch").click(function() {
    $('.modal').show();
});

$('.delete').click(function(){
    $(".modal").hide();
});

$('.cancelButton').click(function(){
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


let amount = '';
let unit = "";
let food = "";
let amountInput = $('#amountInput');
let unitInput = $('#unitInput');
let itemInput = $('#itemInput');
let table= $('table');

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
        fetch(itemUrl, {
            headers: {
                'X-Api-Key': 'GKg0l9hlc0fRJEHUdIsVzw==lti9bU3OVAYwF8Wk'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                printNutrition(data);
            });
            return;
    }

    // call API with user input
    let requestUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + amount + '%20' + unit + '%20' + food;
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
            printNutrition(data);
          
        });
})

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

$("#foodValues").on('click', '.removeBtn', function(){
    $(this).closest('tr').remove();
})







