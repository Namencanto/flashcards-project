export const handleFileSelect = (e, setImage) => {
  let reader = new FileReader();
  reader.onload = (e) => setImage(e.target.result);
  reader.readAsDataURL(e.target.files[0]);
};

export const deleteTechcardsHandler = (e, firstSides, secondSides) => {
  e.preventDefault();

  let firstSidesArr = firstSides.split("/");
  let secondSidesArr = secondSides.split("/");

  const techcardsToDelete = e.target.techcardToDelete;
  for (const techcardToDelete of techcardsToDelete) {
    if (techcardToDelete.checked === true) {
      firstSidesArr[techcardToDelete.value] = "";
      secondSidesArr[techcardToDelete.value] = "";
    }
  }
};
