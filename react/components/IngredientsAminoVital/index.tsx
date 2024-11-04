import React from "react";
import './global.css';
import { useProduct } from 'vtex.product-context';

const IngredientsAminoVital = () => {
	const product = useProduct()?.product;
	let Ingrt = product?.properties.find(item => item.name === "Ingredientes")?.values[0];

	console.log(product, "product - IngredientsAminoVital");
	console.log(Ingrt, "Ingrt - IngredientsAminoVital");
	

	return Ingrt ? (
	    <div className="wrapper-description-amino-vital">
	        <p className="text-description-amino-vital">
	            {Ingrt}
	        </p>
	    </div>
	) : null;
};

export default IngredientsAminoVital;
