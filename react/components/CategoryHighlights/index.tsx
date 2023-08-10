import {useEffect, useState } from "react";

const CategoryHighlights = ({ children = [] }) => {
	const [visibleHightLight, setVisible ] = useState(false);
	useEffect(() => {
		const categories =  ["sazon", "vono"];
		categories.map((value)=>{
			console.log('value', value, window.location.pathname.includes(value))
			if (window.location.pathname.includes(value)) {
				setVisible(true)
			}	
		})
	}, []);

	return visibleHightLight ? (
		children.map((item: any) => {
			return (item)
		})
	) : null
};

export default CategoryHighlights;
