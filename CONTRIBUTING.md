# 🤝 Contributing to GPA Calculator

First off, thank you for considering contributing to GPA Calculator! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and constructive in all interactions.

## 🚀 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Browser and OS** information

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Possible implementation** if you have ideas

### 🔧 Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Test thoroughly in multiple browsers
4. Update documentation if needed
5. Submit a pull request!

## 💻 Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/gpa-calculator.git
   cd gpa-calculator
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Make changes**
   - Edit `index.html`, `script.js`, or `styles.css`
   - Refresh browser to see changes

## 📝 Coding Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Keep structure clean and organized

### CSS
- Use CSS custom properties (variables) defined in `:root`
- Follow existing naming conventions
- Keep selectors specific but not overly complex
- Add comments for complex sections
- Ensure responsive design works on mobile

### JavaScript
- Use modern ES6+ syntax
- Keep functions small and focused
- Add comments for complex logic
- Handle errors gracefully
- Test edge cases

### Accessibility
- Maintain keyboard navigation
- Keep ARIA labels updated
- Test with screen readers if possible
- Ensure sufficient color contrast

### Browser Compatibility
Test changes in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📨 Commit Messages

Use clear, descriptive commit messages with emojis:

- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Documentation
- 💄 `:lipstick:` - UI/style updates
- ♿ `:wheelchair:` - Accessibility improvements
- ⚡ `:zap:` - Performance improvements
- 🔧 `:wrench:` - Configuration changes
- ✅ `:white_check_mark:` - Tests
- 🔒 `:lock:` - Security fixes

Example:
```
✨ Add dark/light theme toggle
🐛 Fix PDF export on Safari
📝 Update README with new features
```

## 🔄 Pull Request Process

1. **Update documentation** - README, comments, etc.
2. **Test thoroughly** - Multiple browsers and devices
3. **Keep it focused** - One feature/fix per PR
4. **Describe changes** - What, why, and how
5. **Link issues** - Reference related issues
6. **Be patient** - Reviews may take time

### PR Template

```markdown
## 📋 Description
Brief description of changes

## 🎯 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💄 UI/UX improvement
- [ ] 📝 Documentation
- [ ] ♿ Accessibility

## 🧪 Testing
How did you test this?

## 📸 Screenshots
If applicable

## ✅ Checklist
- [ ] Code follows project style
- [ ] Tested in multiple browsers
- [ ] Documentation updated
- [ ] No console errors
```

## 🎨 Design Principles

When contributing, keep these principles in mind:

1. **Simplicity** - Keep the UI clean and uncluttered
2. **Performance** - No unnecessary dependencies
3. **Accessibility** - Everyone should be able to use it
4. **Responsiveness** - Works on all screen sizes
5. **Privacy** - All data stays client-side

## 🆘 Need Help?

- 💬 Open a discussion for questions
- 📧 Contact maintainers
- 📖 Check existing issues and PRs

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! ⭐

---

**Happy Coding!** 🚀
