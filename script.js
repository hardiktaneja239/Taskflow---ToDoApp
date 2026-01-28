// ========================================
// Task Manager Application
// Main JavaScript File
// ========================================

// ========================================
// State Management
// ========================================
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;

// ========================================
// DOM Elements
// ========================================
const elements = {
    // Task Modal
    taskModal: document.getElementById('taskModal'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    taskForm: document.getElementById('taskForm'),
    modalTitle: document.getElementById('modalTitle'),
    submitBtn: document.getElementById('submitBtn'),
    
    // Form Inputs
    taskTitle: document.getElementById('taskTitle'),
    taskDescription: document.getElementById('taskDescription'),
    taskPriority: document.getElementById('taskPriority'),
    
    // Help Modal
    helpModal: document.getElementById('helpModal'),
    helpBtn: document.getElementById('helpBtn'),
    closeHelpBtn: document.getElementById('closeHelpBtn'),
    
    // Tasks Display
    tasksList: document.getElementById('tasksList'),
    emptyState: document.getElementById('emptyState'),
    
    // Stats
    totalTasks: document.getElementById('totalTasks'),
    activeTasks: document.getElementById('activeTasks'),
    completedTasks: document.getElementById('completedTasks'),
    
    // Filters
    filterTabs: document.querySelectorAll('.filter-tab'),
    
    // Quick Actions
    clearCompletedBtn: document.getElementById('clearCompletedBtn')
};

// ========================================
// Local Storage Functions
// ========================================
const storage = {
    save: function() {
        try {
            localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            alert('Failed to save tasks. Your storage might be full.');
        }
    },
    
    load: function() {
        try {
            const data = localStorage.getItem('taskflow_tasks');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    },
    
    clear: function() {
        try {
            localStorage.removeItem('taskflow_tasks');
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

// ========================================
// Task Functions
// ========================================
const taskManager = {
    // Generate unique ID for tasks
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Add new task
    add: function(title, description, priority) {
        const task = {
            id: this.generateId(),
            title: title.trim(),
            description: description.trim(),
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.unshift(task); // Add to beginning
        storage.save();
        ui.render();
        return task;
    },
    
    // Update existing task
    update: function(id, updates) {
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
            storage.save();
            ui.render();
            return true;
        }
        return false;
    },
    
    // Delete task
    delete: function(id) {
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            storage.save();
            ui.render();
            return true;
        }
        return false;
    },
    
    // Toggle task completion
    toggle: function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            storage.save();
            ui.render();
            return true;
        }
        return false;
    },
    
    // Clear all completed tasks
    clearCompleted: function() {
        const completedCount = tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        
        if (confirm(`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            tasks = tasks.filter(t => !t.completed);
            storage.save();
            ui.render();
        }
    },
    
    // Get filtered tasks
    getFiltered: function(filter = 'all') {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.completed);
            case 'completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    },
    
    // Get statistics
    getStats: function() {
        return {
            total: tasks.length,
            active: tasks.filter(t => !t.completed).length,
            completed: tasks.filter(t => t.completed).length
        };
    }
};

// ========================================
// UI Functions
// ========================================
const ui = {
    // Render all tasks
    render: function() {
        const filteredTasks = taskManager.getFiltered(currentFilter);
        
        // Update stats
        this.updateStats();
        
        // Clear current list
        elements.tasksList.innerHTML = '';
        
        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Render each task
        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            elements.tasksList.appendChild(taskElement);
        });
    },
    
    // Create task element
    createTaskElement: function(task) {
        const div = document.createElement('div');
        div.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;
        div.dataset.taskId = task.id;
        
        div.innerHTML = `
            <div class="task-checkbox" data-action="toggle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            
            <div class="task-content">
                <div class="task-title">${this.escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="task-priority-badge ${task.priority}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                </div>
            </div>
            
            <div class="task-actions">
                <button class="task-action-btn edit" data-action="edit" aria-label="Edit task">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="task-action-btn delete" data-action="delete" aria-label="Delete task">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `;
        
        return div;
    },
    
    // Show empty state
    showEmptyState: function() {
        const message = currentFilter === 'all' 
            ? 'No tasks yet' 
            : currentFilter === 'active'
            ? 'No active tasks'
            : 'No completed tasks';
            
        const description = currentFilter === 'all'
            ? 'Start your productive journey by adding your first task'
            : currentFilter === 'active'
            ? 'All tasks are completed! Great job!'
            : 'Complete some tasks to see them here';
        
        elements.tasksList.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <h3>${message}</h3>
                <p>${description}</p>
            </div>
        `;
    },
    
    // Update statistics
    updateStats: function() {
        const stats = taskManager.getStats();
        elements.totalTasks.textContent = stats.total;
        elements.activeTasks.textContent = stats.active;
        elements.completedTasks.textContent = stats.completed;
    },
    
    // Escape HTML to prevent XSS
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// ========================================
// Modal Functions
// ========================================
const modal = {
    // Open add task modal
    openAdd: function() {
        editingTaskId = null;
        elements.modalTitle.textContent = 'Add New Task';
        elements.submitBtn.textContent = 'Add Task';
        elements.taskForm.reset();
        elements.taskModal.classList.add('active');
        elements.taskTitle.focus();
    },
    
    // Open edit task modal
    openEdit: function(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        editingTaskId = taskId;
        elements.modalTitle.textContent = 'Edit Task';
        elements.submitBtn.textContent = 'Save Changes';
        
        elements.taskTitle.value = task.title;
        elements.taskDescription.value = task.description;
        elements.taskPriority.value = task.priority;
        
        elements.taskModal.classList.add('active');
        elements.taskTitle.focus();
    },
    
    // Close task modal
    close: function() {
        elements.taskModal.classList.remove('active');
        elements.taskForm.reset();
        editingTaskId = null;
    },
    
    // Open help modal
    openHelp: function() {
        elements.helpModal.classList.add('active');
    },
    
    // Close help modal
    closeHelp: function() {
        elements.helpModal.classList.remove('active');
    }
};

// ========================================
// Accordion Functions (Help Modal - Project 2)
// ========================================
const accordion = {
    init: function() {
        const headers = document.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.getAttribute('data-accordion-target');
                const content = document.getElementById(targetId);
                const isActive = header.classList.contains('active');
                
                // Close all accordions
                document.querySelectorAll('.accordion-header').forEach(h => {
                    h.classList.remove('active');
                });
                document.querySelectorAll('.accordion-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Open clicked accordion if it wasn't active
                if (!isActive) {
                    header.classList.add('active');
                    content.classList.add('active');
                }
            });
        });
    }
};

// ========================================
// Event Handlers
// ========================================
const events = {
    // Initialize all event listeners
    init: function() {
        // Modal controls
        elements.addTaskBtn.addEventListener('click', () => modal.openAdd());
        elements.closeModalBtn.addEventListener('click', () => modal.close());
        elements.cancelBtn.addEventListener('click', () => modal.close());
        
        // Help modal
        elements.helpBtn.addEventListener('click', () => modal.openHelp());
        elements.closeHelpBtn.addEventListener('click', () => modal.closeHelp());
        
        // Close modal on overlay click
        elements.taskModal.addEventListener('click', (e) => {
            if (e.target === elements.taskModal) {
                modal.close();
            }
        });
        
        elements.helpModal.addEventListener('click', (e) => {
            if (e.target === elements.helpModal) {
                modal.closeHelp();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape to close modals
            if (e.key === 'Escape') {
                modal.close();
                modal.closeHelp();
            }
            
            // Ctrl/Cmd + N to add new task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                modal.openAdd();
            }
        });
        
        // Form submission
        elements.taskForm.addEventListener('submit', this.handleFormSubmit);
        
        // Filter tabs
        elements.filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                elements.filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update filter and render
                currentFilter = tab.dataset.filter;
                ui.render();
            });
        });
        
        // Task list event delegation
        elements.tasksList.addEventListener('click', this.handleTaskClick);
        
        // Clear completed button
        elements.clearCompletedBtn.addEventListener('click', () => {
            taskManager.clearCompleted();
        });
    },
    
    // Handle form submission
    handleFormSubmit: function(e) {
        e.preventDefault();
        
        const title = elements.taskTitle.value.trim();
        const description = elements.taskDescription.value.trim();
        const priority = elements.taskPriority.value;
        
        if (!title) {
            alert('Please enter a task title');
            elements.taskTitle.focus();
            return;
        }
        
        if (editingTaskId) {
            // Update existing task
            taskManager.update(editingTaskId, {
                title,
                description,
                priority
            });
        } else {
            // Add new task
            taskManager.add(title, description, priority);
        }
        
        modal.close();
    },
    
    // Handle task list clicks (event delegation)
    handleTaskClick: function(e) {
        const button = e.target.closest('[data-action]');
        if (!button) return;
        
        const taskElement = button.closest('.task-item');
        const taskId = taskElement.dataset.taskId;
        const action = button.dataset.action;
        
        switch (action) {
            case 'toggle':
                taskManager.toggle(taskId);
                break;
                
            case 'edit':
                modal.openEdit(taskId);
                break;
                
            case 'delete':
                const task = tasks.find(t => t.id === taskId);
                if (confirm(`Delete task: "${task.title}"?`)) {
                    taskManager.delete(taskId);
                }
                break;
        }
    }
};

// ========================================
// Initialization
// ========================================
function init() {
    // Load tasks from localStorage
    tasks = storage.load();
    
    // Initialize UI
    ui.render();
    
    // Initialize event listeners
    events.init();
    
    // Initialize accordion
    accordion.init();
    
    console.log('✦ TaskFlow initialized successfully');
    console.log(`Loaded ${tasks.length} task${tasks.length !== 1 ? 's' : ''} from storage`);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// Export for potential module use
// ========================================
window.TaskFlow = {
    tasks,
    taskManager,
    ui,
    modal,
    storage
};
