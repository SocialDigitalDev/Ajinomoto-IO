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
			/>
			<meta name="theme-color" content="#000" />
			<link
				rel="shortcut icon"
				href="/arquivos/lojaajinomoto-favicon.ico"
			/>

			<meta
				name="adopt-website-id"
				content="d634b0e0-fbb8-4bb8-9efa-bb364f882777"
			/>
			<script
				src="//tag.goadopt.io/injector.js?website_code=d634b0e0-fbb8-4bb8-9efa-bb364f882777"
				className="adopt-injector"
			>
			</script>
			<meta
				name="google-site-verification"
				content="fS2gDf41Ex76LzXW3u7bCcDZP17Wjr9Y9Z8AUEDQm-U"
			/>
			<script
				async
				defer
				src="//suite.linximpulse.net/impulse/impulse.js"
				data-apikey="loja-ajinomoto"
			>
			</script>
			{
				/* <script src="https://unpkg.com/blip-chat-widget" type="text/javascript"></script>
			<script src="https://www.socialdigitalcommerce.com.br/blipchat/blip-chat.js"></script> */
			}
			<script
				type="text/javascript"
				src="//colt.trustvox.com.br/colt.min.js"
			>
			</script>
			<script>
				var _trustvox_colt = _trustvox_colt || [];
				_trustvox_colt.push(['_storeId', '121661'], ['_limit', '7']);
			</script>
			<meta
				name="google-site-verification"
				content="fS2gDf41Ex76LzXW3u7bCcDZP17Wjr9Y9Z8AUEDQm-U"
			/>
			{
				/* <script src="https://unpkg.com/blip-chat-widget" type="text/javascript"></script>
			<script src="https://www.socialdigitalcommerce.com.br/blipchat/blip-chat.js"></script> */
			}

			{/* Start of ajinomotosdc Zendesk Widget script */}
			<script
				id="ze-snippet"
				src="https://static.zdassets.com/ekr/snippet.js?key=6f5339fb-845e-41c2-af6e-b8688df3cc89"
			>
			</script>
			{/* End of ajinomotosdc Zendesk Widget script */}
		</Helmet>
	);
};

export default HelmetComponent;
