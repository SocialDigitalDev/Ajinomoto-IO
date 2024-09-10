import React, { useEffect } from "react";
import waitForEl from "../../../utils/waitForEl";

const SearchInputLinx = () => {

    useEffect(() => {
        const htmlCustom = document.createElement("impulse-autocomplete");

        waitForEl(".vtex-store-components-3-x-searchBarContainer", () => {
            if (!document.querySelector(".vtex-store-components-3-x-searchBarContainer impulse-autocomplete")) {
                var element: any = document.querySelector(".vtex-store-components-3-x-searchBarInnerContainer");
                let parent : any = element.parentNode;
                parent.replaceChild(htmlCustom, element);
                htmlCustom.appendChild(element);
            }
        })
    }, [])

    return <></>

}

export default SearchInputLinx;