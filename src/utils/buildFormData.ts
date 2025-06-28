export const buildFormData = (file: Blob, fileName: string, id: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("article", fileName);
  formData.append("id", id.toString());

  return formData;
};
