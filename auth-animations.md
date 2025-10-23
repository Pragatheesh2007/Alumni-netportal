# Enhanced Login & Sign Up Animations for Alumni Networking Platform

This file contains advanced CSS animations and JavaScript enhancements for the login and sign up pages to create a modern, engaging user experience.

## 🎨 Animation Features

- **Smooth form transitions** between login and signup
- **Floating label animations** for input fields
- **Micro-interactions** for buttons and form elements
- **Loading animations** during authentication
- **Success/error feedback** with animated notifications
- **Background gradient animations**
- **Card flip effects** for form switching
- **Particle background effects**

---

## 1. Enhanced CSS Animations (Add to style.css)

```css
/* ========================================
   LOGIN & SIGNUP PAGE ANIMATIONS
   ======================================== */

/* Animated Background */
.auth-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: -1;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(1) {
  width: 20px;
  height: 20px;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 6s;
}

.particle:nth-child(2) {
  width: 15px;
  height: 15px;
  left: 20%;
  animation-delay: 2s;
  animation-duration: 8s;
}

.particle:nth-child(3) {
  width: 25px;
  height: 25px;
  left: 70%;
  animation-delay: 4s;
  animation-duration: 7s;
}

.particle:nth-child(4) {
  width: 18px;
  height: 18px;
  left: 80%;
  animation-delay: 1s;
  animation-duration: 9s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Enhanced Auth Container */
.auth-container {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInFromBottom 0.8s ease-out;
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Form Flip Animation */
.auth-forms {
  position: relative;
  width: 100%;
  height: 500px;
  perspective: 1000px;
}

.form-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.form-wrapper.flipped {
  transform: rotateY(180deg);
}

.login-form, .signup-form {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px;
  backface-visibility: hidden;
}

.signup-form {
  transform: rotateY(180deg);
}

/* Floating Label Animation */
.floating-label {
  position: relative;
  margin-bottom: 25px;
}

.floating-label input {
  width: 100%;
  padding: 15px 0 10px 0;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  background: transparent;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
}

.floating-label label {
  position: absolute;
  top: 15px;
  left: 0;
  font-size: 16px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.floating-label input:focus,
.floating-label input:valid {
  border-bottom-color: #667eea;
}

.floating-label input:focus + label,
.floating-label input:valid + label {
  top: -5px;
  font-size: 12px;
  color: #667eea;
  font-weight: 600;
}

/* Animated Button */
.btn-animated {
  position: relative;
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-animated:hover::before {
  left: 100%;
}

.btn-animated:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-animated:active {
  transform: translateY(0);
}

/* Loading Animation */
.btn-loading {
  position: relative;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Role Selection Animation */
.role-selector {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.role-option {
  flex: 1;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.role-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.role-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.role-option.selected {
  border-color: #667eea;
  color: white;
}

.role-option.selected::before {
  opacity: 1;
}

/* Success/Error Messages Animation */
.message {
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(-20px);
  animation: messageSlideIn 0.5s ease forwards;
}

.message.success {
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
}

.message.error {
  background: linear-gradient(45deg, #f44336, #d32f2f);
  color: white;
}

@keyframes messageSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Toggle Animation */
.form-toggle {
  text-align: center;
  margin-top: 30px;
  position: relative;
}

.toggle-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.toggle-link:hover::after {
  width: 100%;
}

/* Checkbox Animation */
.checkbox-wrapper {
  position: relative;
  display: inline-block;
  margin: 20px 0;
}

.checkbox-wrapper input[type="checkbox"] {
  opacity: 0;
  position: absolute;
}

.checkbox-custom {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.2s ease;
}

.checkbox-wrapper input[type="checkbox"]:checked + .checkbox-custom {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-wrapper input[type="checkbox"]:checked + .checkbox-custom::after {
  transform: rotate(45deg) scale(1);
}

/* Progress Bar Animation */
.progress-bar {
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  width: 0;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  animation: progressMove 2s linear infinite;
}

@keyframes progressMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

/* Social Login Buttons */
.social-login {
  margin: 30px 0;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 50px;
  background: white;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.social-btn:hover::before {
  left: 100%;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-btn.google {
  border-color: #db4437;
}

.social-btn.linkedin {
  border-color: #0077b5;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .auth-container {
    margin: 20px;
    border-radius: 15px;
  }
  
  .login-form, .signup-form {
    padding: 30px 20px;
  }
  
  .role-selector {
    flex-direction: column;
  }
  
  .floating-label input {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

/* Dark Theme Support */
@media (prefers-color-scheme: dark) {
  .auth-container {
    background: rgba(30, 30, 30, 0.95);
    color: white;
  }
  
  .floating-label input {
    color: white;
    border-bottom-color: #555;
  }
  
  .floating-label label {
    color: #ccc;
  }
  
  .role-option {
    border-color: #555;
    background: rgba(255, 255, 255, 0.05);
  }
}
```

---

## 2. Enhanced JavaScript Animations (Add to app.js)

```javascript
// ========================================
// ENHANCED LOGIN & SIGNUP ANIMATIONS
// ========================================

// Initialize particles background
function initParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 6) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Enhanced form switching with flip animation
function switchToSignup() {
  const formWrapper = document.querySelector('.form-wrapper');
  const container = document.querySelector('.auth-container');
  
  // Add flip animation
  formWrapper.classList.add('flipped');
  
  // Update container height
  setTimeout(() => {
    container.style.height = 'auto';
  }, 400);
  
  // Reset form
  document.getElementById('signupForm').reset();
  clearMessages();
}

function switchToLogin() {
  const formWrapper = document.querySelector('.form-wrapper');
  
  // Remove flip animation
  formWrapper.classList.remove('flipped');
  
  // Reset form
  document.getElementById('loginForm').reset();
  clearMessages();
}

// Floating label animation
function initFloatingLabels() {
  const inputs = document.querySelectorAll('.floating-label input');
  
  inputs.forEach(input => {
    // Check if input has value on page load
    if (input.value) {
      input.classList.add('has-value');
    }
    
    input.addEventListener('input', function() {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
    
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
}

// Role selection animation
function selectRole(role, element) {
  // Remove selection from all options
  document.querySelectorAll('.role-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Add selection to clicked option
  element.classList.add('selected');
  
  // Update hidden input value
  document.getElementById('selectedRole').value = role;
  
  // Add ripple effect
  createRipple(element, event);
}

// Create ripple effect
function createRipple(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Enhanced login function with animations
async function enhancedLogin() {
  const form = document.getElementById('loginForm');
  const button = form.querySelector('.btn-animated');
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  
  if (!email || !password) {
    showAnimatedMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Start loading animation
  button.classList.add('btn-loading');
  button.disabled = true;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Find user in sample data
  const user = sampleUsers.find(u => u.email === email);
  
  if (user && password === 'password123') {
    showAnimatedMessage('Login successful! Redirecting...', 'success');
    updateProgressBar(100);
    
    setTimeout(() => {
      currentUser = user;
      updateAuthState();
      showDashboard();
      playSuccessAnimation();
    }, 1000);
  } else {
    showAnimatedMessage('Invalid email or password', 'error');
    shakeForm();
  }
  
  // Stop loading animation
  button.classList.remove('btn-loading');
  button.disabled = false;
}

// Enhanced signup function with animations
async function enhancedSignup() {
  const form = document.getElementById('signupForm');
  const button = form.querySelector('.btn-animated');
  const formData = new FormData(form);
  
  // Validate form
  if (!validateSignupForm(formData)) {
    return;
  }
  
  // Start loading animation
  button.classList.add('btn-loading');
  button.disabled = true;
  
  // Simulate API call with progress updates
  await simulateSignupProgress();
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
    graduationYear: parseInt(formData.get('graduationYear')),
    major: formData.get('major'),
    company: '',
    location: '',
    bio: '',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'active'
  };
  
  users.push(newUser);
  showAnimatedMessage('Account created successfully! Logging you in...', 'success');
  
  setTimeout(() => {
    currentUser = newUser;
    updateAuthState();
    showDashboard();
    playSuccessAnimation();
  }, 1000);
  
  // Stop loading animation
  button.classList.remove('btn-loading');
  button.disabled = false;
}

// Simulate signup progress
async function simulateSignupProgress() {
  const progressSteps = [
    { progress: 25, message: 'Validating information...' },
    { progress: 50, message: 'Creating account...' },
    { progress: 75, message: 'Setting up profile...' },
    { progress: 100, message: 'Finalizing...' }
  ];
  
  for (const step of progressSteps) {
    await new Promise(resolve => setTimeout(resolve, 500));
    updateProgressBar(step.progress);
    showAnimatedMessage(step.message, 'info');
  }
}

// Update progress bar
function updateProgressBar(percentage) {
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    progressFill.style.width = percentage + '%';
  }
}

// Show animated message
function showAnimatedMessage(text, type = 'info') {
  clearMessages();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  
  const container = document.querySelector('.login-form.active, .signup-form.active') || 
                   document.querySelector('.login-form, .signup-form');
  
  container.insertBefore(messageDiv, container.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.animation = 'messageSlideOut 0.5s ease forwards';
      setTimeout(() => messageDiv.remove(), 500);
    }
  }, 5000);
}

// Clear all messages
function clearMessages() {
  document.querySelectorAll('.message').forEach(msg => msg.remove());
}

// Shake form animation for errors
function shakeForm() {
  const container = document.querySelector('.auth-container');
  container.style.animation = 'shake 0.5s ease-in-out';
  
  setTimeout(() => {
    container.style.animation = '';
  }, 500);
}

// Add shake keyframes to CSS
const shakeCSS = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Success animation
function playSuccessAnimation() {
  const container = document.querySelector('.auth-container');
  container.style.animation = 'pulse 0.6s ease-in-out';
  
  // Create success checkmark
  const checkmark = document.createElement('div');
  checkmark.innerHTML = '✓';
  checkmark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    font-size: 100px;
    color: #4CAF50;
    z-index: 1000;
    animation: checkmarkPop 0.8s ease-out forwards;
  `;
  
  document.body.appendChild(checkmark);
  
  setTimeout(() => {
    checkmark.remove();
    container.style.animation = '';
  }, 800);
}

// Form validation with visual feedback
function validateSignupForm(formData) {
  const fields = ['name', 'email', 'password', 'confirmPassword', 'role', 'graduationYear', 'major'];
  let isValid = true;
  
  fields.forEach(field => {
    const input = document.querySelector(`input[name="${field}"], select[name="${field}"]`);
    const value = formData.get(field);
    
    if (!value || value.trim() === '') {
      highlightError(input, `${field} is required`);
      isValid = false;
    } else {
      clearError(input);
    }
  });
  
  // Password confirmation check
  if (formData.get('password') !== formData.get('confirmPassword')) {
    const confirmInput = document.querySelector('input[name="confirmPassword"]');
    highlightError(confirmInput, 'Passwords do not match');
    isValid = false;
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.get('email'))) {
    const emailInput = document.querySelector('input[name="email"]');
    highlightError(emailInput, 'Please enter a valid email address');
    isValid = false;
  }
  
  return isValid;
}

// Highlight field errors
function highlightError(input, message) {
  input.style.borderBottomColor = '#f44336';
  input.classList.add('error');
  
  // Remove existing error message
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #f44336;
    font-size: 12px;
    margin-top: 5px;
    animation: fadeIn 0.3s ease;
  `;
  
  input.parentElement.appendChild(errorDiv);
}

// Clear field errors
function clearError(input) {
  input.style.borderBottomColor = '';
  input.classList.remove('error');
  
  const errorMessage = input.parentElement.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add background
  document.body.insertAdjacentHTML('afterbegin', '<div class="auth-background"></div>');
  
  // Initialize particles
  initParticles();
  
  // Initialize floating labels
  initFloatingLabels();
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = shakeCSS + `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes checkmarkPop {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes messageSlideOut {
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: rippleEffect 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

// Password strength indicator
function checkPasswordStrength(password) {
  const strength = {
    score: 0,
    feedback: []
  };
  
  if (password.length >= 8) strength.score += 25;
  else strength.feedback.push('At least 8 characters');
  
  if (/[a-z]/.test(password)) strength.score += 25;
  else strength.feedback.push('Lowercase letter');
  
  if (/[A-Z]/.test(password)) strength.score += 25;
  else strength.feedback.push('Uppercase letter');
  
  if (/[0-9]/.test(password)) strength.score += 25;
  else strength.feedback.push('Number');
  
  return strength;
}

// Add password strength indicator to forms
function addPasswordStrengthIndicator() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  passwordInputs.forEach(input => {
    if (input.name === 'password') {
      const indicator = document.createElement('div');
      indicator.className = 'password-strength';
      indicator.innerHTML = `
        <div class="strength-bar">
          <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Password strength</div>
      `;
      
      input.parentElement.appendChild(indicator);
      
      input.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        const fill = indicator.querySelector('.strength-fill');
        const text = indicator.querySelector('.strength-text');
        
        fill.style.width = strength.score + '%';
        
        if (strength.score < 50) {
          fill.style.background = '#f44336';
          text.textContent = 'Weak password';
        } else if (strength.score < 75) {
          fill.style.background = '#ff9800';
          text.textContent = 'Medium password';
        } else {
          fill.style.background = '#4caf50';
          text.textContent = 'Strong password';
        }
      });
    }
  });
}
```

---

## 3. Enhanced HTML Structure

```html
<!-- Enhanced Login/Signup Section -->
<section class="page" id="authPage">
  <div class="auth-background"></div>
  <div class="particles"></div>
  
  <div class="container">
    <div class="auth-container">
      <div class="auth-forms">
        <div class="form-wrapper">
          <!-- Login Form -->
          <form class="login-form" id="loginForm">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
            
            <div class="floating-label">
              <input type="email" name="email" required>
              <label>Email Address</label>
            </div>
            
            <div class="floating-label">
              <input type="password" name="password" required>
              <label>Password</label>
            </div>
            
            <div class="checkbox-wrapper">
              <input type="checkbox" id="rememberMe">
              <span class="checkbox-custom"></span>
              <label for="rememberMe">Remember me</label>
            </div>
            
            <button type="button" class="btn-animated" onclick="enhancedLogin()">
              Sign In
            </button>
            
            <div class="social-login">
              <a href="#" class="social-btn google">
                Continue with Google
              </a>
              <a href="#" class="social-btn linkedin">
                Continue with LinkedIn
              </a>
            </div>
            
            <div class="form-toggle">
              Don't have an account? 
              <a href="#" class="toggle-link" onclick="switchToSignup()">Sign up</a>
            </div>
          </form>
          
          <!-- Signup Form -->
          <form class="signup-form" id="signupForm">
            <h2>Join Our Community</h2>
            <p>Create your alumni account</p>
            
            <div class="floating-label">
              <input type="text" name="name" required>
              <label>Full Name</label>
            </div>
            
            <div class="floating-label">
              <input type="email" name="email" required>
              <label>Email Address</label>
            </div>
            
            <div class="floating-label">
              <input type="password" name="password" required>
              <label>Password</label>
            </div>
            
            <div class="floating-label">
              <input type="password" name="confirmPassword" required>
              <label>Confirm Password</label>
            </div>
            
            <div class="role-selector">
              <div class="role-option" onclick="selectRole('student', this)">
                <h4>Student</h4>
                <p>Current student</p>
              </div>
              <div class="role-option" onclick="selectRole('alumni', this)">
                <h4>Alumni</h4>
                <p>Graduate</p>
              </div>
            </div>
            
            <input type="hidden" name="role" id="selectedRole">
            
            <div class="floating-label">
              <input type="number" name="graduationYear" min="1950" max="2030" required>
              <label>Graduation Year</label>
            </div>
            
            <div class="floating-label">
              <input type="text" name="major" required>
              <label>Major/Field of Study</label>
            </div>
            
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            
            <button type="button" class="btn-animated" onclick="enhancedSignup()">
              Create Account
            </button>
            
            <div class="form-toggle">
              Already have an account? 
              <a href="#" class="toggle-link" onclick="switchToLogin()">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 🎯 Implementation Instructions

1. **Add the CSS animations** to your existing `style.css` file
2. **Add the JavaScript functions** to your existing `app.js` file
3. **Update your HTML structure** with the enhanced form elements
4. **Test the animations** in different browsers and devices

## ✨ Animation Features

- **Smooth transitions** between login and signup forms
- **Floating label animations** for better UX
- **Real-time form validation** with visual feedback
- **Loading states** with progress indicators
- **Success/error animations** for user feedback
- **Password strength meter** for security
- **Particle background effects** for visual appeal
- **Mobile-responsive** animations

These animations will make your alumni networking platform feel modern, professional, and engaging while maintaining excellent usability across all devices!