import localStorageBasket from "./LocalStorageBasket";
import { useGlobalState } from "../components/GlobalStateProvider";

// Custom hook allows for using React and JS together
const useAddToCart = () => {
  const { setGlobalState } = useGlobalState();

  // Adds a new product to the cart in localStorage using the 'localStorageBasket' function
  const addToCart = (product, setAdding) => {
    setAdding("processing");

    const completeProduct = {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      src: product.imageSource,
      amount: 1,
    };

    localStorageBasket(completeProduct);

    // Timeouts are added for the state of the add button
    setTimeout(() => {
      setAdding("completed");
      setGlobalState((prevState) => prevState + 1);
    }, 300);

    setTimeout(() => {
      setAdding("default");
    }, 1500);
  };

  return addToCart;
};

export default useAddToCart;
