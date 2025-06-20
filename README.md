Delish Restaurant Website

A responsive and interactive website built for a restaurant called Delish. The site includes a modern design, interactive menu, reservation system, contact form and an admin backend.

Live Demo:
[https://delish-london-rd.netlify.app/](https://delish-london-rd.netlify.app/)

Technologies Used:
HTML, CSS, JavaScript, PHP, MySQL

Main Features:

* Home page with welcoming visuals and call-to-action buttons
* About Us page describing the restaurant’s values
* Interactive Menu page with category filtering
* Reservation system (PHP-powered form connected to MySQL)
* Contact page with form and embedded Google Map
* Responsive design for desktop and mobile
* Admin Panel for managing reservations and messages

File Overview:
/index.html          – Homepage
/about.html          – Restaurant description
/menu.html           – Menu listings & filtering
/reservation.html    – Booking form UI
/reservation.php     – Reservation form handler
/contact.html        – Contact form layout
/contact.php         – Contact form handler
/admin.html          – Admin login / panel UI
/admin.php           – Admin backend logic
/delish\_db.sql       – SQL dump for database schema
/images/             – Site images
/styles/             – CSS files
/scripts/            – JavaScript files

Admin Panel Credentials:
Username: admin
Password: admin123

Usage Instructions:

1. Clone the repo into your web server folder (htdocs or www):
   git clone [https://github.com/ILC2004/Restaurant.git](https://github.com/ILC2004/Restaurant.git)

2. Import database:

   * Open phpMyAdmin
   * Create database “delish\_db”
   * Import delish\_db.sql

3. If needed, update DB credentials in reservation.php, contact.php and admin.php

4. Open in browser:
   Front-end: [http://localhost/Restaurant/index.html](http://localhost/Restaurant/index.html)
   Admin:     [http://localhost/Restaurant/admin.html](http://localhost/Restaurant/admin.html)
