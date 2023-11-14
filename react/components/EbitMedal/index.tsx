import React, { useEffect } from 'react'
import { getSelo } from './getSelo'

const EbitMedal = () => {


	useEffect(() => {
		getSelo
	}, [getSelo])

	return (
		<>
			<a id="seloEbit" href="http://www.ebit.com.br/124583" target="_blank" data-noop="redir(this.href);"></a>
		</>
	)
};

export default EbitMedal;
