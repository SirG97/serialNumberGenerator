<?php
    require 'db.php';

    $result_array = array();
    // Query the database for the list those in there
    $sql = "SELECT * FROM patients";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        //push it into an array
        array_push($result_array, $row);

    }

}
    //encode the array into json and echo it back
    echo json_encode($result_array);

    $conn->close();
?>
