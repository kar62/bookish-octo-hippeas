// API Configuration
const API_BASE_URL = window.location.origin;
const API_USERS_ENDPOINT = `${API_BASE_URL}/api/users`;

// Global state
let allUsers = [];
let filteredUsers = [];

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorTextEl = document.getElementById('errorText');
const userListEl = document.getElementById('userList');
const noResultsEl = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    refreshBtn.addEventListener('click', loadUsers);
    searchInput.addEventListener('input', handleSearch);
}

// Load users from the API
async function loadUsers() {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(API_USERS_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allUsers = await response.json();
        filteredUsers = [...allUsers];
        
        hideLoading();
        displayUsers(filteredUsers);
        
    } catch (error) {
        console.error('Error loading users:', error);
        hideLoading();
        showError(`Failed to load users: ${error.message}`);
    }
}

// Display users in the grid
function displayUsers(users) {
    if (users.length === 0) {
        userListEl.innerHTML = '';
        noResultsEl.style.display = 'block';
        return;
    }
    
    noResultsEl.style.display = 'none';
    
    userListEl.innerHTML = users.map(user => createUserCard(user)).join('');
}

// Create a user card HTML
function createUserCard(user) {
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    
    return `
        <div class="user-card" data-user-id="${user.id}">
            <div class="user-header">
                <div class="user-avatar">${initials}</div>
                <div class="user-name">
                    <h3>${escapeHtml(user.firstName)} ${escapeHtml(user.lastName)}</h3>
                    <div class="user-id">ID: ${user.id}</div>
                </div>
            </div>
            <div class="user-details">
                <div class="user-detail">
                    <span class="detail-icon">📧</span>
                    <div class="detail-content">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${escapeHtml(user.email)}</div>
                    </div>
                </div>
                <div class="user-detail">
                    <span class="detail-icon">📱</span>
                    <div class="detail-content">
                        <div class="detail-label">Phone</div>
                        <div class="detail-value">${escapeHtml(user.phone)}</div>
                    </div>
                </div>
                <div class="user-detail">
                    <span class="detail-icon">📍</span>
                    <div class="detail-content">
                        <div class="detail-label">Address</div>
                        <div class="detail-value">${escapeHtml(user.address)}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Handle search/filter
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredUsers = [...allUsers];
    } else {
        filteredUsers = allUsers.filter(user => {
            return (
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.phone.includes(searchTerm) ||
                user.address.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    displayUsers(filteredUsers);
}

// Show loading state
function showLoading() {
    loadingEl.style.display = 'block';
    userListEl.innerHTML = '';
    noResultsEl.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loadingEl.style.display = 'none';
}

// Show error message
function showError(message) {
    errorTextEl.textContent = message;
    errorEl.style.display = 'flex';
}

// Hide error message
function hideError() {
    errorEl.style.display = 'none';
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
