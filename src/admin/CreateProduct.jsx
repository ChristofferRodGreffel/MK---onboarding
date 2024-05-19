import React from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";

const CreateProduct = () => {
  return (
    <PageWrapper>
      <Header />
      <div>
        <h1>Opret produkt</h1>
        <form className="flex flex-col shadow-sm py-5 px-8 rounded-md border-[1px] border-slate-100">
          <label htmlFor="productTitle" className="text-zinc-700 text-lg">
            Titel
          </label>
          <input type="text" name="productTitle" id="productTitle" />
          <label htmlFor="productDescription" className="text-zinc-700 text-lg">
            Beskrivelse
          </label>
          <textarea></textarea>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreateProduct;
