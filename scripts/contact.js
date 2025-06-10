document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);

      try {
        const response = await fetch('https://delish-rc5h.onrender.com/contact.php', {
          method: 'POST',
          body: formData
        });

        const text = await response.text();
        alert('✅ Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        alert('❌ Failed to send message.');
        console.error('Error:', error);
      }
    });
  }
});
