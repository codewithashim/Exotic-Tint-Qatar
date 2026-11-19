/** True when the URL points at a file the browser can stream in a <video> element. */
export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|m3u8)(\?.*)?$/i.test(url);
}
