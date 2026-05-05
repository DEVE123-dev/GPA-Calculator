# 📊 GPA Calculator

A beautiful, modern GPA calculator with a 5-point academic grading scale. Calculate your Grade Point Average with style! ✨

![GPA Calculator](https://img.shields.io/badge/GPA-Calculator-c8a96e?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- 🎯 **Real-time GPA Calculation** - See your GPA update instantly as you enter grades
- 📈 **5-Point Grading Scale** - HD (5), D (4), C (3), P (2), CP (1), F (0)
- 💾 **Auto-Save** - Your data is automatically saved to your browser
- 📄 **PDF Export** - Generate professional PDF reports of your grades
- 💾 **Import/Export JSON** - Backup and restore your data
- ⌨️ **Keyboard Shortcuts** - Power user features for faster data entry
- 🎨 **Beautiful Dark Theme** - Easy on the eyes with elegant design
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ♿ **Accessible** - Built with accessibility in mind
- 🚀 **No Backend Required** - Pure client-side application

## 🎮 Demo

[Live Demo](https://yourusername.github.io/gpa-calculator) _(Update this link after deployment)_

## 🖼️ Screenshots

### Desktop View
![Desktop Screenshot](screenshots/desktop.png)

### Mobile View
![Mobile Screenshot](screenshots/mobile.png)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gpa-calculator.git
   cd gpa-calculator
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start calculating!** 🎉

## 📖 How to Use

1. **Add Subjects** - Click the "➕ Add Subject" button to add rows
2. **Enter Details** - Fill in subject name (optional), select grade, and enter credit points
3. **View Results** - Your GPA updates automatically in real-time
4. **Export PDF** - Click "📄 Export as PDF" to download a professional report
5. **Save/Load Data** - Use "💾 Save Data" and "📂 Load Data" to backup your grades

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Add new subject row |
| `Ctrl/Cmd + S` | Save data as JSON |
| `Ctrl/Cmd + E` | Export as PDF |
| `Ctrl/Cmd + R` | Reset all data (with confirmation) |
| `Tab` | Navigate between fields |

## 🎓 Grading Scale

| Grade | Points | Description |
|-------|--------|-------------|
| HD | 5 | High Distinction (85-100%) |
| D | 4 | Distinction (75-84%) |
| C | 3 | Credit (65-74%) |
| P | 2 | Pass (50-64%) |
| CP | 1 | Conditional Pass (45-49%) |
| F | 0 | Fail (0-44%) |

## 🧮 GPA Formula

```
GPA = Σ(Grade Value × Credit Points) ÷ Σ(Credit Points)
```

Only subjects with selected grades are included in the calculation.

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, responsive design
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **jsPDF** - PDF generation library
- **Google Fonts** - Playfair Display & DM Sans

## 📦 Project Structure

```
gpa-calculator/
├── index.html          # Main HTML file
├── script.js           # JavaScript logic
├── styles.css          # Styling
├── README.md           # Documentation
├── LICENSE             # MIT License
└── screenshots/        # Screenshots for README
```

## 🌟 Features in Detail

### Auto-Save
Your data is automatically saved to browser's localStorage every time you make a change. No need to worry about losing your work!

### PDF Export
Generate professional PDF reports with:
- Your cumulative GPA and grade band
- Total credit points and grade points earned
- Complete subject list with grades
- Grading scale reference
- Timestamp and formula

### Import/Export
- **Export**: Save your data as a JSON file for backup
- **Import**: Load previously saved data from JSON file
- Perfect for switching devices or keeping records

### Keyboard Navigation
Designed for efficiency with full keyboard support and shortcuts for common actions.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '✨ Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Future Enhancements

- [ ] Multiple grading scale support (4.0, 10-point, etc.)
- [ ] Semester/term organization
- [ ] GPA trend charts and analytics
- [ ] Target GPA calculator
- [ ] Dark/light theme toggle
- [ ] Multiple language support
- [ ] Cloud sync option
- [ ] Print-friendly view

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 💬 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

## 👨‍💻 Author

**Your Name**
- GitHub: [@DEVE123-dev](https://github.com/DEVE123-dev)
- Website: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- Design inspiration from modern academic tools
- Icons and emojis for better UX
- Open source community for feedback and support

---

Made with ❤️ and ☕ by deve(smash ur aunty)

**⭐ Star this repo if you find it helpful!**
