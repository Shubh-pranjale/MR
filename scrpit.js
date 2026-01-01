document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FIXED DROPDOWN TOGGLE ---
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownIcon = document.querySelector('.dropdown i');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            // Stop any default link behavior immediately
            e.stopPropagation(); 
            
            // Toggle the 'show' class to display the menu
            dropdownContent.classList.toggle('show');
            
            // Optional: Rotate the little arrow icon
            if(dropdownIcon) {
                dropdownIcon.style.transform = dropdownContent.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });
    }

    // Close dropdown if clicking ANYWHERE else on the screen
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.dropbtn') && !e.target.matches('.dropbtn *')) {
            if (dropdownContent && dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
                if(dropdownIcon) dropdownIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // --- 2. MOBILE MENU LOGIC ---
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }
        });
    }

    // --- 3. CONTACT FORM SUBMIT (AJAX) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const phone = contactForm.querySelector('input[name="phone"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                alert('Please enter your name, email and a message.');
                return;
            }

            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message })
                });

                if (res.ok) {
                    alert('Message sent — thank you!');
                    contactForm.reset();
                } else {
                    const text = await res.text();
                    alert('Failed to send message: ' + text);
                }
            } catch (err) {
                alert('Error sending message: ' + err.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});