import React from "react";
import './global.css';
import { useProduct } from 'vtex.product-context';

const HowToUseAminoVital = () => {
	const product = useProduct()?.product;
	let howTo = product?.properties.find(item => item.name === "Modo de Uso")?.values[0];

	return howTo ? (
	    <div className="wrapper-description-amino-vital">
	        <p className="text-description-amino-vital">
	            {howTo}
	        </p>
	    </div>
	) : null;
};

export default HowToUseAminoVital;
