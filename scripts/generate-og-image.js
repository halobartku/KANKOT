import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WIDTH = 1200;
const HEIGHT = 630;

// Create a gradient background
const gradientSvg = `
<svg width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563EB;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)"/>
</svg>
`;

async function generateOgImage() {
  try {
    // Read the logo
    const logoPath = join(__dirname, '..', 'src', 'assets', 'Logo Kankot.png');
    const logo = readFileSync(logoPath);

    // Create the base image with gradient
    const baseImage = await sharp(Buffer.from(gradientSvg))
      .toBuffer();

    // Resize and position the logo
    const resizedLogo = await sharp(logo)
      .resize(400, null, { fit: 'contain' })
      .toBuffer();

    // Composite the images
    await sharp(baseImage)
      .composite([
        {
          input: resizedLogo,
          top: 100,
          left: (WIDTH - 400) / 2, // Center horizontally
        },
        {
          input: {
            text: {
              text: 'Transform Your Business Future',
              font: 'Arial',
              fontSize: 60,
              rgba: true,
              color: '#FFFFFF'
            }
          },
          top: HEIGHT - 200,
          left: 100,
        }
      ])
      .toFile(join(__dirname, '..', 'public', 'images', 'og-image.jpg'));

    console.log('OpenGraph image generated successfully!');
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
  }
}

generateOgImage();
