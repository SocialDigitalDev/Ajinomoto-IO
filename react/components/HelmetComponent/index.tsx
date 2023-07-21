import React from "react"
import { Helmet } from "vtex.render-runtime"

import "./global.css"


const HelmetComponent = () => {
	return (
		// @ts-ignore
		<Helmet>
			<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			></meta>
			<meta name="theme-color" content="#000" />
		</Helmet>
	)
}

export default HelmetComponent
