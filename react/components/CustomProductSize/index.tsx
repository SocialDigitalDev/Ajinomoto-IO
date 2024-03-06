import React, {useEffect, useState} from "react";
import { useProduct } from "vtex.product-context";
import axios from "axios";
import './global.css';

const CustomProductSize = () => {
    //@ts-ignore
    const { product } = useProduct();
    const productId = product?.productId;
    const [renderData, setRenderData] = useState<any>();
    const actualProductSize = product?.properties?.find(item => item.name === "Tamanho")?.values[0];

    // Função que busca SKUs vinculados para a seleção de demais tamanhos.
    async function getAcessories() {
        await axios(`/api/catalog_system/pub/products/crossselling/accessories/${productId}`).then(function (response:any) {
            const data = response.data
            const arrayData = data?.map(item => <a href={item.link} className="item-size">{item.Tamanho}</a>);
            setRenderData(arrayData);
        });
    }

    // Função acima é executada em client side.
    useEffect(() => {
        getAcessories();
    }, [])
    
    // Verificação básica de existência de dados antes de renderizar.
    return actualProductSize ? (
        <div className="custom-product-size__wrapper">
            <p className="custom-product-size__available-text">Disponível em:</p>    
            <div className="custom-product-size__content">
                <div className="custom-product-size__actual">
                    <p className="item-size item-size__actual">{actualProductSize}</p>
                </div>
                <div className="custom-product-size__bound">
                    {renderData}
                </div>
            </div>
        </div>
    ) : null;
}

export default CustomProductSize;