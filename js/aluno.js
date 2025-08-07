// ===== PÁGINA DO ALUNO - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    initializeCharts();
    
    // Inicializar interações
    initializeInteractions();
    
    // Animações de entrada
    initializeAnimations();
});

// Inicializar gráficos
function initializeCharts() {
    // Gráfico de Tempo de Estudo
    const studyTimeCtx = document.getElementById('studyTimeChart');
    if (studyTimeCtx) {
        new Chart(studyTimeCtx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Horas',
                    data: [2.5, 3.2, 1.8, 4.1, 2.9, 3.5, 2.0],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Gráfico de Taxa de Acerto
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx) {
        new Chart(accuracyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: ['#10b981', '#e5e7eb'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Gráfico de Exercícios Completados
    const exercisesCtx = document.getElementById('exercisesChart');
    if (exercisesCtx) {
        new Chart(exercisesCtx, {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Exercícios',
                    data: [8, 12, 6, 15, 10, 18, 5],
                    backgroundColor: '#3b82f6',
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
    }

    // Gráfico de Pontos Ganhos
    const pointsCtx = document.getElementById('pointsChart');
    if (pointsCtx) {
        new Chart(pointsCtx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Pontos',
                    data: [150, 280, 120, 350, 200, 420, 180],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 6
                    }
                }
            }
        });
    }
}

// Inicializar interações
function initializeInteractions() {
    // Botões de ação rápida
    const actionButtons = document.querySelectorAll('.action-card .btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.action-card');
            const subject = card.querySelector('h3').textContent;
            
            // Simular início de estudo
            showNotification(`Iniciando estudos de ${subject}...`, 'success');
            
            // Adicionar efeito de loading
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Carregando...';
            this.disabled = true;
            
            // Simular carregamento
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play me-2"></i>Continuar';
                this.disabled = false;
                showNotification(`Estudos de ${subject} iniciados!`, 'success');
            }, 2000);
        });
    });

    // Botões do header
    const headerButtons = document.querySelectorAll('.header-actions .btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            
            if (action.includes('Continuar')) {
                showNotification('Redirecionando para estudos...', 'info');
            } else if (action.includes('Configurações')) {
                showNotification('Abrindo configurações...', 'info');
            }
        });
    });

    // Cards de performance
    const performanceCards = document.querySelectorAll('.performance-card');
    performanceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-header h3').textContent;
            showNotification(`Detalhes de ${title}`, 'info');
        });
    });

    // Itens de atividade
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Detalhes: ${title}`, 'info');
        });
    });

    // Itens de tarefa
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Iniciando: ${title}`, 'info');
        });
    });

    // Cards de conquista
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showNotification(`Conquista: ${title}`, 'success');
        });
    });
}

// Inicializar animações
function initializeAnimations() {
    // Animação de entrada para cards
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

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.action-card, .performance-card, .activity-item, .task-item, .achievement-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animação de contador para valores
    const counters = document.querySelectorAll('.card-value');
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('h') || target.includes('min');
        
        if (!isPercentage && !isTime) {
            animateCounter(counter, target);
        }
    });
}

// Animar contador
function animateCounter(element, target) {
    const numericValue = target.replace(/[^\d]/g, '');
    const finalValue = parseInt(numericValue);
    let currentValue = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue).toLocaleString();
    }, 30);
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        max-width: 300px;
    `;

    // Adicionar ao DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Obter ícone da notificação
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Obter cor da notificação
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// Atualizar dados em tempo real (simulação)
function updateRealTimeData() {
    // Simular atualização de dados
    setInterval(() => {
        const performanceCards = document.querySelectorAll('.performance-card');
        performanceCards.forEach(card => {
            const valueElement = card.querySelector('.card-value');
            const trendElement = card.querySelector('.card-trend');
            
            // Simular pequenas variações
            if (Math.random() > 0.8) {
                const currentValue = valueElement.textContent;
                if (currentValue.includes('h')) {
                    // Tempo de estudo
                    const hours = parseInt(currentValue.split('h')[0]);
                    const minutes = parseInt(currentValue.split(' ')[1]);
                    const newMinutes = minutes + Math.floor(Math.random() * 5);
                    if (newMinutes >= 60) {
                        valueElement.textContent = `${hours + 1}h ${newMinutes - 60}min`;
                    } else {
                        valueElement.textContent = `${hours}h ${newMinutes}min`;
                    }
                } else if (currentValue.includes('%')) {
                    // Taxa de acerto
                    const percentage = parseInt(currentValue);
                    const newPercentage = Math.min(100, percentage + Math.floor(Math.random() * 2));
                    valueElement.textContent = `${newPercentage}%`;
                } else if (currentValue.includes(',')) {
                    // Pontos ganhos
                    const points = parseInt(currentValue.replace(/,/g, ''));
                    const newPoints = points + Math.floor(Math.random() * 10);
                    valueElement.textContent = newPoints.toLocaleString();
                } else {
                    // Exercícios completados
                    const exercises = parseInt(currentValue);
                    const newExercises = exercises + Math.floor(Math.random() * 2);
                    valueElement.textContent = newExercises;
                }
            }
        });
    }, 10000); // Atualizar a cada 10 segundos
}

// Iniciar atualizações em tempo real
updateRealTimeData();

// Adicionar funcionalidade de pesquisa (se necessário)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar disciplinas, atividades...';
    searchInput.className = 'form-control';
    searchInput.style.cssText = `
        margin-bottom: 1rem;
        border-radius: 0.75rem;
        border: 1px solid #e2e8f0;
        padding: 0.75rem 1rem;
        font-family: 'Poppins', sans-serif;
    `;

    // Adicionar funcionalidade de pesquisa
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.action-card, .activity-item, .task-item');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Inserir campo de pesquisa no início do content-wrapper
    const contentWrapper = document.querySelector('.content-wrapper .container-fluid');
    if (contentWrapper) {
        contentWrapper.insertBefore(searchInput, contentWrapper.firstChild);
    }
}

// Inicializar pesquisa (opcional)
// initializeSearch(); 