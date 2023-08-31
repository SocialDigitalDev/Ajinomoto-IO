import {useEffect, useState } from "react";
import { useSearchPage } from "vtex.search-page-context/SearchPageContext";

const CategoryHighlights = ({ children = [] }) => {

	const searchPage = useSearchPage();
	
	const [visibleHightLight, setVisible ] = useState(false);
	
	useEffect(() => {
		if (window.location.pathname.includes('sazon') || window.location.pathname.includes('vono') ) {
			setTimeout(function(){
				setVisible(true);
			}, 4000)
		} else {
			setTimeout(function(){
				setVisible(false);
			}, 4000)
		}
	}, [searchPage]);

	return visibleHightLight ? (
		children.map((item: any) => {
			return (item)
		})
	) : null
};

export default CategoryHighlights;
