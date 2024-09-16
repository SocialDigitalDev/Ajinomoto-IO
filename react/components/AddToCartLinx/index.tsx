import React, { useEffect } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { useOrderForm } from "vtex.order-manager/OrderForm";

declare global {
    interface Window { addItens: any; dataLayer: any; }
}

const AddToCartLinx = () => {
    const { addItems } = useOrderItems();
    const { orderForm } = useOrderForm();

    console.log(orderForm, "orderForm");
    
    

    useEffect(()=> {
        const cartItems = orderForm?.items;

        if (!window.addItens) {
            window.addItens = function(items: any) {

                if (cartItems.length > 0) {
                    cartItems.forEach(element => {
                        console.log(element, "cartItems foreach");
                        if (element.id == items.id) {
                            let totalItems = element.quantity + items.quantity;
                            const newObjItems = { id: element.quantity, seller: "1", quantity: totalItems };

                            addItems(newObjItems);
                        }
                    });

                    if(items.length && items.length > 1) {
                        cartItems.forEach(element => {
                            console.log(element, "cartItems foreach");
                            
                            items.forEach(el => {
                                console.log(el, "Items foreach");
                                if (element.id == el.id) {
                                    let totalItems = element.quantity + el.quantity;
                                    const newObjItems = { id: element.quantity, seller: "1", quantity: totalItems };
        
                                    addItems(newObjItems);
                                }
                            });
                        });
                    }
                } else {
                    addItems(items);
                }
                
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

