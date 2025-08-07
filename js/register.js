// Register Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const birthDateInput = document.getElementById('birthDate');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Password strength indicator
    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = validatePasswordStrength(password);
            updatePasswordStrengthIndicator(strength);
        });
    }

    // Phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                this.value = value;
            }
        });
    }

    // Birth date validation
    if (birthDateInput) {
        birthDateInput.addEventListener('change', function() {
            const birthDate = new Date(this.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 10 || age > 100) {
                showFieldError(this, 'Data de nascimento inválida');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                clearFieldError(this);
            }
        });
    }

    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                showFieldError(this, 'Por favor, insira um email válido');
            } else if (email) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                clearFieldError(this);
            }
        });
    }

    // Confirm password validation
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                showFieldError(this, 'As senhas não coincidem');
            } else if (confirmPassword) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                clearFieldError(this);
            }
        });
    }

    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateRegisterForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Criando conta...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    showNotification('Conta criada com sucesso! Redirecionando...', 'success');
                    
                    // Save user data to localStorage (simulation)
                    const userData = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        grade: data.grade,
                        interests: getSelectedInterests(),
                        createdAt: new Date().toISOString()
                    };
                    
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    // Redirect to login page after a short delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }, 3000);
            }
        });
    }

    // Form validation functions
    function validateRegisterForm(data) {
        let isValid = true;
        
        // Clear previous error states
        clearAllValidationStates();
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'birthDate', 'grade', 'password', 'confirmPassword'];
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(element, 'Este campo é obrigatório');
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !validateEmail(data.email)) {
            showFieldError(emailInput, 'Por favor, insira um email válido');
            isValid = false;
        }
        
        // Password validation
        if (data.password) {
            const strength = validatePasswordStrength(data.password);
            if (!strength.isValid) {
                showFieldError(passwordInput, 'A senha deve ter pelo menos 6 caracteres');
                isValid = false;
            }
        }
        
        // Confirm password validation
        if (data.password !== data.confirmPassword) {
            showFieldError(confirmPasswordInput, 'As senhas não coincidem');
            isValid = false;
        }
        
        // Terms acceptance validation
        if (!data.terms) {
            const termsCheckbox = document.getElementById('terms');
            showFieldError(termsCheckbox, 'Você deve aceitar os termos de uso');
            isValid = false;
        }
        
        // Birth date validation
        if (data.birthDate) {
            const birthDate = new Date(data.birthDate);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 10 || age > 100) {
                showFieldError(birthDateInput, 'Data de nascimento inválida');
                isValid = false;
            }
        }
        
        return isValid;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePasswordStrength(password) {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const strength = {
            length: password.length >= minLength,
            upperCase: hasUpperCase,
            lowerCase: hasLowerCase,
            numbers: hasNumbers,
            specialChar: hasSpecialChar
        };
        
        const score = Object.values(strength).filter(Boolean).length;
        
        return {
            isValid: score >= 3 && password.length >= minLength,
            score: score,
            details: strength
        };
    }

    function updatePasswordStrengthIndicator(strength) {
        const { score, details } = strength;
        
        // Update strength bar
        strengthFill.className = 'strength-fill';
        
        if (score === 0) {
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Muito fraca';
        } else if (score === 1) {
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Fraca';
        } else if (score === 2) {
            strengthFill.classList.add('fair');
            strengthText.textContent = 'Regular';
        } else if (score === 3) {
            strengthFill.classList.add('good');
            strengthText.textContent = 'Boa';
        } else if (score >= 4) {
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Forte';
        }
        
        // Update text color
        if (score <= 2) {
            strengthText.className = 'text-danger';
        } else if (score === 3) {
            strengthText.className = 'text-warning';
        } else {
            strengthText.className = 'text-success';
        }
    }

    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function clearAllValidationStates() {
        const fields = document.querySelectorAll('.form-control, .form-select, .form-check-input');
        fields.forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
            const errorDiv = field.parentNode.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    }

    function getSelectedInterests() {
        const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Real-time validation for all fields
    const formFields = document.querySelectorAll('.form-control, .form-select');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
            clearFieldError(this);
        });
        
        field.addEventListener('blur', function() {
            // Add specific validation based on field type
            if (this.type === 'email' && this.value) {
                if (!validateEmail(this.value)) {
                    showFieldError(this, 'Por favor, insira um email válido');
                } else {
                    this.classList.add('is-valid');
                }
            }
        });
    });

    // Terms checkbox validation
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            this.classList.remove('is-invalid');
            clearFieldError(this);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px;';
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error':
            case 'danger': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (registerForm && document.activeElement.closest('#registerForm')) {
                registerForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // Focus management for accessibility
    if (document.getElementById('firstName')) {
        document.getElementById('firstName').focus();
    }

    // Form field animations
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Auto-save form data (prevent data loss)
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveFormData();
        });
    });

    function saveFormData() {
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        localStorage.setItem('registerFormData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('registerFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element && data[key]) {
                    if (element.type === 'checkbox') {
                        element.checked = data[key] === 'on';
                    } else {
                        element.value = data[key];
                    }
                }
            });
        }
    }

    // Load saved form data on page load
    loadFormData();

    // Clear saved form data on successful submission
    if (registerForm) {
        registerForm.addEventListener('submit', function() {
            localStorage.removeItem('registerFormData');
        });
    }

    // Demo data helper
    function fillDemoData() {
        const demoData = {
            firstName: 'João',
            lastName: 'Silva',
            email: 'joao.silva@email.com',
            birthDate: '2005-06-15',
            phone: '(11) 99999-9999',
            grade: '2em',
            school: 'Escola Estadual São Paulo',
            password: 'Senha123!',
            confirmPassword: 'Senha123!'
        };

        Object.keys(demoData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = demoData[key];
                element.dispatchEvent(new Event('input'));
            }
        });

        // Check some interests
        const interests = ['math', 'science', 'portuguese'];
        interests.forEach(interest => {
            const checkbox = document.getElementById(interest);
            if (checkbox) {
                checkbox.checked = true;
            }
        });

        // Accept terms
        const termsCheckbox = document.getElementById('terms');
        if (termsCheckbox) {
            termsCheckbox.checked = true;
        }
    }

    // Show demo data button in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const demoButton = document.createElement('button');
        demoButton.type = 'button';
        demoButton.className = 'btn btn-outline-secondary btn-sm position-fixed';
        demoButton.style.cssText = 'top: 10px; left: 10px; z-index: 1000;';
        demoButton.innerHTML = '<i class="fas fa-magic me-1"></i>Preencher Demo';
        demoButton.addEventListener('click', fillDemoData);
        document.body.appendChild(demoButton);
    }

    console.log('EducaTech Register - Página carregada com sucesso! 📝');
});

// Utility functions for registration
const RegisterUtils = {
    // Validate age
    validateAge: function(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    },
    
    // Format phone number
    formatPhone: function(phone) {
        return phone.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    },
    
    // Generate username from name
    generateUsername: function(firstName, lastName) {
        const base = (firstName + lastName).toLowerCase().replace(/\s+/g, '');
        const random = Math.floor(Math.random() * 1000);
        return `${base}${random}`;
    },
    
    // Save user preferences
    savePreferences: function(preferences) {
        try {
            localStorage.setItem('userPreferences', JSON.stringify(preferences));
            return true;
        } catch (e) {
            console.error('Error saving preferences:', e);
            return false;
        }
    },
    
    // Get user preferences
    getPreferences: function() {
        try {
            const preferences = localStorage.getItem('userPreferences');
            return preferences ? JSON.parse(preferences) : null;
        } catch (e) {
            console.error('Error getting preferences:', e);
            return null;
        }
    }
}; 