import React, { useEffect } from "react";

const TagSearchLinx = () => {

    useEffect(() => {
        const htmlCustom = document.createElement("impulse-search");

        if (!document.querySelector("section.impulse-search-linx > impulse-search"))
        document.querySelector("section.impulse-search-linx")?.append(htmlCustom);
    }, [])

    return (
        <section className="impulse-search-linx"></section>
    )

}

export default TagSearchLinx;