import React from "react"
import { useOrderForm } from "vtex.order-manager/OrderForm"
import { FormattedCurrency } from "vtex.format-currency"

import "./global.css"

const ProgressBar = () => {

    const { orderForm } = useOrderForm()

    let total = orderForm?.totalizers[0]?.value

    let restante = (15000 - total)
    restante = restante / 100

    let percentual = (total * 100) / 15000;

    let width = percentual;


    let style = {
        freeShippingPercent: {
            width: `${width}%`
        },
        fullPercent: {
            width: `100%`
        }
    }

    return orderForm ? (
        <div className="progress-bar">
            <div className="progress-bar--content">
               { (total === 0) || (total === undefined) ? (
                    <div className="free-shipping-text-bar">
                        <p>Faltam R$ 150,00 para conseguir frete grátis</p>
                        <div className="free-shipping-outside-bar"><div className="free-shipping-inside-bar" style={style.freeShippingPercent}></div></div>
                    </div>
                ) : (restante > 0) ? (
                    <div className="free-shipping-text-bar">
                        <p className="in-progress">Faltam {<FormattedCurrency value={Number(restante)} />} para conseguir frete grátis</p>
                        <div className="free-shipping-outside-bar"><div className="free-shipping-inside-bar" style={style.freeShippingPercent}></div></div>
                    </div>
                ) : (restante <= 0) ? (
                    <div className="free-shipping-text-bar">
                        <p className="in-progress free-shipping">VOCÊ GANHOU FRETE GRÁTIS!</p>
                        <div className="free-shipping-outside-bar"><div className="free-shipping-inside-bar" style={style.fullPercent}></div></div>
                    </div>
                ) : null} 
            </div>
        </div>
    ) : null
}

export default ProgressBar