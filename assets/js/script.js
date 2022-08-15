let amount = '';
let unit = "";
let food = "";
let amountInput = $('#amountInput');
let unitInput = $('#unitInput');
let itemInput = $('#itemInput');

$('#submitBtn').on('click',function(){
    //assign user input to API queries and clean up extra spaces
    amount = parseInt(amountInput.val().trim(),10);

    if (isNaN(amount)) {
        //add modal to tell user that only numbers.
        return;
    }
    
    if (amount < 0) {
        //add modal to tell user that only positive whole numbers.
        return;
    }
    
    //round as only whole numbers are taken
    amount = Math.round(amount).toString();
    console.log(amount);

    unit = unitInput.val();
    console.log(unit);
    
    food = itemInput.val();

    // if (false) { //add criteria to check if all string is text
    //     //add modal to tell user that food item contains special characters
    //     return;
    // }

    // food = fd.trim(fd).toLowerCase();
    // food.split("");

    // //remove any spaces within the item and replace with %20
    // for (let i = 0; i < food.length; i++) {
    //     if (food[i]=" ") {
    //         food[i]="%20";
    //     }
    //   }
    // food = food.toString();
    //call API with user input
    console.log(food);

    let requestUrl = 'https://api.api-ninjas.com/v1/nutrition?query='+amount+'%20'+unit+'%20'+food;
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
})
       





        
