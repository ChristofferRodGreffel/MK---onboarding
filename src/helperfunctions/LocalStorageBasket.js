// Generates a new cart or adds product
export default function localStorageBasket(newProduct) {
  const currentOrder = localStorage.getItem("customerOrder");

  // If a cart instace exists the product will either be added or the amount updated
  // Else a new cart instance is initiated
  if (currentOrder) {
    let currentBasket = JSON.parse(currentOrder);
    let productExists = false;

    // Checks if the product to add already exists in the cart (is so update amount +1)
    currentBasket.products.forEach((entry) => {
      if (entry.id == newProduct.id) {
        entry.amount++;
        productExists = true;
      }
    });

    // Upadting cart total with the new products price
    currentBasket.orderTotal += newProduct.price;

    // If the product is not yet in cart, push it to cart
    if (!productExists) {
      currentBasket.products.push(newProduct);
    }

    // Update cart with new data
    localStorage.setItem("customerOrder", JSON.stringify(currentBasket));
  } else {
    // In this case a cart instance does not exist.
    // One is created and added to localStorage with the product
    let newBasket = {
      orderTotal: Number(newProduct.price),
      discountApplied: false,
      products: [newProduct],
    };
    localStorage.setItem("customerOrder", JSON.stringify(newBasket));
  }
}
