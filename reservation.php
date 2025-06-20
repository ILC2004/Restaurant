<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "delish_db");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "error" => "Database connection failed."]);
  exit;
}

$table = $_POST['table'];
$date = $_POST['date'];
$time = $_POST['time'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$reservation_datetime = "$date $time";

// check for existing reservations for same table within 2 hours
$stmt = $conn->prepare("SELECT * FROM reservations WHERE table_number = ? AND date = ?");
$stmt->bind_param("ss", $table, $date);
$stmt->execute();
$result = $stmt->get_result();

$requested_time = strtotime($reservation_datetime);
$can_book = true;

while ($row = $result->fetch_assoc()) {
  $existing_time = strtotime($row['date'] . ' ' . $row['time']);
  $diff = abs($requested_time - $existing_time);
  if ($diff < 2 * 3600) { // less than 2 hours
    $can_book = false;
    break;
  }
}

if (!$can_book) {
  echo json_encode(["success" => false, "error" => "This table is already booked within 2 hours of your selected time."]);
  exit;
}

// insert reservation
$stmt = $conn->prepare("INSERT INTO reservations (table_number, date, time, name, email, phone) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $table, $date, $time, $name, $email, $phone);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => "Insert failed."]);
}

$conn->close();
?>
