// Generates a random EAN number with 13 digits
export const generateEAN = () => {
  let randomNumber = Math.random();
  let randomString = randomNumber.toString().slice(2, 15);

  while (randomString.length < 13) {
    randomString += Math.floor(Math.random() * 10).toString();
  }
  return parseInt(randomString, 10);
};

// Generates a random SKU using the defined characters
export const generateSKU = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "";

  while (sku.length < 10) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters[randomIndex];
  }

  return sku;
};

// Function to show the popover element
export const handleShowPopover = () => {
  const popover = document.querySelector(".popover");
  popover.classList.toggle("showPopover");
};
