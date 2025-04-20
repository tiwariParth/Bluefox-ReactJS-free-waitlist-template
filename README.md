# Free Waitlist Template with Free BlueFox Email Integration

This project is a modern, responsive waitlist signup page built with React and Vite that integrates with BlueFox Email API for subscriber list management. It features a clean, user-friendly interface with form validation, notifications, and smooth animations.

![Waitlist Signup Form](/public/vite.svg)

## Features

- **Free credits**: With Bluefox email get monthly 3000 free credits for a year
- **AWS SES**: Setup AWS SES with monthly 3000 free sends for a year
- **Sleek UI with Dark Theme**: Modern interface with gradient effects and responsive design
- **Form Validation**: Client-side validation for user inputs
- **BlueFox Email Integration**: Seamless connection to BlueFox Email API for managing subscribers
- **Animated Notifications**: Toast notifications with progress bars for user feedback
- **GitHub Pages Deployment**: Automatic deployment via GitHub Actions


## Tech Stack

- React 19.0
- Tailwind CSS 4.1.4
- Vite 6.2.0
- BlueFox Email API

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- pnpm package manager installed
- BlueFox Email account and API credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tiwariParth/waitlist-example.git
   cd waitlist-example
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

5. Open your browser and navigate to `http://localhost:5173` to see the application running.

## Building for Production

To create a production build:

```bash
pnpm build
```

The build files will be in the `dist` directory.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. When you push changes to the `main` branch, the GitHub Actions workflow will:

1. Build the project
2. Deploy it to the `gh-pages` branch
3. GitHub Pages will serve the site from this branch

### Manual Deployment

You can also deploy manually using:

```bash
pnpm deploy
```

This will build the project and push it to the `gh-pages` branch.

## Configuration

### Environment Variables

- `VITE_SUBLIST_ID`: Your BlueFox Email subscriber list ID
- `VITE_BLUEFOX_AUTH`: Your BlueFox Email API authentication token

### Customization

- Edit `tailwind.config.js` to customize the styling theme
- Modify the form fields in `App.jsx` to collect different user information
- Adjust the notification timing by changing the progress bar countdown in `App.jsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
