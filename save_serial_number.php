<?php
    require 'db.php';

   //This is for posting the generated ID to the database
    $unique_id = $_POST['unique_id'];
    // $unique_id = "yTR5W47YDF";

    // Query the database for the list those in there
    $sql1 = "SELECT * FROM patients";
    $result = $conn->query($sql1);
    
    if ($result->num_rows > 0) {
        // Loop throught the list in the database
        while($row = $result->fetch_assoc()) {
            // Check if the row doesn't have serial number
            if($row["serial_num"] == false){
            // Then you can generate a serial number for the patient. 
            $sql = "UPDATE patients SET serial_num= '{$unique_id}'  WHERE id=" . $row["id"];
            if ($conn->query($sql) === TRUE) {
            echo "Record updated successfully";
                
            } else {
                echo "Error updating record: " . $conn->error;
            }
        }else{
            echo "Already generated!";
        }
    }
}

$conn->close();
