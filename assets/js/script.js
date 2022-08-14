document.write('Hello!');

//exercise button functionality (need button name to call function)
// var exerciseBtn = document.getElementById('excerBtn')

// exerciseBtn.addEventListener('click',function() {
//     var input = document.createElement("input");
//     input.type = "search";
//     input.id = "searchBar";

//     var searchBtn = document.createElement("button");
//     btn.innerHTML = "Submit";
//     btn.type = "submit";
//     btn.name = "searchBtn";
//     document.body.appendChild(input);
// });
$(function(){
    $(".exercise").hide();
});

$("#exerBtn").click(function() {
    console.log("exercise"); // or alert($(this).attr('id'));
    $('.nutrition').hide();

    $('.exercise').show();


});


// searchBtn.addEventListener('click', function() {
//     var exerciseType = document.getElementById('searchBar').value;
//     if (exerciseType = "") {

//         $.ajax({
//             method: 'GET',
//             url: 'https://api.api-ninjas.com/v1/exercises?name=' + exerciseType,
//             headers: { 'X-Api-Key': 'GKg0l9hlc0fRJEHUdIsVzw==lti9bU3OVAYwF8Wk'},
//             contentType: 'application/json',
//             success: function(result) {
//                 console.log(result);
//             },
//             error: function ajaxError(jqXHR) {
//                 console.error('Error: ', jqXHR.responseText);
//             }
//         });

//     }  
// });

