import React from "react";

import { useProduct } from "vtex.product-context";

import "./global.css";

const CustomNutritionalInfo = () => {

    const productProps = useProduct()?.product?.properties

    const nutriInfoHTML = productProps?.find(item => item.name === "Tabela Nutricional")?.values[0];

    return nutriInfoHTML ? (
        <div className="nutri--table-wrapper" dangerouslySetInnerHTML={{__html: nutriInfoHTML}} />
    ) : null;
}

export default CustomNutritionalInfo;