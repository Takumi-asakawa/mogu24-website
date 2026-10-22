// Regenerate raster favicon assets from the editable brand mark.
const sharp = require('sharp');
const fs = require('node:fs');
async function main() {
  const source = 'public/mogu24-icon.svg';
  for (const size of [96, 192, 512, 180]) {
    const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`;
    await sharp(source).resize(size, size).png().toFile(`public/${name}`);
  }
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header[entry] = header[entry + 1] = sizes[index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...images]));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
