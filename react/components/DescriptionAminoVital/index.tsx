import React from "react";
import './global.css';
import { useProduct } from 'vtex.product-context';

const DescriptionAminoVital = () => {
	const product = useProduct()?.product;
	let praQuem = product?.properties.find(item => item.name === "Para quem é indicado")?.values[0];

	console.log(product, "DescriptionAminoVital product")
	console.log(praQuem, "DescriptionAminoVital praQuem")

	return praQuem ? (
	    <div className="wrapper-description-amino-vital">
	        <p className="text-description-amino-vital">
	            {praQuem}
	        </p>
	    </div>
	) : null;
};

export default DescriptionAminoVital;
