// Additional form validation for contact forms
document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as +250 XXX XXX XXX
            if (value.length > 0) {
                if (value.startsWith('250')) {
                    value = '+' + value;
                } else if (!value.startsWith('+')) {
                    value = '+250' + value;
                }
                
                // Add spaces for readability
                if (value.length > 4) {
                    value = value.substring(0, 4) + ' ' + value.substring(4);
                }
                if (value.length > 8) {
                    value = value.substring(0, 8) + ' ' + value.substring(8);
                }
                if (value.length > 12) {
                    value = value.substring(0, 12) + ' ' + value.substring(12);
                }
            }
            
            e.target.value = value.substring(0, 16); // Limit length
        });
    }
    
    // Date input restrictions (no past dates)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set default to 3 days from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        dateInput.value = defaultDate.toISOString().split('T')[0];
    }
    
    // Service preselection from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const packageParam = urlParams.get('package');
    
    if (serviceParam && document.getElementById('service')) {
        document.getElementById('service').value = serviceParam;
    }
    
    if (packageParam && document.getElementById('service')) {
        // Map package to service
        const packageMap = {
            'basic': 'videography',
            'professional': 'videography',
            'enterprise': 'multiple'
        };
        
        if (packageMap[packageParam]) {
            document.getElementById('service').value = packageMap[packageParam];
        }
        
        // Add package info to message
        const messageField = document.getElementById('message');
        if (messageField) {
            const packageText = `\n\nI'm interested in the ${packageParam.charAt(0).toUpperCase() + packageParam.slice(1)} package.`;
            messageField.value += packageText;
        }
    }
    
    // Form submission tracking
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            // Track conversion in Google Analytics (simulated)
            console.log('Form submitted:', this.id || 'form');
            
            // You would typically add Google Analytics event tracking here:
            // gtag('event', 'submit', {
            //     'event_category': 'form',
            //     'event_label': this.id || 'contact_form'
            // });
        });
    });
    
    // Auto-populate from URL parameters for quick contact
    const nameParam = urlParams.get('name');
    const emailParam = urlParams.get('email');
    const phoneParam = urlParams.get('phone');
    
    if (nameParam && document.getElementById('name')) {
        document.getElementById('name').value = decodeURIComponent(nameParam);
    }
    
    if (emailParam && document.getElementById('email')) {
        document.getElementById('email').value = decodeURIComponent(emailParam);
    }
    
    if (phoneParam && document.getElementById('phone')) {
        document.getElementById('phone').value = decodeURIComponent(phoneParam);
    }
});
