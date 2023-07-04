import React, { useState, useEffect } from "react"
import { canUseDOM } from 'vtex.render-runtime'
import { Button } from "vtex.styleguide"

import "./global.css"

const LGPD = () => {

	const [display, setDisplay] = useState(false)

	useEffect(() => {

		function getSessionStorage () {
			
			if (!!localStorage.getItem("@storage/lgpd") == false) {
				localStorage.setItem("@storage/lgpd", "false")
				setDisplay(true)
			} else if (localStorage.getItem("@storage/lgpd") === "accept") {
				setDisplay(false)
			} else {
				setDisplay(true)
			}

		}

		getSessionStorage()

	}, [display])

	const closeLGPD = () => {

		setDisplay(false)
		localStorage.setItem("@storage/lgpd", "accept")
	}

    return (
        <>
        {canUseDOM && display && (
            <div className="lgpd-sdc">
				<div className="lgpd-container">
					<div className="lgpd-logo-loja">
						<i className="icon-logo-loja"></i>
					</div>
					<div className="lgpd-message">
						<p>Este site usa cookies para melhorar sua experiência enquanto você navega pelo site. Os cookies são categorizados em "essenciais" e de "mídias". Os cookies que são categorizados como "essenciais" são armazenados no seu navegador, pois são necessários para o funcionamento das principais funções do site. Estes cookies serão mantidos independentemente de seu consentimento. Também usamos cookies de "mídias" compartilhados com terceiros que nos ajudam a analisar e entender como você usa este site, possibilitando interações futuras com você. Estes cookies serão armazenados em seu navegador apenas com o seu consentimento e você tem a opção de cancelar esses cookies acessando os detalhes de nossa política. Contudo, importante informar que a desativação de alguns desses cookies poderá afetar sua experiência de navegação. Detalhe sobre cookies essenciais: Os cookies "essenciais" são absolutamente necessários para o funcionamento adequado do site. Esta categoria inclui apenas cookies que garantem funcionalidades básicas e recursos de segurança do site. Esses cookies não armazenam nenhuma informação pessoal e serão utilizados independentemente de seu consentimento com respaldo legal. Detalhes sobre cookies de mídia: Quaisquer cookies que possam não ser particularmente necessários "essenciais" para o funcionamento do site e sejam usados especificamente para coletar dados pessoais do usuário por meio de análises, anúncios e outros conteúdos incorporados são denominados cookies de "mídia". Esses cookies somente serão armazenados com o consentimento do usuário.</p>
					</div>
					<div className="lgpd-button lgpd-button-ok">
						<Button variation="primary" onClick={closeLGPD}>
							Prosseguir
						</Button>
					</div>
				</div>
			</div>
        )}
        </>
    )
}

export default LGPD