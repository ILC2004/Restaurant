<?php
file_put_contents("reservations.txt", "Reservations\n(\n", FILE_APPEND);
foreach ($_POST as $key => $value) {
    file_put_contents("reservations.txt", "    [$key] => $value\n", FILE_APPEND);
}
file_put_contents("reservations.txt", ")\n\n", FILE_APPEND);


$host = "localhost";
$user = "root";
$password = "";
$dbname = "delish_db";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  die(json_encode(["success" => false, "error" => "DB error"]));
}

$table = $_POST['table'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

if (!$table || !$date || !$time || !$name || !$email || !$phone) {
  die(json_encode(["success" => false, "error" => "Missing fields"]));
}

$table = $conn->real_escape_string($table);
$date = $conn->real_escape_string($date);
$time = $conn->real_escape_string($time);
$name = $conn->real_escape_string($name);
$email = $conn->real_escape_string($email);
$phone = $conn->real_escape_string($phone);

$sql = "INSERT INTO reservations (table_number, date, time, name, email, phone)
        VALUES ('$table', '$date', '$time', '$name', '$email', '$phone')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $conn->error]);
}
?>
