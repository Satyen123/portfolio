document.addEventListener('DOMContentLoaded', function () {

    console.log('DOMContentLoaded fired! Script is running.');

    // === Hamburger Menu Logic ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // === Skill Bar Animation ===
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percentage');
        bar.style.width = percent;
    });

    // === Project Filtering Logic ===
    const filterButtons = document.querySelectorAll('.category-button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = (selectedCategory === 'all' || selectedCategory === cardCategory) ? 'block' : 'none';
            });
        });
    });

    // Show "All" projects by default
    const allButton = document.querySelector('.category-button[data-category="all"]');
    if (allButton) {
        allButton.click();
    }

    // === EmailJS Contact Form ===
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("z_W0LgoSSxx7_f_64"); // Replace with your public key

            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                emailjs.sendForm("service_sejvvu9", "template_cq2uvgj", this)
                    .then(() => {
                        alert("Message sent successfully!");
                        contactForm.reset();
                    })
                    .catch((error) => {
                        alert("Failed to send message. Please try again.\n" + JSON.stringify(error));
                    });
            });
        } else {
            console.error("EmailJS is not loaded.");
        }
    }

    // === Theme Toggle (Checkbox) ===
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode', this.checked);
        });
    }

    // === Theme Toggle with Icon ===
    const toggleIcon = document.getElementById("themeToggleIcon");

    // Load saved theme from localStorage (optional)
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (toggleIcon) {
            toggleIcon.classList.remove("fa-cloud-moon");
            toggleIcon.classList.add("fa-sun");
        }
    }

    if (toggleIcon) {
        toggleIcon.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");

            toggleIcon.classList.remove("fa-cloud-moon", "fa-sun");
            toggleIcon.classList.add(isDark ? "fa-sun" : "fa-cloud-moon");

            // Save preference (optional)
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

});
