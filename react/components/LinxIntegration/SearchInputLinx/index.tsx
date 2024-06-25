import React, { useEffect } from "react";

const SearchInputLinx = () => {

    useEffect(() => {
        const htmlCustom = document.createElement("impulse-autocomplete");

        if (!document.querySelector("form[data-search-impulse-linx] > impulse-autocomplete"))
        document.querySelector("form[data-search-impulse-linx]")?.append(htmlCustom);
    }, [])

    return (
        <>
            {/* <!-- Linx TOP --> */}
            <form data-search-impulse-linx className="search">
                <input className="input-field" />
            </form>
        </>
    );

}

export default SearchInputLinx;