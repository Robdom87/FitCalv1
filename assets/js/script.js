document.write('Hello!');


$(function(){
    $(".exercise").hide();
});

$("#exerBtn").click(function() {
    // console.log("exercise"); // or alert($(this).attr('id'));
    $('.nutrition').hide();
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


