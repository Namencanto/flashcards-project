export const handleFileSelect = (e, setImage) => {
  let reader = new FileReader();
  reader.onload = (e) => setImage(e.target.result);
  reader.readAsDataURL(e.target.files[0]);
};
