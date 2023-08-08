import React from "react";
import { Helmet } from "vtex.render-runtime";

import "./global.css";

const HelmetComponent = () => {
	return (
		// @ts-ignore
		<Helmet>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			></meta>
			<meta name="theme-color" content="#000" />
			<meta
				name="adopt-website-id"
				content="d634b0e0-fbb8-4bb8-9efa-bb364f882777"
			/>
			<script
				src="//tag.goadopt.io/injector.js?website_code=d634b0e0-fbb8-4bb8-9efa-bb364f882777"
				className="adopt-injector"
			></script>
		</Helmet>
	);
};

export default HelmetComponent;
