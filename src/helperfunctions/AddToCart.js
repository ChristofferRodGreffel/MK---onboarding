import localStorageBasket from "./LocalStorageBasket";
import { useGlobalState } from "../components/GlobalStateProvider";

const useAddToCart = () => {
  const { setGlobalState } = useGlobalState();

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
