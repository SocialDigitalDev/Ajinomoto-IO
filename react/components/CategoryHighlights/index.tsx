import {useEffect, useState } from "react";

const CategoryHighlights = ({ children = [] }) => {
	const [visibleHightLight, setVisible ] = useState(false);
	useEffect(() => {
		if (window.location.pathname.includes("sazon") || window.location.pathname.includes("sazon/carne")) {
			setVisible(true)
		}	
	}, []);

	return visibleHightLight ? (
		children.map((item: any) => {
			return (item)
		})
	) : null
};

export default CategoryHighlights;
