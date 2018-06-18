<?php
// Added this line so as to allow cross origin request
 header('Access-Control-Allow-Origin: *'); 
// Database connection
$servername = "localhost";
$username = "root";
$dbname = "hospital";
$password = "";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 