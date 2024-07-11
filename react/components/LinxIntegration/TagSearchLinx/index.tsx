import { useEffect } from "react";
import waitForEl from "../../../utils/waitForEl";

const TagSearchLinx = () => {

    useEffect(() => {
        const htmlCustom = document.createElement("impulse-search");

        waitForEl("div.render-route-vtex-store-2-x-store-custom-busca", () => {
            if (!document.querySelector("impulse-search"))
                document.querySelector("body > div.render-route-vtex-store-2-x-store-custom-busca > div > div.vtex-store__template.bg-base > div > div:nth-child(3) > div > div")?.append(htmlCustom);
        });
    }, [])

    return null

}

export default TagSearchLinx;