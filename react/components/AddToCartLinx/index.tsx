import React, { useEffect } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";

declare global {
    interface Window { addItens: any; dataLayer: any; }
}

const AddToCartLinx = () => {
    const { addItems } = useOrderItems();

    useEffect(()=> {
        if (!window.addItens) {
            window.addItens = function(items: any) {
                
                addItems(items);
                let element: HTMLElement = document?.querySelector(".vtex-minicart-2-x-openIconContainer .vtex-button") as HTMLElement;

                setTimeout(() => {
                    element.click();
                }, 2000);
            };
        };
    }, [addItems])

    return <></>

}

export default AddToCartLinx;

