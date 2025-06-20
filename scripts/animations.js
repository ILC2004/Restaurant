// animations.js - animations and dynamic interactions

// wait for the DOM to load, this ensures the code only runs after the entire HTML has loaded
document.addEventListener('DOMContentLoaded', function () {
    // fade-in animation for sections
    const sections = document.querySelectorAll('.fade-in');
  
    const fadeInObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // stop observing once the element is visible
          }
        });
      },
      {
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );
  
    sections.forEach(section => {
      fadeInObserver.observe(section);
    });
  
    // hover animations for dish cards
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
  
    // hover animations for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
      });
  
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
  
    // hover animations for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-10px)';
        member.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
      });
  
      member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0)';
        member.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
  
    // scroll-to-top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopButton);
  
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
    });
  
    // style for scroll-to-top button
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
  });