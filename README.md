# TaskFlow - Smart Task Manager

![TaskFlow](https://img.shields.io/badge/Project-TaskFlow-e07a5f)
![Status](https://img.shields.io/badge/Status-Complete-2a9d8f)
![License](https://img.shields.io/badge/License-MIT-blue)

A beautiful, feature-rich task management web application built with vanilla HTML, CSS, and JavaScript. Created as part of the SyntecxHub Frontend Development Internship.

## ✨ Features

### Core Functionality (Project 1 - To-Do List)
- ✅ **Add, Edit, Delete Tasks** - Full CRUD operations
- ✅ **Mark as Complete** - Toggle task completion status
- ✅ **Persistent Storage** - Tasks saved to localStorage
- ✅ **Priority Levels** - High, Medium, Low priority indicators
- ✅ **Task Descriptions** - Optional detailed descriptions

### Enhanced UI (Project 3 - Modal/Popup)
- 🎨 **Modal Interactions** - Smooth modal popups for adding/editing tasks
- ⚡ **Smooth Animations** - CSS transitions and animations throughout
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎯 **Clean Design** - Modern, professional aesthetic

### Help System (Project 2 - FAQ Accordion)
- ❓ **Interactive Help** - Accordion-style FAQ section
- 📚 **User Guide** - Complete instructions on how to use the app
- 🔄 **Smooth Transitions** - Animated accordion open/close

### Additional Features
- 📊 **Live Statistics** - Total, Active, and Completed task counts
- 🔍 **Filter System** - View All, Active, or Completed tasks
- ⌨️ **Keyboard Shortcuts** - Ctrl/Cmd+N to add task, Esc to close modals
- 🗑️ **Bulk Actions** - Clear all completed tasks at once
- 🎨 **Beautiful Empty States** - Helpful messages when no tasks exist
- ♿ **Accessible** - Proper ARIA labels and keyboard navigation

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **localStorage API** - Client-side data persistence
- **Google Fonts** - Manrope & Fraunces typography

## 🎨 Design Approach

**Aesthetic**: "Zen Productivity" - Clean, calm, and focused
- **Typography**: Fraunces (display) + Manrope (body)
- **Color Palette**: Warm, inviting colors with terracotta accent
- **Animations**: Smooth, purposeful micro-interactions
- **Layout**: Generous spacing with clear visual hierarchy

## 📁 Project Structure

```
taskflow/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling with CSS variables
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Installation

1. **Download the files**
   - Download all three files: `index.html`, `style.css`, `script.js`

2. **Open in browser**
   ```bash
   # Simply open index.html in any modern browser
   # Or use a local server (recommended):
   
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Start using!**
   - No build process, no dependencies, just open and use

## 💡 How to Use

### Adding a Task
1. Click the **"Add New Task"** button
2. Enter your task title (required)
3. Optionally add a description and set priority
4. Click **"Add Task"**

### Completing a Task
- Click the checkbox icon on the left of any task
- Task will get a strikethrough and move to completed state

### Editing a Task
1. Click the pencil (edit) icon on the task
2. Update the details in the modal
3. Click **"Save Changes"**

### Deleting a Task
- Click the trash icon on the task
- Confirm the deletion

### Filtering Tasks
- Use the **All Tasks**, **Active**, or **Completed** tabs to filter your view

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - Add new task
- `Esc` - Close any open modal

## 🎯 Project Integration

This project successfully integrates all three assigned projects:

| Project | Integration |
|---------|------------|
| **Project 1** - To-Do List | Core functionality - all CRUD operations, localStorage |
| **Project 2** - FAQ Accordion | Help modal with collapsible FAQ sections |
| **Project 3** - Modal/Popup | Task add/edit modal system with overlay |

## 🧠 Code Architecture

### State Management
```javascript
let tasks = [];              // Main data store
let currentFilter = 'all';   // Current filter state
let editingTaskId = null;    // Track editing mode
```

### Module Pattern
- `storage` - localStorage operations
- `taskManager` - Task CRUD operations
- `ui` - DOM rendering and updates
- `modal` - Modal show/hide logic
- `accordion` - FAQ accordion functionality
- `events` - Event listener management

### Key Functions
- `taskManager.add()` - Create new task
- `taskManager.update()` - Update existing task
- `taskManager.delete()` - Remove task
- `taskManager.toggle()` - Toggle completion
- `ui.render()` - Re-render task list
- `storage.save()` - Persist to localStorage

## 📊 Statistics Tracking

The app automatically tracks:
- **Total Tasks** - All tasks combined
- **Active Tasks** - Incomplete tasks
- **Completed Tasks** - Finished tasks

## 🔒 Data Persistence

All tasks are saved to browser's localStorage:
- Automatic save on every change
- Data persists across sessions
- Graceful error handling
- No server required

**Note**: Clearing browser data will remove all tasks.

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on all interactive elements
- ✅ Sufficient color contrast ratios
- ✅ Screen reader friendly

## 📱 Responsive Design

Fully responsive breakpoints:
- **Desktop**: Full layout (800px max-width)
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Single column layout, stacked elements

## 🎨 Color Palette

```css
Primary: #e07a5f    (Terracotta)
Secondary: #f4a261  (Orange)
Accent: #e9c46a     (Yellow)
Success: #2a9d8f    (Teal)
Danger: #e76f51     (Red)
```

## 🚧 Future Enhancements

Potential additions for v2.0:
- [ ] Due dates and calendar view
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Drag & drop reordering
- [ ] Dark mode toggle
- [ ] Export/Import tasks (JSON)
- [ ] Backend integration (Node.js + MongoDB)
- [ ] User authentication
- [ ] Cloud sync across devices

## 🐛 Known Limitations

- localStorage has ~5-10MB limit (enough for thousands of tasks)
- Data not synced across devices
- No collaboration features
- Single user only

## 📝 Learning Outcomes

This project demonstrates proficiency in:

✅ **JavaScript Fundamentals**
- DOM manipulation
- Event handling (delegation)
- ES6+ features (arrow functions, destructuring, template literals)
- Array methods (map, filter, find)
- Error handling

✅ **CSS Skills**
- CSS Custom Properties (variables)
- Flexbox & Grid layouts
- CSS animations & transitions
- Responsive design
- Component-based styling

✅ **Software Engineering**
- Code organization & modularity
- State management patterns
- Data persistence
- Error handling
- User experience considerations

✅ **Problem Solving**
- Feature integration
- UI/UX design decisions
- Performance optimization
- Cross-browser compatibility

## 👤 Author

**Your Name**
- SyntecxHub Frontend Development Intern
- MSc Computer Science Student

## 📄 License

This project is created for educational purposes as part of the SyntecxHub internship program.

## 🙏 Acknowledgments

- **SyntecxHub** - For the internship opportunity
- **Google Fonts** - For beautiful typography
- **MDN Web Docs** - For excellent documentation

---

**Built with focus & intention** ✦

*Need help? Click the help icon (?) in the top right corner of the app!*
