// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');

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

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            const rememberMe = formData.get('rememberMe') === 'on';

            // Validate form
            if (validateLoginForm(email, password)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Entrando...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Simulate login success
                    if (email === 'admin@educatech.com' && password === 'admin123') {
                        showNotification('Login realizado com sucesso!', 'success');
                        
                        // Save to localStorage if remember me is checked
                        if (rememberMe) {
                            localStorage.setItem('rememberedEmail', email);
                        } else {
                            localStorage.removeItem('rememberedEmail');
                        }

                        // Save user session
                        LoginUtils.saveSession({
                            email: email,
                            name: 'Aluno Demo',
                            role: 'student',
                            loginTime: new Date().toISOString()
                        });
                        
                        // Also save to localStorage for compatibility
                        localStorage.setItem('userData', JSON.stringify({
                            email: email,
                            name: 'Aluno Demo',
                            role: 'student'
                        }));

                        // Redirect to dashboard after a short delay
                        setTimeout(() => {
                            console.log('Redirecionando para dashboard...');
                            window.location.href = 'dashboard.html';
                        }, 1500);
                    } else {
                        showNotification('Email ou senha incorretos. Tente novamente.', 'error');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }, 2000);
            }
        });
    }

    // Forgot password form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('recoveryEmail').value;
            
            if (validateEmail(email)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
                submitBtn.disabled = true;

                // Simulate password recovery
                setTimeout(() => {
                    showNotification('Email de recuperação enviado! Verifique sua caixa de entrada.', 'success');
                    
                    // Close modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                    if (modal) {
                        modal.hide();
                    }
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            } else {
                showNotification('Por favor, insira um email válido.', 'error');
            }
        });
    }

    // Form validation functions
    function validateLoginForm(email, password) {
        let isValid = true;
        
        // Clear previous error states
        clearValidationStates();
        
        // Email validation
        if (!email || !validateEmail(email)) {
            showFieldError(emailInput, 'Por favor, insira um email válido.');
            isValid = false;
        }
        
        // Password validation
        if (!password || password.length < 6) {
            showFieldError(passwordInput, 'A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
        }
        
        return isValid;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    function clearValidationStates() {
        const fields = [emailInput, passwordInput];
        fields.forEach(field => {
            if (field) {
                field.classList.remove('is-invalid', 'is-valid');
                const errorDiv = field.parentNode.querySelector('.invalid-feedback');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    }

    // Real-time validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                showFieldError(this, 'Por favor, insira um email válido.');
            } else if (email) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        emailInput.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
            const errorDiv = this.parentNode.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const password = this.value;
            if (password && password.length < 6) {
                showFieldError(this, 'A senha deve ter pelo menos 6 caracteres.');
            } else if (password) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        passwordInput.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
            const errorDiv = this.parentNode.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    }

    // Load remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-outline-primary');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            showNotification(`Login com ${provider} em desenvolvimento...`, 'info');
        });
    });

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
        // Ctrl/Cmd + Enter to submit login form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (loginForm && document.activeElement.closest('#loginForm')) {
                loginForm.dispatchEvent(new Event('submit'));
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
    if (emailInput) {
        emailInput.focus();
    }

    // Auto-focus on modal inputs
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    if (forgotPasswordModal) {
        forgotPasswordModal.addEventListener('shown.bs.modal', function() {
            const recoveryEmailInput = document.getElementById('recoveryEmail');
            if (recoveryEmailInput) {
                recoveryEmailInput.focus();
            }
        });
    }

    // Form field animations
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });

    // Demo credentials helper
    function showDemoCredentials() {
        const demoInfo = document.createElement('div');
        demoInfo.className = 'alert alert-info alert-dismissible fade show mt-3';
        demoInfo.innerHTML = `
            <strong>Credenciais de Demonstração:</strong><br>
            Email: admin@educatech.com<br>
            Senha: admin123
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.parentNode.insertBefore(demoInfo, loginForm.nextSibling);
        }
    }

    // Show demo credentials in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(showDemoCredentials, 2000);
    }

    console.log('EducaTech Login - Página carregada com sucesso! 🔐');
});



// Utility functions for login
const LoginUtils = {
    // Hash password (in production, use proper hashing)
    hashPassword: function(password) {
        // This is a simple hash for demo purposes
        // In production, use bcrypt or similar
        return btoa(password);
    },
    
    // Validate password strength
    validatePasswordStrength: function(password) {
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
            isValid: score >= 3,
            score: score,
            details: strength
        };
    },
    
    // Generate secure token
    generateToken: function() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    },
    
    // Save user session
    saveSession: function(userData) {
        try {
            sessionStorage.setItem('userSession', JSON.stringify(userData));
            return true;
        } catch (e) {
            console.error('Error saving session:', e);
            return false;
        }
    },
    
    // Get user session
    getSession: function() {
        try {
            const session = sessionStorage.getItem('userSession');
            return session ? JSON.parse(session) : null;
        } catch (e) {
            console.error('Error getting session:', e);
            return null;
        }
    },
    
    // Clear user session
    clearSession: function() {
        try {
            sessionStorage.removeItem('userSession');
            return true;
        } catch (e) {
            console.error('Error clearing session:', e);
            return false;
        }
    }
}; 