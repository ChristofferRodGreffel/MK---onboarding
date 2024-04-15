export default function localStorageBasket(newProduct) {
  const currentOrder = localStorage.getItem("customerOrder");

  if (currentOrder) {
    let currentBasket = JSON.parse(currentOrder);
    let productExists = false;

    currentBasket.products.forEach((entry) => {
      if (entry.id == newProduct.id) {
        entry.amount++;
        productExists = true;
      }
    });

    currentBasket.orderTotal += newProduct.price;

    if (!productExists) {
      currentBasket.products.push(newProduct);
    }

    localStorage.setItem("customerOrder", JSON.stringify(currentBasket));
  } else {
    let newBasket = {
      orderTotal: Number(newProduct.price),
      discountApplied: false,
      products: [newProduct],
    };
    localStorage.setItem("customerOrder", JSON.stringify(newBasket));
  }
}
