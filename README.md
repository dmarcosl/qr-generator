# QR Code Generator

A responsive web application to generate customized QR codes with various styling options.

## Features

### QR Code Customization
- Generate QR codes from any URL
- Customize QR code colors (foreground and background)
- Add a custom logo in the center of the QR code
- Add optional text below the QR code
- Customize border (show/hide, color, width)
- Adjust QR code margin (0-4 modules)

### User Interface
- Dark/Light theme toggle
- Language switch (English/Spanish)
- Automatic language detection based on browser settings
- Responsive design for both desktop and mobile devices
- Real-time preview of QR code changes
- Download QR code as PNG image

### Technical Features
- SVG-based QR codes for better quality
- Maintains aspect ratio and quality when downloading
- Preserves custom logo in downloaded image
- Matches web preview exactly with downloaded image
- Proper color handling for both QR code and text

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/qr-generator.git
cd qr-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment to GitHub Pages

### Automatic Deployment
The application automatically deploys to GitHub Pages when pushing to the main branch. The deployment process:
1. Builds the application
2. Deploys to the gh-pages branch
3. Makes the site available at your GitHub Pages URL

### Manual Deployment
If you need to deploy manually:

1. Update the `homepage` in `package.json`:
```json
{
  "homepage": "https://[your-username].github.io/qr-generator"
}
```

2. Configure your repository:
   - Go to your repository settings on GitHub
   - Navigate to "Pages"
   - Under "Source", select "gh-pages" branch
   - Save the changes

3. Deploy the application:
```bash
npm run deploy
```

4. Your application will be available at `https://[your-username].github.io/qr-generator`

## Technologies Used
- React 18
- Vite
- Styled Components
- i18next for internationalization
- QRCode.react for QR code generation
- html2canvas for image download
- Font Awesome icons
- GitHub Pages for deployment

## System Requirements
- Node.js 16.0 or higher
- npm 7.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Development Notes

### QR Code Options
- Margin: Values from 0 to 4 (QR code modules)
- Border width: 1-10 pixels
- Colors: Any valid hex color
- Logo: Supports PNG, JPG, GIF formats
- Text: Optional caption below QR code

### Theme System
- Dark theme by default
- Theme preference stored in state
- Smooth transitions between themes
- Consistent styling across components

### Responsive Design
- Adapts to different screen sizes
- Optimized layout for mobile devices
- Proper spacing and padding adjustments
- Fixed header position for better usability