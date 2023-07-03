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
			<meta name="theme-color" content="#3D1151" />
			<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=0bc1a91b-2f68-42c3-870f-4de7363a9395"> </script>
		</Helmet>
	)
}
	
export default HelmetComponent