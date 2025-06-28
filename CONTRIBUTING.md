# Contributing to YouTube Clean Fullscreen

Thank you for your interest in contributing to YouTube Clean Fullscreen! This project provides a simple, clean interface for hiding YouTube controls in fullscreen mode.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- Chrome browser for testing

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/youtube-clean-fullscreen.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Build the extension: `npm run build:chrome`
6. Test the extension by loading `build/chrome` as an unpacked extension in Chrome

## Project Philosophy

YouTube Clean Fullscreen focuses on:
- **Simplicity**: Clean, easy-to-use interface
- **Essential Features**: Only the core functionality users need
- **Modern Standards**: Up-to-date with latest web extension APIs
- **Minimal Dependencies**: Keep the codebase lean and maintainable

## Types of Contributions

### Bug Reports
- Use the GitHub issue tracker
- Include steps to reproduce
- Mention your browser version and OS
- Include screenshots if relevant

### Feature Requests
- Check if it aligns with the project's simple philosophy
- Open an issue to discuss before implementing
- Keep features minimal and focused

### Code Contributions
- Follow the existing code style
- Test your changes thoroughly
- Update documentation if needed
- Keep commits focused and atomic

## Development Guidelines

### Code Style
- Use modern JavaScript (ES6+)
- Follow existing formatting patterns
- Comment complex logic
- Keep functions small and focused

### Testing
- Test the extension manually in Chrome
- Test both toggle states (controls and cursor)
- Verify fullscreen behavior
- Check that settings persist

### File Structure
```
src/
├── content-script.js    # Injected into YouTube pages
├── player.js           # Injected script for YouTube player
├── player.css          # Styles for hiding controls
├── popup.html          # Extension popup interface
├── popup.css           # Popup styling
├── popup.js            # Popup functionality
├── manifest_chrome.json # Chrome extension manifest
└── _locales/           # Internationalization
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

### PR Requirements
- Clear description of changes
- Test instructions
- Screenshots for UI changes
- Updated documentation if needed

## Questions?

Feel free to open an issue for questions or reach out to [@imyoga](https://github.com/imyoga).

Thank you for contributing! 🎉 
