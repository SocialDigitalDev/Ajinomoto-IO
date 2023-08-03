import React from "react";
import { useProduct } from 'vtex.product-context';
import './global.css';

const CustomPdpSpecs = () => {

    const product = useProduct()?.product;
    let alergenicos = product?.properties.find(item => item.name === "Alergênicos")?.values[0];
    
    if (alergenicos?.includes("ALÉRGICOS:")) {
        alergenicos = alergenicos.replace("ALÉRGICOS:", "");
    }

    alergenicos = alergenicos?.toLowerCase();

    const alergenicosArr:any = alergenicos?.split('.');

    let renderAlergenicos = alergenicosArr ? 
        alergenicosArr.map(
            item => item !== "" ? 
                <span className="alergenico-item" data-char={item}>{item}</span> 
            : null
        ) 
    : null;
    
    return alergenicos ? (
        <div className="custom-characteristics">
            <h3 className="custom-characteristics-title">Características</h3>
            <div className="custom-characteristics-list">
                {renderAlergenicos}
            </div>
        </div>
    ) : null;
}

export default CustomPdpSpecs;