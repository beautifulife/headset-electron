const Jimp = require('jimp');
const { app } = require('electron');
const path = require('path');

/**
 * Retrieves the video thumbnail, crops it to a square and safes it to disk.
 * It uses 'default.jpg' which is usually the smallest size/resolution.
 *
 * @param {string} videoID The ID of the video to retrieve the thumbnail
 *
 * @returns {string} The URI pointing to the cropped thumbnail in disk
 */
async function mprisCover(videoID) {
  const image = await Jimp.read(`https://i.ytimg.com/vi/${videoID}/default.jpg`);
  image.cover(image.bitmap.height, image.bitmap.height, Jimp.HORIZONTAL_ALIGN_CENTER);

  const uri = path.join(app.getPath('userData'), `cover.${image.getExtension()}`);
  await image.writeAsync(uri);
  return `file://${uri}`;
}

module.exports = mprisCover;
