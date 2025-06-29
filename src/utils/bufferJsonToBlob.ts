export const bufferJsonToBlob = (
  bufferObj: { type: string; data: number[] },
  mimeType: string = "application/octet-stream"
): Blob => {
  const byteArray = new Uint8Array(bufferObj.data);
  return new Blob([byteArray], { type: mimeType });
};
