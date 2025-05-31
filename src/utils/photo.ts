// バイトの単位変換
export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return Math.floor(bytes / (1024 * 1024)) + ' MB';
  } else if (bytes >= 1024) {
    return Math.floor(bytes / 1024) + ' KB';
  } else {
    return bytes + ' B';
  }
}
