import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "vtex.product-context"

import "./global.css"

const SimilarProducts = () => {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [sabor, setSabor] = useState<any>();
    const [openClass, setOpenClass] = useState("closed");
    const productContext = useContext(ProductContext)
    const prodID = productContext?.product?.productId
    
    useEffect(() => {
        fetch('/api/catalog_system/pub/products/crossselling/similars/' + prodID)
        .then((resp) => {
            return resp.json()
        })
        .then((result : any) => {

            let similars = result;
            listSimilars(similars)
        })
    }, [])

    function setOpenClose() {
        if (openClass == "closed") {
            setOpenClass("open");
        } else {
            setOpenClass("closed");
        }
    }

    const listSimilars = (item: any) => {

        let getSabor = item ? item.map(item => 
            
            <li className="sabor-item">
                <a href={item.link} >
                    {item.Sabor[0]}
                </a>
            </li>

        ) : null;

        setSabor(getSabor);

        if (item.length > 0) {
            setIsLoaded(true)
        } else {
            setIsLoaded(false)
        }
    }
        
    return isLoaded ? (
        <div className="content--similar-product">
            <div className="list-products--similar">
                <button className={`list-products--button ${openClass}`} onClick={setOpenClose}>Outros sabores</button>
                <ul className={`list-products--list ${openClass}`}>
                    {sabor}
                </ul>
            </div>
        </div>
    ) : null
}
    
export default SimilarProducts