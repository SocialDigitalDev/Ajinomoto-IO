import React from "react";
import { useProduct } from "vtex.product-context";
import "./global.css"

const EanInPDP = () => {

    const product = useProduct()?.product;
    const ean = product?.items[0]?.ean;

    return (
        <div className="custom-ean-number--wrapper">
            <p className="custom-ean-number--text">EAN: {ean}</p>
        </div>
    );

}

export default EanInPDP;