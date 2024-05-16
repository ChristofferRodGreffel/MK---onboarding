import { toast } from "react-toastify";
import { DefaultToastifySettings } from "./DefaultToastSettings";
import localStorageBasket from "./LocalStorageBasket";
import { useGlobalState } from "../components/GlobalStateProvider";

const useAddToCart = () => {
  const { setGlobalState } = useGlobalState();

  const addToCart = (product) => {
    const completeProduct = {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      src: product.imageSource,
      amount: 1,
    };

    setGlobalState((prevState) => prevState + 1);

    localStorageBasket(completeProduct);
    toast.success("Tilføjet til kurv!", DefaultToastifySettings);
  };

  return addToCart;
};

export default useAddToCart;
