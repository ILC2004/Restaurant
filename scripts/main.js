// main.js - general functionality for the website

// main.js - smooth scrolling
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // check if the link is an internal page link
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault(); // prevent default behavior only for anchor links
      const targetSection = document.querySelector(href);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // enhances anchor links by adding smooth scrolling instead of an instant jump
      }
    }
    // allow default behavior for other links (e.g., about.html, menu.html)
  });
});
  
  // form validation for reservation form
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent form submission
  
      // get form inputs
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value.trim();
      const time = document.getElementById('time').value.trim();
      const guests = document.getElementById('guests').value.trim();
  
      // simple validation
      if (!name || !email || !phone || !date || !time || !guests) {
        alert('Please fill out all fields.');
        return;
      }
  
      // validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // validate phone number format (basic check)
      const phoneRegex = /^\d{10,}$/; // at least 10 digits
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
      }
  
      // if all validations pass, submit the form (simulate submission)
      alert('Reservation successful! We look forward to seeing you.');
      reservationForm.reset(); // clear the form
    });
  }
  
  // form validation for contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent form submission
  
      // get form inputs
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
  
      // simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }
  
      // validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // if all validations pass, submit the form (simulate submission)
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset(); // clear the form
    });
  }
  
  // toggle active class for menu filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // add active class to the clicked button
        this.classList.add('active');
  
        // filter menu items based on category
        const category = this.getAttribute('data-category');
        filterMenuItems(category);
      });
    });
  }
  
  // function to filter menu items
  function filterMenuItems(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block'; // show the item
      } else {
        item.style.display = 'none'; // hide the item
      }
    });
  }
  
  // initialize the menu filter to show all items by default
  if (filterButtons.length > 0) {
    filterMenuItems('all');
  }
  
  // scroll to top button
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.innerHTML = '↑';
  scrollToTopButton.classList.add('scroll-to-top');
  document.body.appendChild(scrollToTopButton);
  
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  
  // style for scroll to top button
  const scrollToTopStyle = document.createElement('style');
  scrollToTopStyle.innerHTML = `
    .scroll-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #ff6f61;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      display: none;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
    .scroll-to-top:hover {
      background-color: #e65a50;
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(scrollToTopStyle);

// makes the hamburger menu functional for mobile users
  document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-btn img');
  
    hamburgerMenu.addEventListener('click', function () {
      navLinks.classList.add('active'); // open navbar
    });
  
    closeBtn.addEventListener('click', function () {
      navLinks.classList.remove('active'); // close navbar
    });
  
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active'); // close navbar
      });
    });
  });