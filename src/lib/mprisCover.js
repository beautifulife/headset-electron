const Jimp = require('jimp');
const { app } = require('electron');
const path = require('path');

async function mprisCover(imageURL) {
  const image = await Jimp.read(imageURL);
  image.cover(image.bitmap.height, image.bitmap.height, Jimp.HORIZONTAL_ALIGN_CENTER);

  // TODO? Maybe save each image independantly, to keep as a cache,
  // but we might have to manage the size of it somehow.
  // const filename = `${imageURL.substring(24, 34)}.${image.getExtension()}`;

  const uri = path.join(app.getPath('userData'), `cover.${image.getExtension()}`);
  await image.writeAsync(uri);
  return `file://${uri}`;
}

module.exports = mprisCover;
