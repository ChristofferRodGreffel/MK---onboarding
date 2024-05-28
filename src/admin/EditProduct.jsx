import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import PageWrapper from "../components/PageWrapper";
import { generateEAN, generateSKU, handleShowPopover } from "../helperfunctions/ProductFunctions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import DialogBox from "../components/DialogBox";
import { toast } from "react-toastify";

const EditProduct = () => {
  const formRef = useRef();
  const [priceAlert, setPriceAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProduct(docSnap.data());
      setSelectedColor(product?.color);
      setLoading(false);
    }
  };

  const checkPrice = () => {
    let regularPrice = parseInt(formRef.current.productPrice.value);
    let discountPrice = parseInt(formRef.current.discountPrice.value);

    if (regularPrice && discountPrice > regularPrice) {
      setPriceAlert(true);
    } else {
      setPriceAlert(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoadingState("updating");
    setLoading(true);
    const title = formRef.current.productTitle.value;
    const description = formRef.current.productDescription.value;
    const price = formRef.current.productPrice.value;
    const discountPrice = formRef.current.discountPrice.value;
    const color = formRef.current.productColor.value;
    const ean = formRef.current.productEan.value;
    const sku = formRef.current.productSku.value;
    let downloadURL = "";
    let updatedProduct = {};

    if (imageUpload) {
      downloadURL = await uploadImage();

      console.log(discountPrice);

      updatedProduct = {
        title: title,
        description: description,
        price: parseInt(price),
        discountPrice: discountPrice,
        color: color,
        ean: parseInt(ean),
        sku: sku,
        imageSource: downloadURL,
      };
    } else {
      updatedProduct = {
        title: title,
        description: description,
        price: parseInt(price),
        discountPrice: discountPrice,
        color: color,
        ean: parseInt(ean),
        sku: sku,
      };
    }

    const productRef = doc(db, `products/${id}`);

    await updateDoc(productRef, updatedProduct);

    setLoadingState("updated");

    setTimeout(() => {
      setLoading(false);
      getProduct();
    }, 2500);

    setImageUpload(null);
  };

  const uploadImage = async () => {
    if (imageUpload != null) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
    return null;
  };

  const deleteProduct = async () => {
    await deleteDoc(doc(db, "products", id)).then(() => {
      navigate("/profile");
      toast.success("Produkt slettet", DefaultToastifySettings);
    });
  };

  return (
    <PageWrapper>
      <Header />
      <div className="mt-8" id="createProductPage">
        <BackButtonWithArrow linkText="Tilbage til produktoversigt" linkTo="/profile" />
        <div className="flex items-center justify-between mb-3 md:w-3/4">
          <h1 className="font-bold text-xl mb-1">Redigér produkt</h1>
          <DialogBox function={deleteProduct} />
        </div>
        <p className="mb-5">Udfyld felterne herunder for at opdatere produktinformationerne.</p>
        <form onSubmit={handleUpdateProduct} ref={formRef} className="flex flex-col gap-5 md:w-3/4">
          <div className="flex flex-col gap-5 p-8 rounded-md border-[1px] shadow-md">
            <div className="flex flex-col">
              <label htmlFor="productTitle" className="text-zinc-700 font-medium">
                Titel
              </label>
              <input
                type="text"
                name="productTitle"
                id="productTitle"
                contentEditable="true"
                defaultValue={product?.title}
                placeholder="Titel på produktet"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="productDescription" className="text-zinc-700 font-medium">
                Beskrivelse
              </label>
              <textarea
                id="productDescription"
                className="min-h-[150px]"
                placeholder="Produktets beskrivelse"
                defaultValue={product?.description}
                required
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col p-8 rounded-md border-[1px] shadow-md">
            <p className="mb-5 font-semibold text-lg">Medie (billede)</p>
            <div className="border-2 border-slate-300 border-dashed py-10 px-5 rounded-md">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <label
                  htmlFor="productImage"
                  className="cursor-pointer min-w-fit bg-zinc-700 text-white p-3 rounded-md"
                >
                  Upload nyt
                </label>
                {!imageUpload && <img src={product?.imageSource} alt="product image" className="w-44" />}
                {imageUpload && (
                  <div>
                    <div className="flex items-center gap-2 text-customGreen">
                      <i className="fa-regular fa-circle-check  text-xl"></i>
                      <p>Billede uploadet!</p>
                    </div>
                    <p className="italic text-zinc-600">{imageUpload && imageUpload.name}</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                name="productImage"
                id="productImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
          </div>
          <div className={`p-8 rounded-md border-[1px] shadow-md ${priceAlert && "!border-customRed border-[2px]"}`}>
            <p className="mb-5 font-semibold text-lg">Prissætning</p>
            <div className="flex flex-col gap-5 md:flex-row">
              <div>
                <label htmlFor="productPrice" className="text-zinc-700 font-medium">
                  Normalpris
                </label>
                <div className="relative md:w-fit">
                  <input
                    type="number"
                    inputMode="numeric"
                    name="productPrice"
                    id="productPrice"
                    defaultValue={product?.price}
                    className="w-full md:w-52"
                    onBlurCapture={checkPrice}
                    required
                  />
                  <p className="absolute top-0 translate-y-1/2 right-2">kr.</p>
                </div>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <label htmlFor="discountPrice" className="text-zinc-700 font-medium">
                    Tilbudspris
                  </label>
                  <div onClick={handleShowPopover} className="flex items-center relative group">
                    <div className="flex justify-center items-center rounded-full transition-all ease-in-out duration-100">
                      <i className="fa-regular fa-circle-question text-zinc-700"></i>
                    </div>
                    <div
                      id="popover"
                      className="absolute w-56 -translate-y-[60%] -translate-x-1/2 md:-translate-x-0 text-sm bg-primaryGrey bg-opacity-90 text-white rounded-md p-3 opacity-0 transition-all duration-75 transform scale-0 origin-center md:origin-left md:group-hover:opacity-100 md:group-hover:scale-100"
                    >
                      For at vise et afslag i prisen, skal du indtaste en værdi som er lavere end normalprisen.
                    </div>
                  </div>
                </div>
                <div className="relative md:w-fit">
                  <input
                    type="number"
                    inputMode="numeric"
                    defaultValue={product?.discountPrice}
                    name="discountPrice"
                    id="discountPrice"
                    onBlurCapture={checkPrice}
                    className="w-full md:w-52"
                  />
                  <p className="absolute top-0 translate-y-1/2 right-2">kr.</p>
                </div>
              </div>
            </div>
            {priceAlert && (
              <p className="text-customRed mt-3">
                <b>OBS:</b> Tilbudsprisen er højere end normalprisen!
              </p>
            )}
          </div>
          <div className="p-8 rounded-md border-[1px] shadow-md">
            <p className="mb-5 font-semibold text-lg">Diverse</p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="productColor" className="text-zinc-700 font-medium">
                  Farve
                </label>
                <select
                  name="productColor"
                  id="productColor"
                  className="p-3.5"
                  value={selectedColor || product?.color}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Vælg farve
                  </option>
                  <option value="gennemsigtig">Gennemsigtig</option>
                  <option value="hvid">Hvid</option>
                  <option value="sort">Sort</option>
                  <option value="rød">Rød</option>
                  <option value="grøn">Grøn</option>
                  <option value="blå">Blå</option>
                  <option value="gul">Gul</option>
                  <option value="brun">Brun</option>
                  <option value="lilla">Lilla</option>
                  <option value="orange">Orange</option>
                  <option value="pink">Lyserød</option>
                  <option value="grå">Grå</option>
                  <option value="turkis">Turkis</option>
                  <option value="beige">Beige</option>
                  <option value="guld">Guld</option>
                  <option value="sølv">Sølv</option>
                  <option value="multi">Multi</option>
                  <option value="møsnter">Mønster</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="productEan" className="text-zinc-700 font-medium">
                  EAN
                </label>
                <input type="text" name="productEan" id="productEan" defaultValue={product?.ean} />
                <p
                  onClick={() => (formRef.current.productEan.value = generateEAN())}
                  className="bg-zinc-700 text-white w-fit px-2 py-1 mt-2 rounded-md cursor-pointer select-none flex items-center gap-2"
                >
                  Tilfældig EAN
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="productSku" className="text-zinc-700 font-medium">
                  SKU
                </label>
                <input type="text" name="productSku" id="productSku" defaultValue={product?.sku} />
                <p
                  onClick={() => (formRef.current.productSku.value = generateSKU())}
                  className="bg-zinc-700 text-white w-fit px-2 py-1 mt-2 rounded-md cursor-pointer select-none flex items-center gap-2"
                >
                  Tilfældig SKU
                </p>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Opdater produkt"
            className="bg-customDarkGreen text-white text-lg font-semibold p-3 rounded-md cursor-pointer mt-10"
          />
        </form>
      </div>
      {loading && <LoadingScreen status={loadingState} />}
    </PageWrapper>
  );
};

export default EditProduct;
