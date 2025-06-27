export const blobToFile = (blob: Blob, fileName: string, mimeType?: string): File => {
  return new File([blob], fileName, {
    type: mimeType || blob.type || "application/octet-stream",
    lastModified: Date.now(),
  });
};
