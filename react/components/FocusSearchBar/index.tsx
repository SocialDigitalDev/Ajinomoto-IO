import { useEffect } from "react";

const FocusSearchBar = () => {
	useEffect(() => {
		// const triggerSearch: HTMLElement | null = document.querySelector(
		// 	".vtex-modal-layout-0-x-triggerContainer--search-fixed-desktop"
		// );
		const inputSearch: any = document.querySelector(
			".vtex-store-components-3-x-autoCompleteOuterContainer .vtex-styleguide-9-x-input"
		);

		if (inputSearch) {
			setTimeout(() => {
				inputSearch.focus();
			}, 1000);
		}
	}, []);

	return null;
};

export default FocusSearchBar;
