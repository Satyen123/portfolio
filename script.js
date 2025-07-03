document.addEventListener('DOMContentLoaded', function() {

    console.log('DOMContentLoaded fired! Script is running.'); // Debugging: Confirm script execution

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger'); // Select by class
    const navLinks = document.querySelector('.nav-links');   // Select by class
    const body = document.body; // Reference to the body element

    console.log('Hamburger element found:', hamburger); // Debugging: Check if element is found
    console.log('Nav Links element found:', navLinks);   // Debugging: Check if element is found

    // Only proceed if hamburger and navLinks are found
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('menu-open'); // Toggle overflow hidden on body
            console.log('Menu toggled. Nav Links active:', navLinks.classList.contains('active')); // Debugging: Confirm class toggle
        });

        // Close menu when a link inside it is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                console.log('Menu link clicked. Menu closed.'); // Debugging: Confirm menu closure
            });
        });
    }

    // --- Skill bar animation ---
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percentage');
        bar.style.width = percent;
    });

    // --- Project Filtering Logic ---
    const filterButtons = document.querySelectorAll('.category-button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' to clicked button
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block'; // show
                } else {
                    card.style.display = 'none';  // hide
                }
            });
        });
    });

    // --- Ensure "All" project category is selected on page load ---
    const allButton = document.querySelector('.category-button[data-category="all"]');
    if (allButton) {
        allButton.click(); // Simulate a click to show all projects initially
    }
});
