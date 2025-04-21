# BlueFox React Waitlist Template

A modern, responsive waitlist signup page built with React and pure CSS for collecting emails and user information.

![Waitlist Template Screenshot](./src/assets/screenshot.png)

## Features

- **Modern Design**: Clean, dark-themed UI with gradient accents and smooth animations
- **Responsive Layout**: Fully optimized for all devices from mobile to desktop
- **Form Validation**: Client-side validation for email and required fields
- **BlueFox Email Integration**: Direct API integration with BlueFox Email for subscriber management
- **Toast Notifications**: Animated success/error notifications with progress bars
- **GitHub Pages Ready**: Configured for seamless deployment to GitHub Pages

## Demo

View the live demo: [https://tiwariparth.github.io/Bluefox-ReactJS-free-waitlist-template/](https://tiwariparth.github.io/Bluefox-ReactJS-free-waitlist-template/)

## Tech Stack

- [React 19](https://react.dev/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Pure CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Custom styling without frameworks
- [BlueFox Email API](https://bluefoxemail.com/) - Email subscriber management

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tiwariParth/Bluefox-ReactJS-free-waitlist-template.git
   cd Bluefox-ReactJS-free-waitlist-template
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory with your BlueFox Email API credentials:
   ```
   VITE_SUBLIST_ID=your_subscriber_list_id
   VITE_BLUEFOX_AUTH=your_bluefox_api_key
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to the local development URL shown in your terminal.

## Deployment

This project is configured for automatic deployment to GitHub Pages through GitHub Actions. When you push changes to the `main` branch, GitHub Actions will build and deploy your site.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set the source to "GitHub Actions"

### Repository Configuration

The project is set up with the correct base path and homepage URL in:
- `vite.config.js` - containing `base: '/Bluefox-ReactJS-free-waitlist-template/'`
- `package.json` - containing `"homepage": "https://tiwariparth.github.io/Bluefox-ReactJS-free-waitlist-template"`

## Customization

### Styling

All styling is handled in `src/styles.css`. The CSS includes:
- Custom colors and gradients
- Form styling
- Animations and transitions
- Responsive breakpoints

### Form Fields

You can customize the form fields by modifying the state and JSX in `src/App.jsx`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Created by [Parth Tiwari](https://github.com/tiwariParth)
- Integration with [BlueFox Email](https://bluefoxemail.com/)
