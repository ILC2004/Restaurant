// menu.js - interactive menu filtering

// wait for the DOM to load - Document Object Model – the structure of your HTML - so your JavaScript doesn’t crash trying to access elements that don’t exist yet
document.addEventListener('DOMContentLoaded', function () {
    // get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
  
    // get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
  
    // add click event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // remove the 'active' class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
  
        // add the 'active' class to the clicked button
        this.classList.add('active');
  
        // get the selected category from the button's data attribute
        const category = this.getAttribute('data-category');
  
        // filter and display menu items based on the selected category
        filterMenuItems(category);
      });
    });
  
    // function to filter menu items
    function filterMenuItems(category) {
      menuItems.forEach(item => {
        // get the category of the current menu item
        const itemCategory = item.getAttribute('data-category');
  
        // show or hide the menu item based on the selected category
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block'; // show the item
        } else {
          item.style.display = 'none'; // hide the item
        }
      });
    }
  
    // initialize the menu to show all items by default
    filterMenuItems('all');
  });