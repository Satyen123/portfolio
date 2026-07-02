document.addEventListener('DOMContentLoaded', function () {


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
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // === Details Modal Logic ===
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');

    if (modal && modalBody) {
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.project-card');
                const title = card.querySelector('.project-title').textContent;
                const imageSrc = card.querySelector('.project-img').src;
                const categoryText = card.querySelector('.project-category-badge').textContent;
                const description = card.querySelector('.project-desc').textContent;
                const tagsHTML = card.querySelector('.project-tags').innerHTML;

                // Safely retrieve links to prevent throwing errors if they don't exist
                const liveLinkEl = card.querySelector('.btn-live');
                const githubLinkEl = card.querySelector('.btn-github');
                const liveLink = liveLinkEl ? liveLinkEl.href : '';
                const githubLink = githubLinkEl ? githubLinkEl.href : '';

                modalBody.innerHTML = `
                    <div class="modal-img-container">
                        <img src="${imageSrc}" alt="${title}">
                    </div>
                    <div class="modal-meta">
                        <span class="modal-category">${categoryText}</span>
                    </div>
                    <h3 class="modal-title">${title}</h3>
                    <p class="modal-desc">${description}</p>
                    <div>
                        <h4 class="modal-tech-title">Technologies Used</h4>
                        <div class="modal-tags">${tagsHTML}</div>
                    </div>
                    <div class="modal-actions">
                        ${liveLink ? `
                        <a href="${liveLink}" target="_blank" rel="noopener noreferrer" class="project-btn btn-live" style="flex: 1;">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                        ${githubLinkEl ? (githubLinkEl.classList.contains('disabled-btn') ? `
                        <button class="project-btn btn-github disabled-btn" title="Repository will be available soon" disabled style="flex: 1;">
                            <i class="fab fa-github"></i> GitHub (Coming Soon)
                        </button>` : `
                        <a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="project-btn btn-github" style="flex: 1;">
                            <i class="fab fa-github"></i> GitHub Repository
                        </a>`) : ''}
                    </div>
                `;

                modal.style.display = 'flex';
                modal.offsetHeight; // Force reflow
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                modal.setAttribute('aria-hidden', 'false');
            });
        });
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable background scrolling

        // Wait for transition to finish before hiding display
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = 'none';
            }
        }, 300);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // === EmailJS Contact Form ===
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    let isSubmitting = false;
    let lastSubmitTime = 0;

    if (contactForm && formMessage) {
        if (typeof emailjs !== 'undefined') {
            // Initialize EmailJS with Public Key
            emailjs.init("z_W0LgoSSxx7_f_64");

            contactForm.addEventListener("submit", function (e) {
                e.preventDefault();

                // Prevent multiple concurrent submissions
                if (isSubmitting) return;

                // Spam protection: 15-second cooldown between submissions
                const now = Date.now();
                if (now - lastSubmitTime < 15000) {
                    showFormMessage("Please wait a few seconds before sending another message.", "error");
                    return;
                }

                // Retrieve form fields
                const nameInput = document.getElementById("name");
                const emailInput = document.getElementById("email");
                const subjectInput = document.getElementById("subject");
                const messageInput = document.getElementById("message");
                const submitButton = contactForm.querySelector(".submit-button");

                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const subject = subjectInput.value.trim();
                const message = messageInput.value.trim();

                // Validation
                if (!name || !email || !subject || !message) {
                    showFormMessage("All fields are required.", "error");
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showFormMessage("Please enter a valid email address.", "error");
                    return;
                }

                // Set loading state
                isSubmitting = true;
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
                hideFormMessage();

                // Send email via EmailJS
                // Parameters: Service ID, Template ID, Form Element
                emailjs.sendForm("service_2wudsi6", "template_4neymeq", this)
                    .then(() => {
                        showFormMessage("Thank you! Your message has been sent successfully.", "success");
                        contactForm.reset();
                        lastSubmitTime = Date.now();
                    })
                    .catch((error) => {
                        console.error("EmailJS Error:", error);
                        showFormMessage("Failed to send message. Please try again later.", "error");
                    })
                    .finally(() => {
                        isSubmitting = false;
                        submitButton.disabled = false;
                        submitButton.textContent = "Send Message";
                    });
            });
        } else {
            console.error("EmailJS is not loaded.");
            showFormMessage("Contact form service is currently unavailable. Please try again later.", "error");
        }
    }

    function showFormMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = "block";
    }

    function hideFormMessage() {
        if (!formMessage) return;
        formMessage.style.display = "none";
        formMessage.className = "form-message";
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
