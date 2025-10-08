// Booking Page JavaScript

// Form validation and submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'organization', 'eventType', 'eventDate', 'venue'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate date is not in the past
    const eventDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDate < today) {
        alert('Event date cannot be in the past.');
        return;
    }
    
    // Validate terms checkbox
    if (!data.terms) {
        alert('Please accept the Terms and Conditions to proceed.');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('.booking-submit');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'block';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success state
        submitButton.classList.remove('loading');
        submitButton.classList.add('success');
        buttonText.textContent = 'Booking Request Sent!';
        buttonText.style.display = 'block';
        buttonLoading.style.display = 'none';
        
        // Show success message
        showSuccessMessage();
        
        // Reset form after 3 seconds
        setTimeout(() => {
            this.reset();
            submitButton.disabled = false;
            submitButton.classList.remove('success');
            buttonText.textContent = 'Send Booking Request';
        }, 3000);
        
    }, 2000);
});

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Booking Request Sent Successfully!</h3>
            <p>Thank you for your interest in booking Martin Rowley. He will get back to you within 24 hours to discuss your event requirements.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>Martin will review your request and check availability</li>
                <li>He'll contact you with a personalized quote and details</li>
                <li>You can discuss any specific requirements or custom topics</li>
                <li>Once confirmed, Martin will prepare a tailored presentation</li>
            </ul>
        </div>
    `;
    
    // Add success message styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .success-content {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .success-icon {
            width: 60px;
            height: 60px;
            background: #28a745;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1.5rem;
        }
        
        .success-content h3 {
            color: var(--navy);
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: var(--text-light);
            margin-bottom: 1rem;
        }
        
        .success-content ul {
            text-align: left;
            color: var(--text-light);
            margin: 1rem 0;
        }
        
        .success-content li {
            margin-bottom: 0.5rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // Close message when clicking outside
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            document.body.removeChild(successMessage);
            document.head.removeChild(style);
        }
    });
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            document.body.removeChild(successMessage);
            document.head.removeChild(style);
        }
    }, 10000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 54, 93, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 54, 93, 0.95)';
    }
});

// Form field animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Animate info cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effects to info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
    });
});

// Form validation feedback
document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#dc3545';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });
});

// Auto-format phone number
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.startsWith('0')) {
            value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        }
    }
    e.target.value = value;
});

// Set minimum date to today
document.getElementById('eventDate').setAttribute('min', new Date().toISOString().split('T')[0]);

// Add form field focus animations
const style = document.createElement('style');
style.textContent = `
    .form-group.focused label {
        color: var(--warm-gold);
        transform: translateY(-2px);
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--warm-gold);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
    
    .form-group label {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
