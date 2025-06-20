// contact.js - handle and validate the Contact Us form

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Get values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validate fields
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

      // send to backend
      try {
        const response = await fetch('http://localhost/delish/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (result.success) {
          alert('✅ Message sent successfully!');
          contactForm.reset();
        } else {
          alert('❌ Failed to send message. Please try again.');
          console.error(result.error); // optional: view error in console
        }
      } catch (error) {
        alert('❌ Something went wrong. Check your internet or server.');
        console.error('Error:', error);
      }
    });
  }
});
