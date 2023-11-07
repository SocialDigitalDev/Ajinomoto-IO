// import React, {useEffect, useState} from "react";
import { productContext } from "vtex.product-context";

const CustomProductSize = () => {

    const product = productContext()?.product;
    
    console.log(product);

    return null;
}

export default CustomProductSize;