export const fileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        if (arrayBuffer) {
          const blob = new Blob([arrayBuffer]);
          resolve(blob);
        } else {
          reject(new Error("File conversion failed"));
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      reject(err);
    }
  });
};
