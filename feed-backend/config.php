<?php

# upload dir 
define('UPLOAD_DIR', 'uploads/');


# databse connection details
$servername = "localhost";
$username = "root";
$password = "";
$database = "feed";

# Create connection
$conn = new mysqli($servername, $username, $password, $database);

# Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>