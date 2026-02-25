/**
 * Optimize images in public folder: favicons, logo, client logos.
 * Run: npm run optimize-images
 */
import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

async function optimizeFaviconsAndLogo() {
  const logoPath = join(publicDir, "barnick.png");
  const logoBuffer = await sharp(logoPath).toBuffer();
  const logo = sharp(logoBuffer);
  const meta = await logo.metadata();
  const width = meta.width || 389;
  const height = meta.height || 389;

  // Favicon 16x16
  await sharp(logoBuffer)
    .resize(16, 16)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, "favicon-16x16.png"));
  console.log("Optimized favicon-16x16.png");

  // Favicon 32x32
  await sharp(logoBuffer)
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, "favicon-32x32.png"));
  console.log("Optimized favicon-32x32.png");

  // barnick.png: keep dimensions, compress (write from buffer to avoid same-file error)
  await sharp(logoBuffer)
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, "barnick.png"));
  console.log("Optimized barnick.png");
}

async function generateFaviconIco() {
  try {
    const { sharpsToIco } = await import("sharp-ico");
    const png32 = join(publicDir, "favicon-32x32.png");
    await sharpsToIco([sharp(png32)], join(publicDir, "favicon.ico"), {
      sizes: [32, 16],
    });
    console.log("Generated favicon.ico");
  } catch (err) {
    console.warn("Could not generate favicon.ico (sharp-ico):", err.message);
  }
}

const CLIENT_MAX_SIZE = 128;

async function optimizeClientLogos() {
  const clientsDir = join(publicDir, "clients");
  const files = await readdir(clientsDir);
  const imageFiles = files.filter(
    (f) =>
      f.endsWith(".png") ||
      f.endsWith(".jpg") ||
      f.endsWith(".jpeg") ||
      f.endsWith(".webp")
  );

  for (const file of imageFiles) {
    const inputPath = join(clientsDir, file);
    const isJpeg = /\.(jpe?g)$/i.test(file);

    const pipeline = sharp(inputPath);
    const meta = await pipeline.metadata();
    const w = meta.width || 0;
    const h = meta.height || 0;
    const scale =
      w > h
        ? Math.min(1, CLIENT_MAX_SIZE / w)
        : Math.min(1, CLIENT_MAX_SIZE / h);
    const newW = Math.round(w * scale);
    const newH = Math.round(h * scale);

    const buffer = await sharp(inputPath).toBuffer();
    if (isJpeg) {
      await sharp(buffer)
        .resize(newW, newH, { fit: "inside" })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(inputPath);
    } else {
      await sharp(buffer)
        .resize(newW, newH, { fit: "inside" })
        .png({ compressionLevel: 9 })
        .toFile(inputPath);
    }
    console.log("Optimized clients/" + file);
  }
}

async function optimizeTestimonials() {
  const testimonialsDir = join(publicDir, "testimonials");
  const files = await readdir(testimonialsDir);
  const webpFiles = files.filter((f) => f.endsWith(".webp"));

  for (const file of webpFiles) {
    const inputPath = join(testimonialsDir, file);
    const buffer = await sharp(inputPath).toBuffer();
    await sharp(buffer)
      .webp({ quality: 82, effort: 6 })
      .toFile(inputPath);
    console.log("Optimized testimonials/" + file);
  }
}

async function main() {
  console.log("Optimizing favicons and logo...");
  await optimizeFaviconsAndLogo();
  await generateFaviconIco();
  console.log("Optimizing client logos...");
  await optimizeClientLogos();
  console.log("Optimizing testimonial images...");
  await optimizeTestimonials();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
