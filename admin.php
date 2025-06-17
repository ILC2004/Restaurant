<?php
session_start();
$mysqli = new mysqli("localhost", "root", "", "delish_db");

// Hardcoded credentials
$valid_username = 'admin';
$valid_password = 'admin123';

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
  if ($_POST['username'] === $valid_username && $_POST['password'] === $valid_password) {
    $_SESSION['admin_logged_in'] = true;
  } else {
    $_SESSION['error'] = "Incorrect username or password.";
  }
  header("Location: admin.php");
  exit();
}

// Handle logout
if (isset($_GET['logout'])) {
  session_destroy();
  header("Location: admin.php");
  exit();
}

// Handle save (add or update)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save']) && $_SESSION['admin_logged_in']) {
  $id = $_POST['id'];
  $table = $_POST['table_number'];
  $date = $_POST['date'];
  $time = $_POST['time'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];

  if ($id) {
    $stmt = $mysqli->prepare("UPDATE reservations SET table_number=?, date=?, time=?, name=?, email=?, phone=? WHERE id=?");
    $stmt->bind_param("isssssi", $table, $date, $time, $name, $email, $phone, $id);
    $stmt->execute();
  } else {
    $stmt = $mysqli->prepare("INSERT INTO reservations (table_number, date, time, name, email, phone, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("isssss", $table, $date, $time, $name, $email, $phone);
    $stmt->execute();
  }

  header("Location: admin.php");
  exit();
}

// Handle delete
if (isset($_GET['delete']) && $_SESSION['admin_logged_in']) {
  $id = intval($_GET['delete']);
  $mysqli->query("DELETE FROM reservations WHERE id = $id");
  header("Location: admin.php");
  exit();
}

// Get data
$reservations = $mysqli->query("SELECT * FROM reservations ORDER BY created_at DESC");
$messages = $mysqli->query("SELECT * FROM contacts ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Panel - Delish</title>
  <link rel="stylesheet" href="styles/style.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ccc;
    }
    th {
      background: #f4f4f4;
    }
    .btn {
      background-color: #ff6f61;
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .btn:hover {
      background-color: #e65a50;
    }
    .logout {
      float: right;
    }
    .form-section {
      margin-top: 40px;
    }
    .form-section input {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px 0;
    }
    tr.selected {
      background-color: #fdd;
    }
  </style>
</head>
<body>

<?php if (!isset($_SESSION['admin_logged_in'])): ?>
  <h2>Admin Login</h2>
  <?php if (isset($_SESSION['error'])): ?>
    <p style="color:red;"><?= $_SESSION['error']; unset($_SESSION['error']); ?></p>
  <?php endif; ?>
  <form method="POST" action="admin.php">
    <input type="hidden" name="login" value="1" />
    <label>Username:</label><br>
    <input type="text" name="username" required><br><br>
    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>
    <button type="submit" class="btn">Login</button>
  </form>

<?php else: ?>

  <h2>
    Admin Panel - All Reservations
    <a href="?logout=1" class="btn logout">Logout</a>
  </h2>

  <table>
    <thead>
      <tr>
        <th>Select</th>
        <th>ID</th>
        <th>Table Number</th>
        <th>Date</th>
        <th>Time</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody id="resTableBody">
      <?php while ($row = $reservations->fetch_assoc()): ?>
        <tr data-id="<?= $row['id'] ?>"
            data-table="<?= $row['table_number'] ?>"
            data-date="<?= $row['date'] ?>"
            data-time="<?= $row['time'] ?>"
            data-name="<?= htmlspecialchars($row['name']) ?>"
            data-email="<?= htmlspecialchars($row['email']) ?>"
            data-phone="<?= htmlspecialchars($row['phone']) ?>">
          <td><input type="radio" name="select" onclick="selectRow(this)" /></td>
          <td><?= $row['id'] ?></td>
          <td><?= htmlspecialchars($row['table_number']) ?></td>
          <td><?= $row['date'] ?></td>
          <td><?= $row['time'] ?></td>
          <td><?= htmlspecialchars($row['name']) ?></td>
          <td><?= htmlspecialchars($row['email']) ?></td>
          <td><?= htmlspecialchars($row['phone']) ?></td>
          <td><?= $row['created_at'] ?></td>
        </tr>
      <?php endwhile; ?>
    </tbody>
  </table>

  <!-- Contact Messages Section -->
  <h2>Contact Messages</h2>
  <?php if ($messages && $messages->num_rows > 0): ?>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <?php while ($msg = $messages->fetch_assoc()): ?>
          <tr>
            <td><?= $msg['id'] ?></td>
            <td><?= htmlspecialchars($msg['name']) ?></td>
            <td><?= htmlspecialchars($msg['email']) ?></td>
            <td><?= htmlspecialchars($msg['subject']) ?></td>
            <td><?= nl2br(htmlspecialchars($msg['message'])) ?></td>
            <td><?= $msg['created_at'] ?></td>
          </tr>
        <?php endwhile; ?>
      </tbody>
    </table>
  <?php else: ?>
    <p>No contact messages found.</p>
  <?php endif; ?>

  <!-- Action Buttons -->
  <br>
  <button onclick="resetForm()" class="btn">Add New</button>
  <button onclick="loadSelected()" class="btn">Edit Selected</button>
  <button onclick="deleteSelected()" class="btn">Delete Selected</button>

  <!-- Reservation Form (Initially Hidden) -->
  <div class="form-section" id="reservationForm" style="display: none;">
    <h3 id="formTitle">Add / Edit Reservation</h3>
    <form method="POST" action="admin.php">
      <input type="hidden" name="save" value="1" />
      <input type="hidden" name="id" id="id" />
      <label>Table Number</label>
      <input type="number" name="table_number" id="table_number" required />
      <label>Date</label>
      <input type="date" name="date" id="date" required />
      <label>Time</label>
      <input type="time" name="time" id="time" required />
      <label>Full Name</label>
      <input type="text" name="name" id="name" required />
      <label>Email</label>
      <input type="email" name="email" id="email" required />
      <label>Phone</label>
      <input type="tel" name="phone" id="phone" required />
      <button type="submit" class="btn">Save Reservation</button>
    </form>
  </div>

  <!-- Scripts -->
  <script>
    let selectedRow = null;

    function selectRow(input) {
      document.querySelectorAll("tbody tr").forEach(tr => tr.classList.remove("selected"));
      selectedRow = input.closest("tr");
      selectedRow.classList.add("selected");
    }

    function loadSelected() {
      if (!selectedRow) return alert("Select a reservation to edit.");
      document.getElementById("formTitle").textContent = "Edit Reservation";
      document.getElementById("id").value = selectedRow.dataset.id;
      document.getElementById("table_number").value = selectedRow.dataset.table;
      document.getElementById("date").value = selectedRow.dataset.date;
      document.getElementById("time").value = selectedRow.dataset.time;
      document.getElementById("name").value = selectedRow.dataset.name;
      document.getElementById("email").value = selectedRow.dataset.email;
      document.getElementById("phone").value = selectedRow.dataset.phone;
      document.getElementById("reservationForm").style.display = "block";
    }

    function resetForm() {
      selectedRow = null;
      document.getElementById("formTitle").textContent = "Add New Reservation";
      document.getElementById("id").value = '';
      document.querySelectorAll(".form-section input").forEach(input => input.value = '');
      document.getElementById("reservationForm").style.display = "block";
    }

    function deleteSelected() {
      if (!selectedRow) return alert("Select a reservation to delete.");
      const id = selectedRow.dataset.id;
      if (confirm("Are you sure you want to delete this reservation?")) {
        window.location.href = "admin.php?delete=" + id;
      }
    }
  </script>

<?php endif; ?>
</body>
</html>
