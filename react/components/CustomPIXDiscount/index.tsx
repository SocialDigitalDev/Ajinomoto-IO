import React from "react";
import { useProduct } from "vtex.product-context";
import { FormattedCurrency } from "vtex.format-currency";
import { schema } from './schema';
import './global.css';

const CustomPIXDiscount = ({ enableComponent = true, percentualValue }: any) => {

    // Variáveis
    const { product } = useProduct();
    const sellingPrice = product?.priceRange?.sellingPrice?.highPrice;
    const discount = sellingPrice * percentualValue;
    const pixPrice = sellingPrice - discount;
    const percentageShow = percentualValue * 100;

    // O componente conta com uma função para ativar ou desativar no site editor e alterar o percentual com cálculo automático.
    return (
        <>
            {enableComponent && (
                <div className="custom-pix-price">
                    <p className="custom-pix-price__text">
                        Ou <span className="custom-pix-price__bold"><FormattedCurrency value={pixPrice}/></span> no PIX <b>({percentageShow}% OFF)</b>
                    </p>
                </div>
            )}
        </>
    );
}

CustomPIXDiscount.schema = schema;

export default CustomPIXDiscount;