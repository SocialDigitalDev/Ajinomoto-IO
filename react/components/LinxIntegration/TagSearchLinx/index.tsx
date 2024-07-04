import React, { useEffect } from "react";
import waitForEl from "../../../utils/waitForEl";

const TagSearchLinx = () => {

    useEffect(() => {
        const htmlCustom = document.createElement("impulse-search");

        waitForEl(".vtex-store-components-3-x-searchBarInnerContainer", () => {
            if (!document.querySelector("section.impulse-search-linx > impulse-search"))
                document.querySelector("section.impulse-search-linx")?.append(htmlCustom);
        });
    }, [])

    return (
        <section className="impulse-search-linx"></section>
    )

}

export default TagSearchLinx;