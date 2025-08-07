# EducaTech - Ensino Ampliado

Plataforma educacional inovadora que utiliza inteligência artificial para personalizar a experiência de aprendizado dos alunos do 6° ano ao 3° ano do ensino médio.

## 🎯 Sobre o Projeto

O EducaTech foi desenvolvido como parte da Atividade Extensionista II do curso CST em Análise e Desenvolvimento de Sistemas da UNINTER. A plataforma oferece:

- **IA Personalizada**: Inteligência artificial que identifica dificuldades e oferece exercícios personalizados
- **Acompanhamento de Progresso**: Monitoramento detalhado do desenvolvimento acadêmico
- **Simulados Interativos**: Testes gamificados para vestibular e outras avaliações
- **Interface Moderna**: Design responsivo e intuitivo

## 🚀 Funcionalidades

### Páginas Principais

#### 1. **Página Inicial (index.html)** ✨ **ATUALIZADO**
- **Design Moderno**: Interface com gradientes e efeitos glassmorphism
- **Navegação Limpa**: Menu sem ícones para melhor foco no conteúdo
- **Cards Interativos**: Efeitos hover e animações suaves
- **Imagem Hero**: Adolescente substituindo ícone de foguete
- **Responsividade**: Adaptação perfeita para todos os dispositivos
- **Tipografia Melhorada**: Fonte Poppins para melhor legibilidade

#### 2. **Login (login.html)** ✨ **ATUALIZADO**
- **Design Moderno**: Interface com gradientes e efeitos glassmorphism
- **Cores Padronizadas**: Mantém a cor de destaque #1e3a8a em todos os elementos
- **Ícones Padronizados**: Font Awesome 6.4.0 com ícones brancos consistentes
- **Tipografia Melhorada**: Fonte Poppins para melhor legibilidade
- **Responsividade**: Adaptação perfeita para mobile e desktop
- **Animações Suaves**: Transições e efeitos hover modernos
- **Validação em Tempo Real**: Feedback visual para campos de formulário
- **Modal de Recuperação**: Interface elegante para recuperação de senha

#### 3. **Cadastro (register.html)** ✨ **ATUALIZADO**
- **Layout Fixo**: Sidebar lateral fixa com informações da plataforma
- **Área Rolável**: Formulário com rolagem independente
- **Design System**: Cores e tipografia padronizadas
- **Formulário Completo**: Campos para todos os dados necessários
- **Validação Avançada**: Feedback visual em tempo real
- **Responsividade**: Adaptação para diferentes tamanhos de tela

#### 4. **Dashboard (dashboard.html)** ✨ **ATUALIZADO**
- **Painel do Aluno**: Seção completa para acompanhamento estudantil
- **Interface Administrativa**: Gráficos de progresso e métricas
- **Chat com IA Tutor**: Sistema de assistência inteligente
- **Sistema de Conquistas**: Gamificação do aprendizado
- **Design Profissional**: Espaçamentos e layout otimizados
- **Navegação Intuitiva**: Sidebar com menu organizado

#### 5. **Página do Aluno (aluno.html)** 🆕 **NOVO**
- **Interface Dedicada**: Página específica para o perfil do aluno
- **Menu Lateral**: Navegação com notificações e perfil integrados
- **Métricas Detalhadas**: Gráficos de performance acadêmica
- **Progresso Visual**: Indicadores de desenvolvimento
- **Sistema de Conquistas**: Badges e certificados
- **Design Consistente**: Mesma identidade visual do sistema

## 🎨 Design System

### Cores Principais
- **Primária**: `#1e3a8a` (Azul escuro)
- **Secundária**: `#1e40af` (Azul médio)
- **Acento**: `#60a5fa` (Azul claro)
- **Sucesso**: `#10b981` (Verde)
- **Aviso**: `#f59e0b` (Amarelo)
- **Info**: `#3b82f6` (Azul info)
- **Perigo**: `#ef4444` (Vermelho)

### Tipografia
- **Fonte Principal**: Poppins (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Fallback**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

### Componentes Padronizados

#### Botões
```css
.btn-primary {
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
    border-radius: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Campos de Formulário
```css
.form-control {
    border: 2px solid #e2e8f0;
    border-radius: 1rem;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
}
```

#### Cards
```css
.content-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

#### Sidebar
```css
.sidebar {
    background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
    width: 80px;
    position: fixed;
    height: 100vh;
    overflow: hidden;
}
```

## 📱 Responsividade

A plataforma é totalmente responsiva com breakpoints:
- **Desktop**: > 991px
- **Tablet**: 768px - 991px
- **Mobile**: < 768px

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript**: Interatividade e validações
- **Bootstrap 5.3.0**: Framework CSS
- **Font Awesome 6.4.0**: Ícones
- **Chart.js**: Gráficos interativos
- **Google Fonts**: Tipografia

## 🎯 Melhorias Recentes

### ✅ Implementadas em Todas as Páginas

1. **Design System Unificado**
   - Cores padronizadas em todo o projeto (#1e3a8a como cor principal)
   - Tipografia consistente com Poppins
   - Espaçamentos e bordas uniformes
   - Ícones Font Awesome padronizados

2. **Interface Moderna**
   - Efeitos glassmorphism
   - Gradientes suaves
   - Animações de entrada e hover
   - Sombras e profundidade
   - Efeitos de transformação suaves

3. **Experiência do Usuário**
   - Validação em tempo real
   - Feedback visual imediato
   - Navegação por teclado
   - Acessibilidade melhorada
   - Layouts responsivos

4. **Navegação Consistente**
   - Sidebar fixa com menu lateral
   - Integração de notificações e perfil
   - Navegação intuitiva entre páginas
   - Estados ativos claros

5. **Performance**
   - CSS otimizado
   - Animações suaves
   - Carregamento rápido
   - Código limpo e organizado

### 🎨 Elementos Visuais Específicos

#### Página de Login
- Ícones brancos padronizados
- Modal de recuperação de senha
- Efeitos hover nos botões
- Validação visual em tempo real

#### Página de Cadastro
- Layout com sidebar fixa
- Área de formulário rolável
- Informações da plataforma sempre visíveis
- Formulário completo com validação

#### Página Inicial
- Cards interativos com efeitos hover
- Imagem de adolescente no hero
- Menu de navegação limpo
- Seções bem organizadas

#### Dashboard
- Painel do Aluno completo
- Gráficos de progresso
- Sistema de conquistas
- Chat com IA Tutor

#### Página do Aluno
- Interface dedicada ao estudante
- Métricas de performance
- Sistema de notificações integrado
- Gráficos interativos com Chart.js

## 🚀 Como Usar

### Credenciais de Demonstração
- **Email**: admin@educatech.com
- **Senha**: admin123

### Instalação Local
1. Clone o repositório
2. Abra `frontend/index.html` no navegador
3. Navegue para a página de login
4. Use as credenciais de demonstração

### Navegação
- **Página Inicial**: Apresentação da plataforma
- **Login**: Acesso ao sistema
- **Cadastro**: Registro de novos usuários
- **Dashboard**: Painel administrativo completo
- **Página do Aluno**: Interface específica do estudante

## 👥 Autores

- **Mateus Volaniuk** (RU: 4382927)
- **Bruno Telles Rocha de Menezes** (RU: 4318152)

## 📄 Licença

Projeto desenvolvido para a UNINTER - Atividade Extensionista II.

---

**EducaTech** - Ensino Ampliado: IA e Colaboração em Foco 🎓 
