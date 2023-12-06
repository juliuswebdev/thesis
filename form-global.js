const userData = JSON.parse(localStorage.getItem('userDetails'));
var userId = userData.id;


$('.clear').click(function(){
    $('.form').trigger("reset");
});


const form_FieldRequired_ids = [
    ['fullname','completeAdd'],
    //['lupa','bahay']
];


const requireFields = form_FieldRequired_ids[$('#requiredForm').val()];

$('.form').submit(function(e) {
    $.each(requireFields, function(key,field) {
        if($('#'+field).val() === '') {
            e.preventDefault();
            $('#'+field).addClass('error');
        }
    });
});