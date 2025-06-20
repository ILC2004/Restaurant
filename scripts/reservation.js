document.addEventListener('DOMContentLoaded', function () {
  console.log("✅ reservation.js loaded");

  const tables = document.querySelectorAll('.table[data-available="true"]');
  const tableInput = document.getElementById('table');
  const reservationForm = document.getElementById('reservation-form');

 // table selection
tables.forEach(table => {
  table.addEventListener('click', function () {
    // remove "selected" class from all
    tables.forEach(t => t.classList.remove('selected'));

    // sdd to clicked one
    this.classList.add('selected');

    const tableNumber = this.getAttribute('data-table');
    tableInput.value = tableNumber;
    console.log("🪑 Selected table:", tableNumber);
  });
});


  // form submission
  reservationForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("📨 Form submission started");

    const table = tableInput.value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!table || !date || !time || !name || !email || !phone) {
      alert("⚠️ Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("⚠️ Invalid email address.");
      return;
    }

    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      alert("⚠️ Invalid phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("table", table);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    try {
      const response = await fetch("reservation.php", {
        method: "POST",
        body: formData
        
      });

      const result = await response.json();
      console.log("📥 Server response:", result);

      if (result.success) {
        alert(`✅ Booking confirmed for Table ${table} on ${date} at ${time}.`);
        reservationForm.reset();
      } else {
        alert("❌ This table is already booked within 2 hours of your selected time. Please choose a different table or time..");
        console.error("Server error:", result.error);
      }
    } catch (err) {
      alert("❌ Could not connect to the server.");
      console.error("Network error:", err);
    }
  });
});
