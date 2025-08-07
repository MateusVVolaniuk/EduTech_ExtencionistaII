// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user is logged in
    if (!checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize dashboard
    initializeDashboard();
    
    // Sidebar functionality
    initializeSidebar();
    
    // Navigation functionality
    initializeNavigation();
    
    // Charts initialization
    initializeCharts();
    
    // AI Chat functionality
    initializeAIChat();
    
    // Exercise functionality
    initializeExercises();
    
    // Exam functionality
    initializeExams();
    
    // Progress functionality
    initializeProgress();
    
    // Achievements functionality
    initializeAchievements();
    
    // Profile functionality
    initializeProfile();
    
    // Add smooth transitions between sections
    addSectionTransitions();
    
    // Add interactive animations
    addInteractiveAnimations();
    
    // Initialize advanced charts
    initializeAdvancedCharts();
    
    // Add card animations
    addCardAnimations();
    
    // Add enhanced hover effects
    addEnhancedHoverEffects();
    
    // Add icon animations
    addIconAnimations();
    
    // Add spacing improvements
    addSpacingImprovements();
    
    // Logout functionality
    initializeLogout();
    
    // Load user data
    loadUserData();
    
    // Initialize notifications
    initializeNotifications();

    // Sidebar agora é sempre compacto - removendo funcionalidade de toggle
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Garantir que o sidebar esteja sempre no estado compacto
    sidebar.classList.add('collapsed');
    mainContent.classList.add('expanded');
    
    // Verificar se há dados de usuário para mostrar no sidebar
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            const userNameElement = document.querySelector('.user-info h6');
            const userRoleElement = document.querySelector('.user-info small');
            
            if (userNameElement) {
                userNameElement.textContent = user.name || 'Usuário';
            }
            if (userRoleElement) {
                userRoleElement.textContent = user.role || 'Estudante';
            }
        } catch (e) {
            console.error('Erro ao carregar dados do usuário:', e);
        }
    }
});

// Authentication check
function checkAuth() {
    const userData = localStorage.getItem('userData');
    const session = sessionStorage.getItem('userSession');
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    // Se há dados de sessão ou email lembrado, considerar logado
    if (userData || session || rememberedEmail) {
        return true;
    }
    
    // Para demonstração, permitir acesso se não houver dados
    console.log('Nenhuma sessão encontrada, mas permitindo acesso para demonstração');
    return true;
}

// Initialize dashboard
function initializeDashboard() {
    console.log('EducaTech Dashboard - Inicializando...');
    
    // Add loading animation
    showLoading();
    
    // Simulate data loading
    setTimeout(() => {
        hideLoading();
        updateDashboardStats();
        animateStats();
    }, 1000);
}

// Sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
    const mainContent = document.querySelector('.main-content');
    
    // Desktop sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // Save state
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }
    
    // Mobile sidebar toggle
    if (sidebarToggleMobile) {
        sidebarToggleMobile.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991.98) {
            if (!sidebar.contains(e.target) && !sidebarToggleMobile.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
    
    // Load sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
                
                // Update page title
                const linkText = this.querySelector('span').textContent;
                pageTitle.textContent = linkText;
                
                // Close mobile sidebar
                const sidebar = document.getElementById('sidebar');
                if (window.innerWidth <= 991.98) {
                    sidebar.classList.remove('show');
                }
                
                // Initialize section-specific functionality
                initializeSectionFunctionality(targetSection);
            }
        });
    });
}

// Initialize section-specific functionality
function initializeSectionFunctionality(sectionName) {
    switch(sectionName) {
        case 'exercises':
            initializeExerciseFilters();
            break;
        case 'simulados':
            initializeExamFilters();
            break;
        case 'progress':
            initializeProgressCharts();
            break;
        case 'ai-tutor':
            initializeAITutor();
            break;
        case 'achievements':
            initializeAchievementAnimations();
            break;
        case 'profile':
            initializeProfileForm();
            break;
    }
}

// Charts initialization
function initializeCharts() {
    const progressChart = document.getElementById('progressChart');
    if (progressChart) {
        const ctx = progressChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Exercícios Completados',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Taxa de Acerto (%)',
                    data: [75, 82, 78, 85, 88, 92, 90],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 8
                    }
                }
            }
        });
    }
}

// AI Chat functionality
function initializeAIChat() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput && sendButton) {
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addMessage(aiResponse, 'ai');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `
            <p>${text}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        `;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateAIResponse(userMessage) {
        const responses = {
            'oi': 'Olá! Como posso ajudar você hoje?',
            'ajuda': 'Estou aqui para ajudar! Você pode me perguntar sobre exercícios, conceitos ou pedir dicas de estudo.',
            'matemática': 'Matemática é uma disciplina fundamental! Que tópico específico você gostaria de revisar?',
            'português': 'Português é essencial para a comunicação! Tem alguma dúvida sobre gramática ou interpretação?',
            'história': 'História nos ajuda a entender o presente! Que período histórico te interessa?',
            'ciências': 'Ciências são fascinantes! Que área você gostaria de explorar?'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return 'Interessante! Posso ajudar você com exercícios, explicar conceitos ou sugerir materiais de estudo. O que você gostaria de saber?';
    }
}

// Exercise functionality
function initializeExercises() {
    // Initialize exercise buttons
    const exerciseButtons = document.querySelectorAll('.exercise-card .btn');
    exerciseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const exerciseCard = this.closest('.exercise-card');
            const exerciseTitle = exerciseCard.querySelector('h6').textContent;
            
            showNotification(`Iniciando exercício: ${exerciseTitle}`, 'info');
            
            // Simulate exercise start
            setTimeout(() => {
                showNotification('Exercício iniciado! Boa sorte!', 'success');
            }, 1000);
        });
    });
}

// Initialize exercise filters
function initializeExerciseFilters() {
    const subjectFilter = document.getElementById('subjectFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', filterExercises);
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterExercises);
    }
}

function filterExercises() {
    const subjectFilter = document.getElementById('subjectFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const exerciseCards = document.querySelectorAll('[data-subject]');
    
    const selectedSubject = subjectFilter ? subjectFilter.value : '';
    const selectedDifficulty = difficultyFilter ? difficultyFilter.value : '';
    
    exerciseCards.forEach(card => {
        const subject = card.getAttribute('data-subject');
        const difficulty = card.getAttribute('data-difficulty');
        
        const subjectMatch = !selectedSubject || subject === selectedSubject;
        const difficultyMatch = !selectedDifficulty || difficulty === selectedDifficulty;
        
        if (subjectMatch && difficultyMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Exam functionality
function initializeExams() {
    // Initialize exam buttons
    const examButtons = document.querySelectorAll('.exam-card .btn');
    examButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const examCard = this.closest('.exam-card');
            const examTitle = examCard.querySelector('h5, h6').textContent;
            
            showNotification(`Iniciando simulado: ${examTitle}`, 'info');
            
            // Simulate exam start
            setTimeout(() => {
                showNotification('Simulado iniciado! Concentre-se e boa sorte!', 'success');
            }, 1000);
        });
    });
}

// Initialize exam filters
function initializeExamFilters() {
    const examTypeFilter = document.getElementById('examTypeFilter');
    const examDurationFilter = document.getElementById('examDurationFilter');
    
    if (examTypeFilter) {
        examTypeFilter.addEventListener('change', filterExams);
    }
    
    if (examDurationFilter) {
        examDurationFilter.addEventListener('change', filterExams);
    }
}

function filterExams() {
    const examTypeFilter = document.getElementById('examTypeFilter');
    const examDurationFilter = document.getElementById('examDurationFilter');
    const examCards = document.querySelectorAll('[data-type]');
    
    const selectedType = examTypeFilter ? examTypeFilter.value : '';
    const selectedDuration = examDurationFilter ? examDurationFilter.value : '';
    
    examCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const duration = card.getAttribute('data-duration');
        
        const typeMatch = !selectedType || type === selectedType;
        const durationMatch = !selectedDuration || duration === selectedDuration;
        
        if (typeMatch && durationMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Progress functionality
function initializeProgress() {
    const progressPeriod = document.getElementById('progressPeriod');
    if (progressPeriod) {
        progressPeriod.addEventListener('change', function() {
            updateProgressData(this.value);
        });
    }
}

// Initialize progress charts
function initializeProgressCharts() {
    const subjectProgressChart = document.getElementById('subjectProgressChart');
    if (subjectProgressChart) {
        const ctx = subjectProgressChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
                datasets: [{
                    label: 'Seu Progresso',
                    data: [90, 75, 60, 80, 50],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
}

function updateProgressData(period) {
    // Simulate data update based on period
    console.log(`Updating progress data for period: ${period}`);
    showNotification('Dados de progresso atualizados!', 'info');
}

// AI Tutor functionality
function initializeAITutor() {
    const aiChatInput = document.getElementById('aiChatInput');
    const sendAiMessage = document.getElementById('sendAiMessage');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const clearChat = document.getElementById('clearChat');
    
    if (aiChatInput && sendAiMessage) {
        sendAiMessage.addEventListener('click', sendAIMessage);
        aiChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
    
    if (clearChat) {
        clearChat.addEventListener('click', function() {
            if (aiChatMessages) {
                aiChatMessages.innerHTML = `
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Olá! Sou seu tutor de IA. Como posso ajudar você hoje? Posso explicar conceitos, resolver exercícios, ou ajudar com qualquer dúvida acadêmica!</p>
                            <small>Há 1 minuto</small>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    function sendAIMessage() {
        const message = aiChatInput.value.trim();
        if (!message) return;
        
        addAIMessage(message, 'user');
        aiChatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAITutorResponse(message);
            addAIMessage(aiResponse, 'ai');
        }, 1000);
    }
    
    function addAIMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `
            <p>${text}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        `;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        aiChatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
    
    function generateAITutorResponse(userMessage) {
        const responses = {
            'equação': 'Para resolver equações, primeiro identifique o tipo (linear, quadrática, etc.) e depois aplique as técnicas apropriadas. Quer que eu mostre um exemplo?',
            'gramática': 'Gramática é fundamental! Que tópico específico você gostaria de revisar? Concordância, regência, ou outro?',
            'história': 'História é fascinante! Que período ou evento histórico te interessa? Posso explicar de forma didática.',
            'química': 'Química envolve muitos conceitos interessantes! Que área você gostaria de explorar? Orgânica, inorgânica, ou físico-química?',
            'física': 'Física é a ciência que explica como o universo funciona! Que tópico você gostaria de entender melhor?'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return 'Excelente pergunta! Posso ajudar você com explicações detalhadas, exemplos práticos e exercícios. Que matéria ou tópico você gostaria de estudar?';
    }
}

// Achievements functionality
function initializeAchievements() {
    // Initialize achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            const achievementTitle = this.querySelector('h6').textContent;
            const isUnlocked = this.classList.contains('unlocked');
            
            if (isUnlocked) {
                showNotification(`Conquista: ${achievementTitle} - Desbloqueada!`, 'success');
            } else {
                showNotification(`Conquista: ${achievementTitle} - Em progresso...`, 'info');
            }
        });
    });
}

// Initialize achievement animations
function initializeAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card.unlocked');
    
    achievementCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        }, index * 200);
    });
}

// Profile functionality
function initializeProfile() {
    const saveProfileBtn = document.getElementById('saveProfile');
    const changePictureBtn = document.getElementById('changePicture');
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            saveProfileData();
        });
    }
    
    if (changePictureBtn) {
        changePictureBtn.addEventListener('click', function() {
            // Simulate file upload
            showNotification('Funcionalidade de upload em desenvolvimento...', 'info');
        });
    }
}

// Initialize profile form
function initializeProfileForm() {
    const profileForm = document.querySelector('#profile .content-card');
    if (profileForm) {
        // Add form validation
        const inputs = profileForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove previous validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    field.classList.add('is-valid');
    return true;
}

function saveProfileData() {
    // Collect form data
    const formData = {
        name: document.getElementById('profileName')?.value,
        email: document.getElementById('profileEmail')?.value,
        phone: document.getElementById('profilePhone')?.value,
        birth: document.getElementById('profileBirth')?.value,
        school: document.getElementById('profileSchool')?.value,
        grade: document.getElementById('profileGrade')?.value,
        bio: document.getElementById('profileBio')?.value
    };
    
    // Validate required fields
    const requiredFields = ['name', 'email'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!formData[field]) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('userProfile', JSON.stringify(formData));
        showNotification('Perfil atualizado com sucesso!', 'success');
        
        // Update UI
        updateUserInterface({
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' '),
            email: formData.email,
            grade: DashboardUtils.getGradeText(formData.grade)
        });
    } catch (error) {
        showNotification('Erro ao salvar perfil. Tente novamente.', 'error');
    }
}

// Logout functionality
function initializeLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutDropdown = document.getElementById('logoutDropdown');
    
    function logout() {
        // Clear user data
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userSession');
        
        // Show logout message
        showNotification('Logout realizado com sucesso!', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

// Load user data
function loadUserData() {
    const userData = localStorage.getItem('userData');
    const session = sessionStorage.getItem('userSession');
    
    let user;
    if (userData) {
        user = JSON.parse(userData);
    } else if (session) {
        user = JSON.parse(session);
    } else {
        // Demo user data
        user = {
            firstName: 'João',
            lastName: 'Silva',
            email: 'joao.silva@email.com',
            grade: '2º Ano do Ensino Médio'
        };
    }
    
    // Update UI with user data
    updateUserInterface(user);
}

// Update user interface
function updateUserInterface(user) {
    const userName = document.getElementById('userName');
    const userGrade = document.getElementById('userGrade');
    const welcomeName = document.getElementById('welcomeName');
    
    if (userName) {
        userName.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    if (userGrade) {
        userGrade.textContent = user.grade || 'Aluno';
    }
    
    if (welcomeName) {
        welcomeName.textContent = user.firstName;
    }
}

// Update dashboard stats
function updateDashboardStats() {
    // Simulate real-time data updates
    const stats = {
        totalExercises: Math.floor(Math.random() * 50) + 100,
        accuracyRate: Math.floor(Math.random() * 20) + 75,
        studyTime: Math.floor(Math.random() * 8) + 8,
        achievements: Math.floor(Math.random() * 5) + 5
    };
    
    // Update stat elements
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = key === 'accuracyRate' ? `${stats[key]}%` : 
                                 key === 'studyTime' ? `${stats[key]}h` : stats[key];
        }
    });
}

// Animate stats
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Loading functions
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando dashboard...</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 300);
    }
}

// Notification system
function initializeNotifications() {
    // Check for new notifications periodically
    setInterval(() => {
        const hasNewNotifications = Math.random() > 0.7;
        if (hasNewNotifications) {
            showNotification('Novo exercício disponível!', 'info');
        }
    }, 30000); // Check every 30 seconds
}

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

// Utility functions
const DashboardUtils = {
    // Format time
    formatTime: function(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
    },
    
    // Calculate progress percentage
    calculateProgress: function(completed, total) {
        return Math.round((completed / total) * 100);
    },
    
    // Get grade level text
    getGradeText: function(grade) {
        const grades = {
            '6': '6º Ano',
            '7': '7º Ano',
            '8': '8º Ano',
            '9': '9º Ano',
            '1': '1º Ano do Ensino Médio',
            '2': '2º Ano do Ensino Médio',
            '3': '3º Ano do Ensino Médio'
        };
        return grades[grade] || 'Aluno';
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
            return preferences ? JSON.parse(preferences) : {};
        } catch (e) {
            console.error('Error getting preferences:', e);
            return {};
        }
    }
};

// Add loading overlay styles
const loadingStyles = `
<style>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
}

.loading-spinner {
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', loadingStyles);

console.log('EducaTech Dashboard - Carregado com sucesso! 🎓');

// Adicionar transições suaves entre seções
function addSectionTransitions() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            const currentSection = document.querySelector('.content-section.active');
            const targetSectionElement = document.getElementById(targetSection);
            
            if (currentSection && targetSectionElement) {
                // Fade out current section
                currentSection.style.opacity = '0';
                currentSection.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    // Hide current section
                    currentSection.classList.remove('active');
                    
                    // Show and animate target section
                    targetSectionElement.classList.add('active');
                    targetSectionElement.style.opacity = '0';
                    targetSectionElement.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        targetSectionElement.style.opacity = '1';
                        targetSectionElement.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                const sectionName = this.querySelector('span').textContent;
                pageTitle.textContent = sectionName;
            }
        });
    });
}

// Adicionar animações interativas
function addInteractiveAnimations() {
    // Animar cards ao entrar na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards de exercícios, simulados e conquistas
    const cards = document.querySelectorAll('.exercise-card, .exam-card, .achievement-card, .stat-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Adicionar efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar efeito de loading nos cards
    const loadingCards = document.querySelectorAll('.content-card');
    loadingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Melhorar a funcionalidade de filtros
function enhanceFilters() {
    const filters = document.querySelectorAll('.form-select');
    
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            // Adicionar efeito visual ao filtrar
            const container = this.closest('.container-fluid');
            const items = container.querySelectorAll('[data-subject], [data-type], [data-difficulty]');
            
            items.forEach(item => {
                item.style.opacity = '0.5';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 300);
            });
        });
    });
}

// Inicializar melhorias adicionais
document.addEventListener('DOMContentLoaded', function() {
    enhanceFilters();
    initializeAdvancedCharts();
    addCardAnimations();
});

// Inicializar gráficos avançados
function initializeAdvancedCharts() {
    // Gráfico de progresso por matéria
    const progressCtx = document.getElementById('subjectProgressChart');
    if (progressCtx) {
        const progressChart = new Chart(progressCtx, {
            type: 'radar',
            data: {
                labels: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês'],
                datasets: [{
                    label: 'Seu Progresso',
                    data: [90, 75, 60, 80, 50, 65],
                    backgroundColor: 'rgba(30, 58, 138, 0.2)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(30, 58, 138, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: '#64748b',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        },
                        pointLabels: {
                            color: '#1e293b',
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 58, 138, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(30, 58, 138, 1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false
                    }
                }
            }
        });
    }

    // Gráfico de atividades semanais
    const activityCtx = document.getElementById('weeklyActivityChart');
    if (activityCtx) {
        const activityChart = new Chart(activityCtx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Exercícios Completados',
                    data: [12, 19, 15, 25, 22, 18, 24],
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Adicionar animações aos cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.exercise-card, .exam-card, .achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Adicionar efeitos de hover aprimorados
function addEnhancedHoverEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .card, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
} 

// Função para adicionar animações nos ícones
function addIconAnimations() {
    // Animações para ícones de navegação
    const navIcons = document.querySelectorAll('.nav-link i');
    navIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animações para ícones de botões
    const buttonIcons = document.querySelectorAll('.btn i');
    buttonIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateX(2px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateX(0)';
        });
    });

    // Animações para ícones de estatísticas
    const statIcons = document.querySelectorAll('.stat-icon i');
    statIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animações para ícones de cards
    const cardIcons = document.querySelectorAll('.card-header i, .exercise-header i');
    cardIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = '#3b82f6';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        });
    });

    // Animações para ícones de dificuldade
    const difficultyIcons = document.querySelectorAll('.exercise-difficulty i');
    difficultyIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.animation = 'pulse 1s infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.animation = 'none';
        });
    });
}

// Função para melhorar espaçamentos
function addSpacingImprovements() {
    // Melhorar espaçamento entre seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.marginBottom = '3rem';
        section.style.paddingTop = '1rem';
    });

    // Melhorar espaçamento entre cards
    const cards = document.querySelectorAll('.exercise-card, .exam-card, .achievement-card, .content-card');
    cards.forEach(card => {
        card.style.marginBottom = '2rem';
    });

    // Melhorar espaçamento interno dos cards
    const cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(body => {
        body.style.padding = '1.5rem';
    });

    // Melhorar espaçamento dos headers
    const headers = document.querySelectorAll('.card-header');
    headers.forEach(header => {
        header.style.padding = '1.5rem 1.5rem 1rem 1.5rem';
        header.style.marginBottom = '1rem';
    });

    // Melhorar espaçamento dos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.padding = '0.75rem 1.5rem';
        button.style.fontSize = '0.9375rem';
        button.style.fontWeight = '500';
        button.style.letterSpacing = '0.02em';
    });

    // Melhorar espaçamento dos inputs
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.style.padding = '0.75rem 1rem';
        input.style.fontSize = '0.9375rem';
        input.style.borderRadius = '0.75rem';
    });

    // Melhorar espaçamento das listas
    const lists = document.querySelectorAll('.activity-list, .exercise-list');
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
            item.style.marginBottom = '1rem';
            item.style.padding = '1rem';
        });
    });

    // Melhorar espaçamento dos títulos
    const titles = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    titles.forEach(title => {
        title.style.marginBottom = '1rem';
        title.style.lineHeight = '1.3';
    });

    // Melhorar espaçamento dos parágrafos
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.marginBottom = '1rem';
        p.style.lineHeight = '1.6';
    });

    // Melhorar espaçamento dos badges
    const badges = document.querySelectorAll('.badge, .tag');
    badges.forEach(badge => {
        badge.style.padding = '0.375rem 0.75rem';
        badge.style.fontSize = '0.75rem';
        badge.style.fontWeight = '500';
        badge.style.letterSpacing = '0.02em';
    });
} 