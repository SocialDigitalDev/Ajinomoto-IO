import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import ViewLists from "./../../graphql/view-lists.gql"
import AddToList from "./../../graphql/add-item.gql"
import RemoveFromList from "./../../graphql/remove-item.gql"
import storageFactory from "../../utils/storage";
import { getSession } from "../../modules/session";

declare global {
    interface Window { addWishlist: any; removeWishlist: any; setWishlist: any; }
}

const localStore: any = storageFactory(() => sessionStorage)


const WishlistLinx = () => {

    const useSessionResponse = () => {
        const [session, setSession] = useState()
        const sessionPromise = getSession()
    
        useEffect(() => {
            if (!sessionPromise) {
                return
            }
    
            sessionPromise.then(sessionResponse => {
                const { response } = sessionResponse
    
                setSession(response)
            })
        }, [sessionPromise])
    
        return session
    }

    let isAuthenticated = JSON.parse(String(localStore.getItem('wishlist_isAuthenticated'))) ?? false;
    let shopperId = localStore.getItem('wishlist_shopperId') ?? null;

    const sessionResponse: any = useSessionResponse()

    if (sessionResponse) {
        isAuthenticated = isAuthenticated ? isAuthenticated :
        sessionResponse?.namespaces?.profile?.isAuthenticated?.value;
    
        shopperId = shopperId ? shopperId :  sessionResponse?.namespaces?.profile?.id?.value ?? null;

    }

    
    const { data } = useQuery(ViewLists, {
        variables: {
            shopperId: shopperId && shopperId
        },
        ssr: false
    })

    data && console.log(data, "data - ViewLists");
    data && localStore.setItem("wishlist_wishlisted", JSON.stringify(data?.viewLists[0]?.data));

    
    console.log("WishlistLinx");

    const [ wishAddItem ] = useMutation(AddToList);

    const [ wishRemoveItem ] = useMutation(RemoveFromList);


    function addWishItem(listItems: any) {
        wishAddItem({
            variables: {
                listItem: listItems,
                shopperId: shopperId
            },
        })
    }

    function removeWishItem(idItem: any) {
        wishRemoveItem({
            variables: {
                id: idItem,
                shopperId: shopperId
            },
        })
    }
    
    
    
    useEffect(()=> {

        if (isAuthenticated) {
            if (!window.addWishlist) {
                window.addWishlist = function(listItems: any) {
                    addWishItem(listItems);
                };
            };
    
            if (!window.setWishlist) {
                window.setWishlist = function() {
                    const list: any = window?.sessionStorage.getItem("wishlist_wishlisted")
                    return JSON.parse(list);
                };
            };

            if (!window.removeWishlist) {
                window.removeWishlist = function(idItem: any) {
                    removeWishItem(idItem);
                };
            };
        }

    }, [data]);
    

    return <></>;
}

export default WishlistLinx;

