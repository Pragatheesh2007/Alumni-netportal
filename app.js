// Application State
const AppState = {
    currentTab: 'login',
    currentSection: 'dashboard',
    currentStep: 1,
    selectedRole: null,
    currentUser: null,
    filteredJobs: [],
    filteredUsers: [],
    selectedUserForRemoval: null,
    selectedJobForRemoval: null,
    selectedEventForRemoval: null,
    messages: [],
    notifications: [],
    activeMessageTab: 'chat',
    formData: {
        signup: {}
    }
};

// Enhanced Chat App functionality
class ChatApp {
    constructor() {
        this.currentUser = 'You';
        this.users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
        this.messages = [];
        this.notifications = [];
        this.activeTab = 'chat';
        
        this.init();
    }

    init() {
        this.addWelcomeMessage();
        this.simulateUserActivity();
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            text: 'Welcome to Alumni Network Messages! You can now send messages to any user and receive notifications.',
            sender: 'System',
            timestamp: new Date(),
            type: 'system'
        };
        this.messages.push(welcomeMsg);
        AppState.messages = [...this.messages];
    }

    sendDirectMessage(recipient, text) {
        if (recipient && text) {
            // Add to chat messages
            const message = {
                id: Date.now(),
                text: text,
                sender: AppState.currentUser ? AppState.currentUser.name : 'You',
                recipient: recipient,
                timestamp: new Date(),
                type: 'sent'
            };
            
            this.messages.push(message);
            AppState.messages = [...this.messages];
            
            // Show success feedback
            this.showTemporaryMessage(`Message sent to ${recipient}!`);
            
            // Simulate response from recipient
            setTimeout(() => {
                this.simulateDirectResponse(recipient, text);
            }, 2000 + Math.random() * 3000);
            
            return true;
        }
        return false;
    }

    simulateDirectResponse(originalSender, originalMessage) {
        const responses = [
            "Thanks for your message! I'll get back to you soon.",
            "Got it! Let me think about this.",
            "Interesting point! What's your take on it?",
            "I appreciate you reaching out!",
            "That's a good question. Let me consider it.",
            "Thanks for letting me know!",
            "I'll look into this and respond shortly.",
            "Good to hear from you!"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Add response to chat
        const message = {
            id: Date.now(),
            text: randomResponse,
            sender: originalSender,
            recipient: AppState.currentUser ? AppState.currentUser.name : 'You',
            timestamp: new Date(),
            type: 'received'
        };
        
        this.messages.push(message);
        AppState.messages = [...this.messages];
        
        // Add to notifications
        this.addNotification(originalSender, randomResponse, new Date());
    }

    addNotification(sender, message, timestamp) {
        const notification = {
            sender: sender,
            message: message,
            timestamp: timestamp,
            id: Date.now() + Math.random()
        };
        
        this.notifications.unshift(notification);
        AppState.notifications = [...this.notifications];
        this.updateNotificationBadge();
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        const messageBadge = document.getElementById('messageBadge');
        const count = this.notifications.length;
        
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        if (messageBadge) {
            if (count > 0) {
                messageBadge.textContent = count > 99 ? '99+' : count;
                messageBadge.style.display = 'flex';
            } else {
                messageBadge.style.display = 'none';
            }
        }
    }

    simulateUserActivity() {
        // Simulate random messages from users
        setInterval(() => {
            if (Math.random() < 0.2) { // 20% chance every 15 seconds
                const randomUser = this.users[Math.floor(Math.random() * this.users.length)];
                const randomMessages = [
                    "Hey everyone! How's it going?",
                    "Just finished a great project!",
                    "Anyone up for a coffee break?",
                    "The weather is amazing today!",
                    "Working on something exciting!",
                    "Hope everyone is having a great day!",
                    "Just saw an interesting article online.",
                    "Looking forward to the weekend!"
                ];
                
                const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
                
                const message = {
                    id: Date.now(),
                    text: randomMessage,
                    sender: randomUser,
                    recipient: 'Everyone',
                    timestamp: new Date(),
                    type: 'received'
                };
                
                this.messages.push(message);
                AppState.messages = [...this.messages];
                
                // Add to notifications
                this.addNotification(randomUser, randomMessage, new Date());
                
                // Update UI if messages section is active
                if (AppState.currentSection === 'messages') {
                    renderMessages();
                    renderNotifications();
                }
            }
        }, 15000);
    }

    showTemporaryMessage(text) {
        const tempMessage = {
            id: Date.now(),
            text: text,
            sender: 'System',
            timestamp: new Date(),
            type: 'system'
        };
        
        this.messages.push(tempMessage);
        AppState.messages = [...this.messages];
        
        // Update UI if messages section is active
        if (AppState.currentSection === 'messages') {
            renderMessages();
        }
        
        // Remove after 3 seconds
        setTimeout(() => {
            const index = this.messages.indexOf(tempMessage);
            if (index > -1) {
                this.messages.splice(index, 1);
                AppState.messages = [...this.messages];
                if (AppState.currentSection === 'messages') {
                    renderMessages();
                }
            }
        }, 3000);
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Initialize chat app
let chatApp;

function getStoredUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveStoredUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getStoredJobs() {
  return JSON.parse(localStorage.getItem('alumni_jobs') || JSON.stringify(sampleJobs));
}
function saveStoredJobs(jobs) {
  localStorage.setItem('alumni_jobs', JSON.stringify(jobs));
}

function getStoredEvents() {
  return JSON.parse(localStorage.getItem('alumni_events') || JSON.stringify(sampleEvents));
}
function saveStoredEvents(events) {
  localStorage.setItem('alumni_events', JSON.stringify(events));
}

// Theme Management
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
}

function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Demo credentials and data
const DEMO_CREDENTIALS = {
    email: 'demo@alumni.edu',
    password: 'password123'
};

// Sample data from JSON
const sampleJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        description: "Join our core infrastructure team to build scalable systems that serve billions of users worldwide. You'll work on cutting-edge distributed systems and help shape the future of cloud computing.",
        requirements: "5+ years of software development experience, proficiency in Java/Python/Go, experience with distributed systems, strong algorithms background",
        salary: "$180,000 - $250,000",
        postedBy: "Sarah Johnson",
        datePosted: "2025-09-08",
        type: "full-time",
        category: "software",
        experienceLevel: "senior",
        benefits: "Health insurance, 401k matching, stock options, free meals"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Meta",
        location: "Menlo Park, CA",
        description: "Build the next generation of social experiences that connect billions of people worldwide. Work with React, GraphQL, and cutting-edge web technologies.",
        requirements: "3+ years React experience, JavaScript/TypeScript expertise, CSS mastery, experience with modern web frameworks",
        salary: "$140,000 - $190,000",
        postedBy: "Michael Chen",
        datePosted: "2025-09-07",
        type: "full-time",
        category: "software",
        experienceLevel: "mid-level",
        benefits: "Comprehensive health coverage, RSUs, unlimited PTO"
    },
    {
        id: 3,
        title: "Data Science Intern",
        company: "Netflix",
        location: "Los Gatos, CA",
        description: "Summer internship opportunity working on recommendation algorithms and user behavior analysis. Gain hands-on experience with machine learning at scale.",
        requirements: "Current student in CS/Statistics/Math, Python/R proficiency, machine learning coursework, SQL knowledge",
        salary: "$8,000/month",
        postedBy: "Sarah Johnson",
        datePosted: "2025-09-06",
        type: "internship",
        category: "data-science",
        experienceLevel: "entry-level"
    }
];

const sampleUsers = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        role: "alumni",
        graduationYear: 2018,
        major: "Computer Science",
        company: "Google",
        location: "Mountain View, CA",
        bio: "Software Engineer passionate about AI and machine learning",
        profilePicture: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
        status: "active"
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael.chen@email.com",
        role: "alumni",
        graduationYear: 2020,
        major: "Information Technology",
        company: "Microsoft",
        location: "Seattle, WA",
        bio: "Full-stack developer with expertise in cloud technologies",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        status: "active"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        role: "student",
        graduationYear: 2025,
        major: "Computer Science",
        company: "",
        location: "Boston, MA",
        bio: "Final year CS student interested in software development",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        status: "active"
    },
    {
        id: 4,
        name: "Admin User",
        email: "admin@alumni.edu",
        role: "admin",
        graduationYear: 2015,
        major: "Computer Science",
        company: "University",
        location: "Campus",
        bio: "System administrator",
        password: "admin123",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        status: "active"
    }
];

const sampleEvents = [
    {
        id: 1,
        title: "Alumni Tech Meetup 2025",
        description: "Annual gathering of tech professionals from our alumni network. Join us for networking, tech talks, and career discussions.",
        date: "2025-10-15",
        location: "University Campus - Tech Center",
        organizer: "Alumni Association",
        attendees: 45,
        category: "networking",
        isVirtual: false
    },
    {
        id: 2,
        title: "Career Workshop: Landing Your Dream Job",
        description: "Interactive workshop on job search strategies, resume building, and interview preparation led by industry professionals.",
        date: "2025-09-25",
        location: "Online via Zoom",
        organizer: "Career Services",
        attendees: 28,
        category: "career",
        isVirtual: true
    },
    {
        id: 3,
        title: "AI & Machine Learning Seminar",
        description: "Technical seminar exploring latest trends in AI and ML, featuring alumni working at top tech companies.",
        date: "2025-10-01",
        location: "Engineering Building - Auditorium",
        organizer: "CS Department",
        attendees: 67,
        category: "workshop",
        isVirtual: false
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Alumni Network Platform...');
    
    loadTheme(); // Load theme first
    chatApp = new ChatApp(); // Initialize chat functionality
    initializeParticles();
    initializeTabSwitching();
    initializeFloatingLabels();
    initializePasswordToggles();
    initializePasswordStrength();
    initializeRoleSelection();
    initializeFormValidation();
    initializeRippleEffects();
    initializeSignupFlow();
    initializePlatformNavigation();
    initializeJobsSection();
    initializeDirectorySection();
    initializeEventsSection();
    initializeProfileSection();
    initializeMessagesSection();
    
    // Set initial state
    updateProgressBar();
    AppState.filteredJobs = [...getStoredJobs()];
    AppState.filteredUsers = [...sampleUsers];
    
    console.log('Application initialized successfully');
});

// Messages Section Functions
function initializeMessagesSection() {
    console.log('Initializing messages section...');
}

function loadMessages() {
    renderMessageUsers();
    renderMessages();
    renderNotifications();
}

function renderMessageUsers() {
    const usersList = document.getElementById('messageUsersList');
    if (!usersList) return;
    
    const storedUsers = getStoredUsers();
    const allUsers = [...sampleUsers, ...storedUsers];
    const activeUsers = allUsers.filter(user => user.status === 'active');
    
    usersList.innerHTML = activeUsers.map(user => `
        <div class="user-item" onclick="selectMessageUser('${user.name}')">
            <div class="user-avatar-small">${user.name.charAt(0)}</div>
            <div class="user-name-small">${user.name}</div>
        </div>
    `).join('');
}

function selectMessageUser(username) {
    const recipientInput = document.getElementById('recipientInput');
    const messageContent = document.getElementById('messageContent');
    
    if (recipientInput) {
        recipientInput.value = username;
        if (messageContent) {
            messageContent.focus();
        }
    }
}

function sendDirectMessage() {
    const recipientInput = document.getElementById('recipientInput');
    const messageContent = document.getElementById('messageContent');
    
    if (!recipientInput || !messageContent) return;
    
    const recipient = recipientInput.value.trim();
    const text = messageContent.value.trim();
    
    if (chatApp.sendDirectMessage(recipient, text)) {
        // Clear form
        recipientInput.value = '';
        messageContent.value = '';
        
        // Update UI
        renderMessages();
        renderNotifications();
    } else {
        showMessage('error', 'Please enter both recipient and message.');
    }
}

function switchMessageTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.message-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.message-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate selected tab
    event.target.closest('.message-tab').classList.add('active');
    
    if (tabName === 'chat') {
        document.getElementById('chatContent').classList.add('active');
    } else if (tabName === 'notifications') {
        document.getElementById('notificationsContent').classList.add('active');
        
        // Clear notifications after viewing
        setTimeout(() => {
            chatApp.notifications = [];
            AppState.notifications = [];
            chatApp.updateNotificationBadge();
            renderNotifications();
        }, 3000);
    }
    
    AppState.activeMessageTab = tabName;
}

function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    if (AppState.messages.length === 0) {
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">👋</div>
                <h3>Welcome to Alumni Network Messages!</h3>
                <p>Connect with fellow alumni and current students. Send messages using the form on the left or click on any user to start a conversation.</p>
            </div>
        `;
        return;
    }
    
    chatMessages.innerHTML = AppState.messages.map(message => {
        const messageClass = message.type === 'sent' ? 'sent' : 
                           message.type === 'system' ? 'system' : 'received';
        
        return `
            <div class="chat-message ${messageClass}">
                <div class="message-header">
                    <span class="message-sender">${message.sender}</span>
                    <span class="message-time">${chatApp.formatTime(message.timestamp)}</span>
                </div>
                <div class="message-text">${message.text}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    if (AppState.notifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="no-notifications">
                <div class="no-notifications-icon">🔔</div>
                <h3>No notifications yet</h3>
                <p>When you receive messages, they will appear here.</p>
            </div>
        `;
        return;
    }
    
    notificationsList.innerHTML = AppState.notifications.map(notification => `
        <div class="notification-item">
            <div class="notification-header">
                <span class="notification-sender">${notification.sender}</span>
                <span class="notification-time">${chatApp.formatTime(notification.timestamp)}</span>
            </div>
            <div class="notification-message">${notification.message}</div>
        </div>
    `).join('');
}

// Particle System
function initializeParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    console.log('Initializing particles...');
    
    for (let i = 0; i < 50; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (Math.random() * 3 + 3) * 1000);
}

// Tab Switching System
function initializeTabSwitching() {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const tabIndicator = document.getElementById('tabIndicator');

    if (!loginTab || !signupTab || !tabIndicator) {
        console.error('Tab elements not found');
        return;
    }

    loginTab.addEventListener('click', () => switchTab('login'));
    signupTab.addEventListener('click', () => switchTab('signup'));
    
    console.log('Tab switching initialized');
}

function switchTab(tabType) {
    console.log('Switching to tab:', tabType);
    
    if (AppState.currentTab === tabType) return;
    
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginPane = document.getElementById('loginPane');
    const signupPane = document.getElementById('signupPane');
    const tabIndicator = document.getElementById('tabIndicator');
    
    if (!loginTab || !signupTab || !loginPane || !signupPane || !tabIndicator) {
        console.error('Tab elements not found');
        return;
    }
    
    // Update tab buttons
    loginTab.classList.toggle('active', tabType === 'login');
    signupTab.classList.toggle('active', tabType === 'signup');
    
    // Move tab indicator
    tabIndicator.classList.toggle('signup', tabType === 'signup');
    
    // Switch panes with smooth transition
    loginPane.classList.toggle('active', tabType === 'login');
    signupPane.classList.toggle('active', tabType === 'signup');
    
    if (tabType === 'signup') {
        // Reset signup form to step 1
        AppState.currentStep = 1;
        showStep(1);
        updateProgressBar();
    }
    
    AppState.currentTab = tabType;
    console.log('Tab switched to:', tabType);
}

// Floating Labels Animation
function initializeFloatingLabels() {
    const inputs = document.querySelectorAll('.form-input');
    console.log('Initializing floating labels for', inputs.length, 'inputs');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            updateInputState(input);
        });
        
        input.addEventListener('input', () => {
            updateInputState(input);
            
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                hideValidationMessage(errorElement);
            }
            
            if (input.id === 'signupPassword') {
                updatePasswordStrength(input.value);
            }
        });
        
        updateInputState(input);
    });
}

function updateInputState(input) {
    if (input.value.trim() !== '') {
        input.classList.add('filled');
    } else {
        input.classList.remove('filled');
    }
}

// Password Toggle Functionality
function initializePasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle');
    console.log('Initializing password toggles for', toggles.length, 'toggles');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            const input = toggle.parentElement.querySelector('.form-input');
            const eyeIcon = toggle.querySelector('.eye-icon');
            
            if (!input || !eyeIcon) return;
            
            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.textContent = '🙈';
            } else {
                input.type = 'password';
                eyeIcon.textContent = '👁️';
            }
            
            toggle.style.transform = 'translateY(-50%) scale(1.2)';
            setTimeout(() => {
                toggle.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
        });
    });
}

// Password Strength Indicator
function initializePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });
        console.log('Password strength initialized');
    }
}

function updatePasswordStrength(password) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    const strength = calculatePasswordStrength(password);
    
    strengthFill.classList.remove('weak', 'medium', 'strong', 'very-strong');
    
    if (password.length === 0) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password strength';
        return;
    }
    
    switch (strength.level) {
        case 1:
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Weak password';
            break;
        case 2:
            strengthFill.classList.add('medium');
            strengthText.textContent = 'Medium password';
            break;
        case 3:
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Strong password';
            break;
        case 4:
            strengthFill.classList.add('very-strong');
            strengthText.textContent = 'Very strong password';
            break;
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    let level = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (score <= 2) level = 1;
    else if (score <= 3) level = 2;
    else if (score <= 4) level = 3;
    else level = 4;
    
    return { score, level };
}

// Role Selection
function initializeRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    console.log('Initializing role selection for', roleCards.length, 'roles');
    
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            AppState.selectedRole = card.dataset.role;
            
            const roleError = document.getElementById('roleError');
            if (roleError) {
                hideValidationMessage(roleError);
            }
            
            card.style.transform = 'translateY(-5px) scale(1.1)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1.05)';
            }, 200);
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
    
    // Step navigation
    const nextStep1 = document.getElementById('nextStep1');
    const nextStep2 = document.getElementById('nextStep2');
    const nextStep3 = document.getElementById('nextStep3');
    const backStep2 = document.getElementById('backStep2');
    const backStep3 = document.getElementById('backStep3');
    const backStep4 = document.getElementById('backStep4');
    
    if (nextStep1) nextStep1.addEventListener('click', () => handleStepNavigation(2));
    if (nextStep2) nextStep2.addEventListener('click', () => handleStepNavigation(3));
    if (nextStep3) nextStep3.addEventListener('click', () => handleStepNavigation(4));
    if (backStep2) backStep2.addEventListener('click', () => handleStepNavigation(1));
    if (backStep3) backStep3.addEventListener('click', () => handleStepNavigation(2));
    if (backStep4) backStep4.addEventListener('click', () => handleStepNavigation(3));
}

function handleLoginSubmit(e) {
  e.preventDefault();
  console.log('Login form submitted');
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const emailValid = validateEmail(email, 'loginEmailError');
  const passwordValid = validateRequired(password, 'loginPasswordError', 'Password is required');
  if (!emailValid || !passwordValid) {
    return;
  }
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
  showLoading('loginSubmit');
  document.getElementById('globalLoader').classList.add('visible'); // show loader

  setTimeout(() => {
    hideLoading('loginSubmit');
    document.getElementById('globalLoader').classList.remove('visible'); // hide loader
    showMessage('success', 'Login successful! Welcome back to the alumni network.');
    AppState.currentUser = {
      name: 'Demo User',
      email: email,
      role: 'alumni',
      graduationYear: 2020,
      major: 'Computer Science',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      bio: 'Software engineer passionate about building great products and helping fellow alumni succeed in their careers.'
    };
    switchToMainPlatform();
  }, 2000);
  } else {
    // Check persistent users and sample users
    const users = getStoredUsers();
    const allUsers = [...sampleUsers, ...users];
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
  showLoading('loginSubmit');
  document.getElementById('globalLoader').classList.add('visible'); // show loader

  setTimeout(() => {
    hideLoading('loginSubmit');
    document.getElementById('globalLoader').classList.remove('visible'); // hide loader
    showMessage('success', 'Login successful! Welcome back to the alumni network.');
    AppState.currentUser = user;
    switchToMainPlatform();
  }, 2000);
    } else {
      showMessage('error', 'Invalid credentials. Please try again.');
    }
  }
}

function handleSignupSubmit(e) {
  e.preventDefault();
  console.log('Signup form submitted');
  const roleValid = validateRole();
  const majorValid = validateRequired(document.getElementById('major').value, 'majorError', 'Please select your major');
  const yearValid = validateGraduationYear();
  if (!roleValid || !majorValid || !yearValid) {
    return;
  }
  showLoading('signupSubmit');
document.getElementById('globalLoader').classList.add('visible'); // show loader

setTimeout(() => {
  hideLoading('signupSubmit');
  showMessage('success', 'Account created successfully! Welcome to the alumni network.');

  const newUser = {
    id: Date.now(),
    name: document.getElementById('signupName').value,
    email: document.getElementById('signupEmail').value,
    role: AppState.selectedRole,
    graduationYear: document.getElementById('graduationYear').value,
    major: document.getElementById('major').value,
    company: document.getElementById('signupCompany').value,
    location: document.getElementById('signupLocation').value,
    bio: document.getElementById('signupBio').value,
    password: document.getElementById('signupPassword').value,
    profilePicture: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    status: "active"
  };

  const users = getStoredUsers();
  users.push(newUser);
  saveStoredUsers(users);
  
  // Add to sample users for immediate directory visibility
  sampleUsers.push(newUser);
  
  AppState.currentUser = newUser;

  setTimeout(() => {
    document.getElementById('globalLoader').classList.remove('visible'); // hide loader
    switchToMainPlatform();
  }, 1500);
}, 2000);
}

function handleStepNavigation(targetStep) {
    if (targetStep > AppState.currentStep) {
        if (!validateCurrentStep()) {
            return;
        }
    }
    
    AppState.currentStep = targetStep;
    showStep(targetStep);
    updateProgressBar();
}

function validateCurrentStep() {
    switch (AppState.currentStep) {
        case 1:
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            
            const nameValid = validateRequired(name, 'signupNameError', 'Full name is required');
            const emailValid = validateEmail(email, 'signupEmailError');
            
            return nameValid && emailValid;
            
        case 2:
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            const passwordValid = validatePassword(password);
            const confirmValid = validatePasswordConfirmation(password, confirmPassword);
            
            return passwordValid && confirmValid;
            
        case 3:
            const company = document.getElementById('signupCompany').value.trim();
            const location = document.getElementById('signupLocation').value.trim();
            const bio = document.getElementById('signupBio').value.trim();
            
            const companyValid = validateRequired(company, 'signupCompanyError', 'Company is required');
            const locationValid = validateRequired(location, 'signupLocationError', 'Location is required');
            const bioValid = validateRequired(bio, 'signupBioError', 'Bio is required');
            
            return companyValid && locationValid && bioValid;
            
        default:
            return true;
    }
}

// Validation Functions
function validateEmail(email, errorId) {
    const errorElement = document.getElementById(errorId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showValidationMessage(errorElement, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showValidationMessage(errorElement, 'Please enter a valid email address');
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function validateRequired(value, errorId, message) {
    const errorElement = document.getElementById(errorId);
    
    if (!value || !value.trim()) {
        showValidationMessage(errorElement, message);
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function validatePassword(password) {
    const errorElement = document.getElementById('signupPasswordError');
    
    if (!password) {
        showValidationMessage(errorElement, 'Password is required');
        return false;
    }
    
    if (password.length < 8) {
        showValidationMessage(errorElement, 'Password must be at least 8 characters long');
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function validatePasswordConfirmation(password, confirmPassword) {
    const errorElement = document.getElementById('confirmPasswordError');
    
    if (!confirmPassword) {
        showValidationMessage(errorElement, 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmPassword) {
        showValidationMessage(errorElement, 'Passwords do not match');
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function validateRole() {
    const errorElement = document.getElementById('roleError');
    
    if (!AppState.selectedRole) {
        showValidationMessage(errorElement, 'Please select your role');
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function validateGraduationYear() {
    const errorElement = document.getElementById('graduationYearError');
    const year = document.getElementById('graduationYear').value;
    const currentYear = new Date().getFullYear();
    
    if (!year) {
        showValidationMessage(errorElement, 'Graduation year is required');
        return false;
    }
    
    const yearNum = parseInt(year);
    if (yearNum < 1950 || yearNum > currentYear + 10) {
        showValidationMessage(errorElement, 'Please enter a valid graduation year');
        return false;
    }
    
    hideValidationMessage(errorElement);
    return true;
}

function showValidationMessage(element, message) {
    if (!element) return;
    
    element.textContent = message;
    element.classList.add('show', 'shake');
    
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

function hideValidationMessage(element) {
    if (!element) return;
    
    element.classList.remove('show');
    setTimeout(() => {
        element.textContent = '';
    }, 300);
}

// Signup Flow Management
function initializeSignupFlow() {
    showStep(1);
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    const targetStep = document.getElementById(`step${step}`);
    if (targetStep) {
        setTimeout(() => {
            targetStep.classList.add('active');
        }, 100);
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('signupProgress');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    const progress = (AppState.currentStep / 4) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Step ${AppState.currentStep} of 4`;
}

// Ripple Effects
function initializeRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRipple(button, e);
        });
    });
}

function createRipple(element, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Platform Navigation
function initializePlatformNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn[data-section]');
    const logoutBtn = document.getElementById('logoutBtn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // View all links
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-all-link')) {
            e.preventDefault();
            const section = e.target.dataset.section;
            if (section) {
                switchSection(section);
            }
        }
    });
}

function switchSection(sectionName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionName);
    });
    
    // Update sections
    document.querySelectorAll('.platform-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    AppState.currentSection = sectionName;
    
    // Load section data
    switch (sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'jobs':
            loadJobs();
            break;
        case 'directory':
            loadDirectory();
            break;
        case 'events':
            loadEvents();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'profile':
            loadProfile();
            break;
    }
}

function handleLogout() {
    showMessage('success', 'Logged out successfully. See you next time!');
    
    setTimeout(() => {
        AppState.currentUser = null;
        switchToAuthScreen();
        resetForms();
    }, 1500);
}

function switchToMainPlatform() {
    const authScreen = document.getElementById('authScreen');
    const mainPlatform = document.getElementById('mainPlatform');
    
    if (authScreen && mainPlatform) {
        authScreen.classList.add('hidden');
        mainPlatform.classList.remove('hidden');
        
        // Update user info
        const userName = document.getElementById('userName');
        const profileName = document.getElementById('profileName');
        const profileRole = document.getElementById('profileRole');
        const profileDetails = document.getElementById('profileDetails');
        const profileCompany = document.getElementById('profileCompany');
        const profileLocation = document.getElementById('profileLocation');
        const profileBio = document.getElementById('profileBio');
        
        if (userName && AppState.currentUser) {
            userName.textContent = AppState.currentUser.name;
        }
        
        if (profileName && AppState.currentUser) {
            profileName.textContent = AppState.currentUser.name;
        }
        
        if (profileRole && AppState.currentUser) {
            profileRole.textContent = AppState.currentUser.role.charAt(0).toUpperCase() + AppState.currentUser.role.slice(1);
        }
        
        if (profileDetails && AppState.currentUser) {
            profileDetails.textContent = `${AppState.currentUser.major} • Class of ${AppState.currentUser.graduationYear}`;
        }
        
        if (profileCompany && AppState.currentUser) {
            profileCompany.textContent = AppState.currentUser.company || 'Not specified';
        }
        
        if (profileLocation && AppState.currentUser) {
            profileLocation.textContent = AppState.currentUser.location || 'Not specified';
        }
        
        if (profileBio && AppState.currentUser) {
            profileBio.textContent = AppState.currentUser.bio || 'No bio available';
        }
        
        // Update edit form
        const editName = document.getElementById('editName');
        const editEmail = document.getElementById('editEmail');
        const editCompany = document.getElementById('editCompany');
        const editLocation = document.getElementById('editLocation');
        const editBio = document.getElementById('editBio');
        
        if (editName && AppState.currentUser) editName.value = AppState.currentUser.name;
        if (editEmail && AppState.currentUser) editEmail.value = AppState.currentUser.email;
        if (editCompany && AppState.currentUser) editCompany.value = AppState.currentUser.company || '';
        if (editLocation && AppState.currentUser) editLocation.value = AppState.currentUser.location || '';
        if (editBio && AppState.currentUser) editBio.value = AppState.currentUser.bio || '';
        
        // Show admin controls if user is admin
        updateAdminControls();
        
        // Load dashboard
        switchSection('dashboard');
    }
}

function updateAdminControls() {
    // Show/hide admin buttons based on user role
    const adminJobBtn = document.getElementById('adminJobBtn');
    const adminEventBtn = document.getElementById('adminEventBtn');
    
    if (AppState.currentUser && AppState.currentUser.role === 'admin') {
        if (adminJobBtn) adminJobBtn.style.display = 'block';
        if (adminEventBtn) adminEventBtn.style.display = 'block';
    } else {
        if (adminJobBtn) adminJobBtn.style.display = 'none';
        if (adminEventBtn) adminEventBtn.style.display = 'none';
    }
}

function switchToAuthScreen() {
    const authScreen = document.getElementById('authScreen');
    const mainPlatform = document.getElementById('mainPlatform');
    
    if (authScreen && mainPlatform) {
        authScreen.classList.remove('hidden');
        mainPlatform.classList.add('hidden');
        
        // Switch back to login tab
        switchTab('login');
    }
}

function resetForms() {
    // Reset login form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    
    // Reset signup form
    AppState.currentStep = 1;
    AppState.selectedRole = null;
    
    document.querySelectorAll('#signupForm .form-input').forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });
    
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    showStep(1);
    updateProgressBar();
}

// Jobs Section
function initializeJobsSection() {
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
    if (levelFilter) {
        levelFilter.addEventListener('change', filterJobs);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterJobs);
    }

    // Initialize admin job creation
    const adminJobBtn = document.getElementById('adminJobBtn');
    if (adminJobBtn) {
        adminJobBtn.addEventListener('click', showJobCreationModal);
    }

    const jobForm = document.getElementById('jobCreationForm');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobCreation);
    }
}

function loadJobs() {
    filterJobs();
}

function filterJobs() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const levelFilter = document.getElementById('levelFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    
    const jobs = getStoredJobs();
    AppState.filteredJobs = jobs.filter(job => {
        return (!categoryFilter || job.category === categoryFilter) &&
               (!levelFilter || job.experienceLevel === levelFilter) &&
               (!typeFilter || job.type === typeFilter);
    });
    
    renderJobs();
}

function renderJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;
    
    const isAdmin = AppState.currentUser && AppState.currentUser.role === 'admin';
    
    jobsGrid.innerHTML = AppState.filteredJobs.map(job => `
        <div class="job-card">
            ${isAdmin ? `
                <div class="job-admin-controls">
                    <button class="admin-control-btn remove-btn" onclick="showRemoveJobModal(${job.id})" title="Remove Job">
                        🗑️
                    </button>
                </div>
            ` : ''}
            <div class="job-header">
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <div class="job-company-info">${job.company} • ${job.location}</div>
                </div>
                <div class="job-meta">
                    <div class="job-salary">${job.salary}</div>
                    <span class="job-type">${job.type}</span>
                </div>
            </div>
            <p class="job-description">${job.description}</p>
            <p class="job-requirements"><strong>Requirements:</strong> ${job.requirements}</p>
            <div class="job-footer">
                <span class="job-posted">Posted by ${job.postedBy}</span>
            </div>
            <div class="card-actions">
                <button class="apply-btn" onclick="applyToJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function showJobCreationModal() {
    const modal = document.getElementById('jobCreationModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideJobCreationModal() {
    const modal = document.getElementById('jobCreationModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('jobCreationForm').reset();
    }
}

function handleJobCreation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newJob = {
        id: Date.now(),
        title: formData.get('jobTitle'),
        company: formData.get('jobCompany'),
        location: formData.get('jobLocation'),
        description: formData.get('jobDescription'),
        requirements: formData.get('jobRequirements'),
        salary: formData.get('jobSalary'),
        type: formData.get('jobType'),
        category: formData.get('jobCategory'),
        experienceLevel: formData.get('jobLevel'),
        benefits: formData.get('jobBenefits') || '',
        postedBy: AppState.currentUser.name,
        datePosted: new Date().toISOString().split('T')[0]
    };
    
    const jobs = getStoredJobs();
    jobs.unshift(newJob);
    saveStoredJobs(jobs);
    
    hideJobCreationModal();
    showMessage('success', 'Job posted successfully!');
    
    // Refresh jobs display
    filterJobs();
}

function applyToJob(jobId) {
    const jobs = getStoredJobs();
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        showMessage('success', `Applied to ${job.title} at ${job.company}! Good luck!`);
    }
}

// Job removal functions
function showRemoveJobModal(jobId) {
    const jobs = getStoredJobs();
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    AppState.selectedJobForRemoval = job;
    
    const modal = document.getElementById('removeJobModal');
    const jobRemoveInfo = document.getElementById('jobRemoveInfo');
    
    if (modal && jobRemoveInfo) {
        jobRemoveInfo.innerHTML = `
            <div class="remove-item-name">${job.title}</div>
            <div class="remove-item-details">
                ${job.company} • ${job.location}<br>
                Posted by: ${job.postedBy}
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function hideRemoveJobModal() {
    const modal = document.getElementById('removeJobModal');
    if (modal) {
        modal.style.display = 'none';
        AppState.selectedJobForRemoval = null;
    }
}

function confirmRemoveJob() {
    if (!AppState.selectedJobForRemoval) return;
    
    const jobs = getStoredJobs();
    const updatedJobs = jobs.filter(job => job.id !== AppState.selectedJobForRemoval.id);
    saveStoredJobs(updatedJobs);
    
    showMessage('success', `Job "${AppState.selectedJobForRemoval.title}" has been removed successfully.`);
    
    hideRemoveJobModal();
    filterJobs(); // Refresh the jobs display
}

// Events Section
function initializeEventsSection() {
    // Initialize admin event creation
    const adminEventBtn = document.getElementById('adminEventBtn');
    if (adminEventBtn) {
        adminEventBtn.addEventListener('click', showEventCreationModal);
    }

    const eventForm = document.getElementById('eventCreationForm');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventCreation);
    }
}

function loadEvents() {
    renderEvents();
}

function renderEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    const events = getStoredEvents();
    const isAdmin = AppState.currentUser && AppState.currentUser.role === 'admin';
    
    eventsGrid.innerHTML = events.map(event => `
        <div class="event-card">
            <div class="event-header">
                <div class="event-info">
                    <h3>${event.title}</h3>
                </div>
                <div class="event-meta">
                    <div class="event-date-display">${formatDate(event.date)}</div>
                    <div class="event-location">${event.location}</div>
                </div>
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-footer">
                <span class="event-attendees">${event.attendees} attending</span>
            </div>
            ${isAdmin ? `
                <div class="event-admin-controls">
                    <button class="admin-control-btn remove-btn" onclick="showRemoveEventModal(${event.id})" title="Remove Event">
                        🗑️
                    </button>
                </div>
            ` : ''}
            <div class="card-actions">
                <button class="join-btn" onclick="joinEvent('${event.title}')">Join Event</button>
            </div>
        </div>
    `).join('');
}

function showEventCreationModal() {
    const modal = document.getElementById('eventCreationModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideEventCreationModal() {
    const modal = document.getElementById('eventCreationModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('eventCreationForm').reset();
    }
}

function handleEventCreation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newEvent = {
        id: Date.now(),
        title: formData.get('eventTitle'),
        description: formData.get('eventDescription'),
        date: formData.get('eventDate'),
        location: formData.get('eventLocation'),
        category: formData.get('eventCategory'),
        isVirtual: formData.get('eventVirtual') === 'on',
        organizer: AppState.currentUser.name,
        attendees: 0
    };
    
    const events = getStoredEvents();
    events.unshift(newEvent);
    saveStoredEvents(events);
    
    hideEventCreationModal();
    showMessage('success', 'Event created successfully!');
    
    // Refresh events display
    renderEvents();
}

function joinEvent(eventTitle) {
    showMessage('success', `Registered for ${eventTitle}! Check your email for details.`);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Event removal functions
function showRemoveEventModal(eventId) {
    const events = getStoredEvents();
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    AppState.selectedEventForRemoval = event;
    
    const modal = document.getElementById('removeEventModal');
    const eventRemoveInfo = document.getElementById('eventRemoveInfo');
    
    if (modal && eventRemoveInfo) {
        eventRemoveInfo.innerHTML = `
            <div class="remove-item-name">${event.title}</div>
            <div class="remove-item-details">
                ${formatDate(event.date)} • ${event.location}<br>
                Organized by: ${event.organizer}
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function hideRemoveEventModal() {
    const modal = document.getElementById('removeEventModal');
    if (modal) {
        modal.style.display = 'none';
        AppState.selectedEventForRemoval = null;
    }
}

function confirmRemoveEvent() {
    if (!AppState.selectedEventForRemoval) return;
    
    const events = getStoredEvents();
    const updatedEvents = events.filter(event => event.id !== AppState.selectedEventForRemoval.id);
    saveStoredEvents(updatedEvents);
    
    showMessage('success', `Event "${AppState.selectedEventForRemoval.title}" has been removed successfully.`);
    
    hideRemoveEventModal();
    renderEvents(); // Refresh the events display
}

// Directory Section
function initializeDirectorySection() {
    const directorySearch = document.getElementById('directorySearch');
    const roleFilter = document.getElementById('roleFilter');
    
    if (directorySearch) {
        directorySearch.addEventListener('input', filterDirectory);
    }
    if (roleFilter) {
        roleFilter.addEventListener('change', filterDirectory);
    }
}

function loadDirectory() {
    filterDirectory();
}

function filterDirectory() {
    const searchTerm = document.getElementById('directorySearch')?.value.toLowerCase() || '';
    const roleFilter = document.getElementById('roleFilter')?.value || '';
    
    // Combine stored users with sample users
    const storedUsers = getStoredUsers();
    const allUsers = [...sampleUsers, ...storedUsers];
    
    AppState.filteredUsers = allUsers.filter(user => {
        const matchesSearch = !searchTerm || 
                             user.name.toLowerCase().includes(searchTerm) ||
                             (user.company && user.company.toLowerCase().includes(searchTerm)) ||
                             user.major.toLowerCase().includes(searchTerm);
        const matchesRole = !roleFilter || user.role === roleFilter;
        
        return matchesSearch && matchesRole && user.status === 'active';
    });
    
    renderDirectory();
}

function renderDirectory() {
    const directoryGrid = document.getElementById('directoryGrid');
    if (!directoryGrid) return;
    
    const isAdmin = AppState.currentUser && AppState.currentUser.role === 'admin';
    
    directoryGrid.innerHTML = AppState.filteredUsers.map(user => `
        <div class="directory-card">
            ${isAdmin ? `
                <div class="admin-controls">
                    <button class="admin-control-btn details-btn" onclick="showUserDetails(${user.id})" title="View Details">
                        👁️
                    </button>
                    <button class="admin-control-btn remove-btn" onclick="showRemoveUserModal(${user.id})" title="Remove User">
                        🗑️
                    </button>
                </div>
            ` : `
                <div class="admin-controls">
                    <button class="admin-control-btn details-btn" onclick="showUserDetails(${user.id})" title="View Details">
                        👁️
                    </button>
                </div>
            `}
            <img src="${user.profilePicture}" alt="${user.name}" class="directory-avatar">
            <h3 class="directory-name">${user.name}</h3>
            <span class="directory-role">${user.role}</span>
            <p class="directory-details">${user.major} • Class of ${user.graduationYear}</p>
            <p class="directory-bio">${user.bio}</p>
            <div class="card-actions">
                <button class="connect-btn" onclick="connectWithUser('${user.name}')">Connect</button>
            </div>
        </div>
    `).join('');
}

function connectWithUser(userName) {
    showMessage('success', `Connection request sent to ${userName}!`);
}

// User Details Modal Functions
function showUserDetails(userId) {
    const storedUsers = getStoredUsers();
    const allUsers = [...sampleUsers, ...storedUsers];
    const user = allUsers.find(u => u.id === userId);
    
    if (!user) return;
    
    const modal = document.getElementById('userDetailsModal');
    const userDetailsContent = document.getElementById('userDetailsContent');
    
    if (modal && userDetailsContent) {
        userDetailsContent.innerHTML = `
            <div class="user-details-header">
                <img src="${user.profilePicture}" alt="${user.name}" class="user-details-avatar">
                <div class="user-details-info">
                    <h3>${user.name}</h3>
                    <span class="user-details-role">${user.role}</span>
                    <p>${user.email}</p>
                </div>
            </div>
            
            <div class="user-details-section">
                <h4>Academic Information</h4>
                <div class="user-details-grid">
                    <div class="user-detail-item">
                        <div class="user-detail-label">Major</div>
                        <div class="user-detail-value">${user.major}</div>
                    </div>
                    <div class="user-detail-item">
                        <div class="user-detail-label">Graduation Year</div>
                        <div class="user-detail-value">${user.graduationYear}</div>
                    </div>
                </div>
            </div>
            
            <div class="user-details-section">
                <h4>Professional Information</h4>
                <div class="user-details-grid">
                    <div class="user-detail-item">
                        <div class="user-detail-label">Company</div>
                        <div class="user-detail-value">${user.company || 'Not specified'}</div>
                    </div>
                    <div class="user-detail-item">
                        <div class="user-detail-label">Location</div>
                        <div class="user-detail-value">${user.location || 'Not specified'}</div>
                    </div>
                </div>
            </div>
            
            <div class="user-details-section">
                <h4>About</h4>
                <div class="user-bio">${user.bio || 'No bio available'}</div>
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function hideUserDetailsModal() {
    const modal = document.getElementById('userDetailsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// User Removal Functions
function showRemoveUserModal(userId) {
    const storedUsers = getStoredUsers();
    const allUsers = [...sampleUsers, ...storedUsers];
    const user = allUsers.find(u => u.id === userId);
    
    if (!user) return;
    
    AppState.selectedUserForRemoval = user;
    
    const modal = document.getElementById('removeUserModal');
    const userRemoveInfo = document.getElementById('userRemoveInfo');
    
    if (modal && userRemoveInfo) {
        userRemoveInfo.innerHTML = `
            <div class="remove-item-name">${user.name}</div>
            <div class="remove-item-details">
                ${user.email}<br>
                ${user.role} • ${user.major} • Class of ${user.graduationYear}
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function hideRemoveUserModal() {
    const modal = document.getElementById('removeUserModal');
    if (modal) {
        modal.style.display = 'none';
        AppState.selectedUserForRemoval = null;
    }
}

function confirmRemoveUser() {
    if (!AppState.selectedUserForRemoval) return;
    
    const userId = AppState.selectedUserForRemoval.id;
    
    // Remove from stored users
    const storedUsers = getStoredUsers();
    const updatedStoredUsers = storedUsers.filter(user => user.id !== userId);
    saveStoredUsers(updatedStoredUsers);
    
    // Remove from sample users (for immediate UI update)
    const userIndex = sampleUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        sampleUsers.splice(userIndex, 1);
    }
    
    showMessage('success', `User "${AppState.selectedUserForRemoval.name}" has been removed successfully.`);
    
    hideRemoveUserModal();
    filterDirectory(); // Refresh the directory display
}

// Profile Section
function initializeProfileSection() {
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Update current user with form data
            if (AppState.currentUser) {
                AppState.currentUser.name = document.getElementById('editName').value;
                AppState.currentUser.email = document.getElementById('editEmail').value;
                AppState.currentUser.company = document.getElementById('editCompany').value;
                AppState.currentUser.location = document.getElementById('editLocation').value;
                AppState.currentUser.bio = document.getElementById('editBio').value;
                
                // Update stored users
                const users = getStoredUsers();
                const userIndex = users.findIndex(u => u.email === AppState.currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex] = { ...AppState.currentUser };
                    saveStoredUsers(users);
                }
                
                // Update sample users for immediate UI update
                const sampleUserIndex = sampleUsers.findIndex(u => u.id === AppState.currentUser.id);
                if (sampleUserIndex !== -1) {
                    sampleUsers[sampleUserIndex] = { ...AppState.currentUser };
                }
                
                // Update profile display
                switchToMainPlatform();
            }
            
            showMessage('success', 'Profile updated successfully!');
        });
    }
}

function loadProfile() {
    // Profile loads automatically with user data
}

function loadDashboard() {
    // Load recent jobs
    const recentJobs = document.getElementById('recentJobs');
    if (recentJobs) {
        const jobs = getStoredJobs();
        recentJobs.innerHTML = jobs.slice(0, 3).map(job => `
            <div class="job-item">
                <h4 class="job-title">${job.title}</h4>
                <p class="job-company">${job.company} • ${job.location}</p>
            </div>
        `).join('');
    }
    
    // Load upcoming events
    const upcomingEvents = document.getElementById('upcomingEvents');
    if (upcomingEvents) {
        const events = getStoredEvents();
        upcomingEvents.innerHTML = events.slice(0, 3).map(event => `
            <div class="event-item">
                <h4 class="event-title">${event.title}</h4>
                <p class="event-date">${formatDate(event.date)}</p>
            </div>
        `).join('');
    }

    // Update job count in dashboard
    const jobCountElement = document.querySelector('.stat-item .stat-value');
    if (jobCountElement) {
        const jobs = getStoredJobs();
        jobCountElement.textContent = jobs.length;
    }
}

// Loading States
function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.classList.add('loading');
    button.disabled = true;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (btnText) btnText.style.opacity = '0';
    if (btnLoader) btnLoader.classList.remove('hidden');
}

function hideLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.classList.remove('loading');
    button.disabled = false;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (btnText) btnText.style.opacity = '1';
    if (btnLoader) btnLoader.classList.add('hidden');
}

// Message System
function showMessage(type, text) {
    const messageElement = document.getElementById(type + 'Message');
    
    if (!messageElement) {
        console.error('Message element not found:', type + 'Message');
        return;
    }
    
    const messageText = messageElement.querySelector('.message-text');
    if (messageText) {
        messageText.textContent = text;
    }
    
    messageElement.classList.remove('hidden');
    
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideMessage(type);
    }, 5000);
}

function hideMessage(type) {
    const messageElement = document.getElementById(type + 'Message');
    if (!messageElement) return;
    
    messageElement.classList.remove('show');
    
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 500);
}

// Auto-fill demo credentials helper
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        
        if (loginEmail && loginPassword && AppState.currentTab === 'login') {
            loginEmail.value = DEMO_CREDENTIALS.email;
            loginPassword.value = DEMO_CREDENTIALS.password;
            loginEmail.classList.add('filled');
            loginPassword.classList.add('filled');
            
            showMessage('success', 'Demo credentials filled! (Ctrl+Shift+D)');
        }
    }
});

// Welcome message
setTimeout(() => {
    showMessage('success', 'Welcome to Alumni Network! Login to explore the platform with enhanced admin features for user management.');
}, 2000);