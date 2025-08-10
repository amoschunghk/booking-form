// Form validation and enhancement for booking form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="contact"]');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Form validation
    function validateForm() {
        const requiredFields = [
            'student-name',
            'parent-phone',
            'email',
            'class-type',
            'date',
            'time'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            // Remove previous error styling
            field.classList.remove('error');
            
            if (!value) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailPattern.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
        
        // Phone validation (basic)
        const phoneField = document.getElementById('parent-phone');
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (phoneField.value && !phonePattern.test(phoneField.value)) {
            phoneField.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
            
            // Show error message
            showMessage('請填寫所有必填欄位', 'error');
            
            // Focus on first error field
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        } else {
            // Show success message
            showMessage('正在提交預約申請...', 'success');
            submitButton.disabled = true;
            submitButton.textContent = '提交中...';
        }
    });
    
    // Message display function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message before form
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-remove success message after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Add smooth animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
