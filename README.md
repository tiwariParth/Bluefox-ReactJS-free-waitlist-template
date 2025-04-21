## Free Waitlist Solution with BlueFox Email Integration

This project is a completely free solution for building a modern, responsive waitlist signup page. It’s designed to help you get started without any upfront costs, leveraging free tiers from GitHub Pages, BlueFox Email, and AWS SES.

Why Choose This Free Solution?
- **GitHub Pages → Free Hosting** : Deploy your waitlist page for free using GitHub Pages. No hosting fees, no complicated setup—just seamless integration with your repository.
- **BlueFox Email → 3000 Free Credits Monthly for a Year** : With BlueFox Email, you get 3000 free credits per month for an entire year , allowing you to manage your subscriber list without worrying about costs during the initial stages of your project.
- **AWS SES Free Tier → 3000 Free Sends Monthly for a Year** : Combine BlueFox Email with AWS SES's free tier, which also offers 3000 free email sends per month for a year . This ensures scalable and reliable email delivery as your waitlist grows.
With these free resources, you’ll have more than enough capacity to launch and grow your waitlist project without incurring any expenses.

### Features

- **Modern Design** : A sleek user interface with a dark theme, gradient effects, and smooth animations for a professional look.
- **Form Validation** : Built-in client-side validation ensures accurate user inputs, improving data quality and user experience.
- **BlueFox Email Integration** : Effortlessly connect to the BlueFox Email API to manage subscribers and automate your waitlist campaigns.
- **Animated Notifications** : Provide real-time feedback to users with toast notifications featuring progress bars.
Responsive Design : Fully optimized for all devices, ensuring a seamless experience on both desktop and mobile.
Tech Stack
- **React 19.0** : A fast and flexible frontend framework for building dynamic user interfaces.
- **Tailwind CSS 4.1.4** : A utility-first CSS framework for creating modern, responsive designs quickly.
- **Vite 6.2.0** : A next-generation build tool that enables rapid development and hot module replacement.
- **BlueFox Email API** : A powerful email marketing platform with generous free credits to kickstart your campaigns.

### Local Development Setup
Prerequisites
- **Node.js 18+** : Ensure you have Node.js installed to run the project locally.
- **`pnpm` Package Manager** : Use pnpm for efficient dependency management.
- **BlueFox Email Account** : Sign up for a free account to access the API credentials needed for integration.
By combining GitHub Pages , BlueFox Email , and AWS SES , this solution offers a fully free path to launching a waitlist project. Whether you're an early-stage startup or a solo developer, this setup provides everything you need to validate your idea and grow your audience without spending a dime.


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
2. Deploy it directly to GitHub Pages

The deployment workflow is defined in `.github/workflows/deploy.yml`.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set the source to "GitHub Actions"

No additional commands or branches are needed for deployment - just push to main!

### Configuration

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
