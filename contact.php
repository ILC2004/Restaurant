<?php
// Database connection
$host = "localhost";
$user = "root";
$password = ""; // usually empty on XAMPP
$dbname = "delish_db";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get data from JS
$data = json_decode(file_get_contents("php://input"));

$name = $conn->real_escape_string($data->name);
$email = $conn->real_escape_string($data->email);
$subject = $conn->real_escape_string($data->subject);
$message = $conn->real_escape_string($data->message);

// Insert into database
$sql = "INSERT INTO contacts (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
