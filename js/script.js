$(document).ready(function(){
    $(".generate-btn").css("display", 'none');
    let resultLength = '';
    function listPatients(){
        console.log("I'm in!");
        $.ajax({
            method: 'GET',
            url: 'http://localhost/serialNumberGenerator/get_records.php',
        }).done(function(data){
            result = $.parseJSON(data);
             resultLength = result.length;
            let patient = '';
            for (let i = 0; i < result.length; i++) {
                patient += '<tr><td>' + (i + 1) + '</td> <td> ' + result[i].first_name + ' </td> <td> ' + result[i].last_name + ' </td> <td> ' + (result[i].serial_num ? result[i].serial_num : 'Not generated!'); + ' </td> </tr>';

            }
            $("#table-data").html(patient).hide().fadeIn("slow");
            $(".generate-btn").css("display", 'inline');
            
        });
    }

    // Function to generate the serial number
    function generateSerialNumber(resultLength){
        console.log(resultLength);
        for (let i = 0; i < resultLength; i++) {
            
            //generate a random ID with a mixture of letters and strings  and make sure there length is 10
            unique_id = Math.random().toString(36).replace('0.', '').toUpperCase().substr(0, 10);

            $.ajax({
                method: 'POST',
                url: 'http://localhost/serialNumberGenerator/save_serial_number.php',
                data: { 'unique_id': unique_id },
            }).done(function (data) {
                console.log('IDs generated successfully');

            });

        }
        $("#table-data").html('').fadeOut();
        listPatients();   
    }


    // Click on this button to list the patients in the database
    $(".list-btn").on('click', function(){
        // Checking whether the names have been listed before to avoid listing names multiple times
        if( $("#table-data").is(':empty') ){
            listPatients();
        }else{
            $(".list-btn").html('already listed');
            return false;
        }
        
    });
    

    //click on this button to generate for all
    $(".generate-btn").on('click', function(){
           generateSerialNumber(resultLength);
    });

    $("generate-single").on('click', function() {
        generateSingleSerialNumber();        
    });

    
});