import { useEffect } from "react";

import "./global.css";

const AccountCustom = () => {
	const insertText = () => {
		setTimeout(() => {
			const elLgpd = document.querySelector(".text-lgpd") as HTMLElement;
			// eslint-disable-next-line vtex/prefer-early-return
			if (!elLgpd) {
				const el = document.querySelector(
					".vtex-my-account-1-x-newsletterBoxContainer .vtex-my-account-1-x-passwordBox"
				) as HTMLElement;
				const node = document.createElement("span");
				node.innerHTML =
					"Concordo que a Ajinomoto pode usar meus dados de contato e interações.<a class='text-lgpd' href='/institucional/politica-de-privacidade' target='_blank'>Política de privacidade</a>";
				el.appendChild(node);
			}
		}, 2300);
	};

	useEffect(() => {
		insertText();
		window.onhashchange = insertText;
	}, []);

	return null;
};

export default AccountCustom;
