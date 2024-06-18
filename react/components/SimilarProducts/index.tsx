import React, { useContext, useEffect, useState, useRef } from "react"
import { ProductContext } from "vtex.product-context"

import "./global.css"

const SimilarProducts = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [sabor, setSabor] = useState<any>();
    const [openClass, setOpenClass] = useState("closed");
    const productContext = useContext(ProductContext);
    // @ts-ignore
    const prodID = productContext?.product?.productId;
    const wrapperRef = useRef(null);

    // Faz a requisição e e armazena o resultado numa variável de useState.
    useEffect(() => {
        fetch('/api/catalog_system/pub/products/crossselling/similars/' + prodID)
            .then((resp) => {
                return resp.json()
            })
            .then((result: any) => {

                let similars = result;
                listSimilars(similars)
            })
    }, [])

    // Esta função seta uma classe como Open e Closed para uso na renderização e no botão.
    function setOpenClose() {
        if (openClass == "closed") {
            setOpenClass("open");
        } else {
            setOpenClass("closed");
        }
    }

    // Esta função seta e limpa um evento de clique para tudo que não for parametrizado por ela.
    function useOutsideAlerter(ref:any) {
        useEffect(() => {

            function handleClickOutside(event:any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenClass("closed");
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    // Executa a função acima e passa o hook useRef como parâmetro e anula seu valor.
    useOutsideAlerter(wrapperRef);

    // Lista os similares vindo de um array e pré-renderiza numa variável a lista de produtos similares para uso na renderização.
    const listSimilars = (item: any) => {

        let getSabor = item ? item.map(sku =>
            sku?.productName?.includes('Menos Sódio') ?
            <li className="sabor-item">
                <a href={sku?.link}>
                    {sku?.Sabor} Menos Sódio
                </a>
            </li>
            :
            <li className="sabor-item">
                <a href={sku?.link} >
                    {sku?.Sabor}
                </a>
            </li>

        ) : null;

        setSabor(getSabor);

        // Verifica se o item existe e se tem conteúdo, e seta o carregamento do componente como verdadeiro.
        if (item.length > 0) {
            setIsLoaded(true)
        } else {
            setIsLoaded(false)
        }
    }

    // Verifica se o carregamento foi definido como verdadeiro e renderiza o componente.
    return isLoaded ? (
        <div className="content--similar-product" ref={wrapperRef}>
            <div className="list-products--similar">
                <button className={`list-products--button ${openClass}`} onClick={setOpenClose}>Outros sabores</button>
                <ul className={`list-products--list ${openClass}`}>
                    {sabor}
                </ul>
            </div>
        </div>
    ) : null
}

export default SimilarProducts
