import React from "react";

import { useProduct } from "vtex.product-context";

import "./global.css";

const CustomHowToUse = () => {

    const productProps = useProduct()?.product?.properties
    const howToUseHTML = productProps?.find(item => item.name === "Modo de Uso")?.values[0];
    const productBrandId =  useProduct()?.product?.brandId


    return productBrandId == '2097153890' ? (
        //@ts-ignore
        <div className="how-to-use-info-wrappers" dangerouslySetInnerHTML={{__html: howToUseHTML}} />
    ) : null;
}

export default CustomHowToUse;

