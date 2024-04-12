export default function localStorageBasket(newProduct) {
  const basketFromStorage = localStorage.getItem("customerCheckout");

  // Hvis brugeren allerede har produkter i kurven eller ej
  if (basketFromStorage) {
    let currentBasket = JSON.parse(basketFromStorage);
    let productExists = false;

    console.log(currentBasket);

    currentBasket.forEach((entry) => {
      if (entry.id == newProduct.id) {
        entry.amount++;
        productExists = true;
      }
    });

    if (!productExists) {
      currentBasket.push(newProduct);
    }

    // Tilføjer det nye produkt til kurven
    localStorage.setItem("customerCheckout", JSON.stringify(currentBasket));
  } else {
    localStorage.setItem("customerCheckout", JSON.stringify([newProduct]));
  }
}
