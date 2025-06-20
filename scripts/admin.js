document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("admin-form");
  const list = document.getElementById("reservation-list");
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  function saveToStorage() {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }

  function renderReservations() {
    list.innerHTML = "";
    reservations.forEach((r, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.table}</td>
        <td>${r.date}</td>
        <td>${r.time}</td>
        <td>${r.name}</td>
        <td>${r.email}</td>
        <td>${r.phone}</td>
        <td>
          <button onclick="editReservation(${index})" class="btn">Edit</button>
          <button onclick="deleteReservation(${index})" class="btn">Delete</button>
        </td>`;
      list.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("reservation-id").value;
    const newReservation = {
      table: document.getElementById("table").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    if (id) {
      reservations[+id] = newReservation;
    } else {
      reservations.push(newReservation);
    }

    saveToStorage();
    renderReservations();
    form.reset();
    document.getElementById("reservation-id").value = "";
  });

  window.editReservation = function(index) {
    const r = reservations[index];
    document.getElementById("reservation-id").value = index;
    document.getElementById("table").value = r.table;
    document.getElementById("date").value = r.date;
    document.getElementById("time").value = r.time;
    document.getElementById("name").value = r.name;
    document.getElementById("email").value = r.email;
    document.getElementById("phone").value = r.phone;
  };

  window.deleteReservation = function(index) {
    if (confirm("Are you sure you want to delete this reservation?")) {
      reservations.splice(index, 1);
      saveToStorage();
      renderReservations();
    }
  };

  renderReservations();
});
