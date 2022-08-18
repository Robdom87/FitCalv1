$(function(){
    $(".exercise").hide();
});

$("#exerBtn").click(function() {
    // console.log("exercise"); // or alert($(this).attr('id'));
    $('.nutrition').hide();
    $('.exercise').show();
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
