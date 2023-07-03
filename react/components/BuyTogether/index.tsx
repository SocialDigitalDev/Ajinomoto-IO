import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "vtex.product-context"
import { FormattedCurrency } from "vtex.format-currency"
import { useOrderForm } from "vtex.order-manager/OrderForm"

import "./global.css"

const BuyTogether = () => {
	
	const { orderForm } = useOrderForm()
	const [totalizer, setTotalizer] = useState<number>()
	const [toCart, setToCart] = useState<any>([])
    const [listProduct, setProduct] = useState<any>([])
	const [show, setShow] = useState(false);
    const productContext = useContext(ProductContext)
	const product = productContext?.product
    const prodID = product?.productId

	let skus: any = []
    let total: number = 0

    const listProducts = (item: any) => {

        setProduct(item)

		total = Number(item[0]?.items[0].sellers[0].commertialOffer.Price) + Number(product?.items[0].sellers[0].commertialOffer.Price)
		setTotalizer(total)		

		let prodSuggestion = {
			id: item[0].items[0].itemId,
			quantity: 1,
			seller: "1"
		}

		let thisProd = {
			id: product?.items[0].itemId,
			quantity: 1,
			seller: "1"
		}

		skus.push(prodSuggestion, thisProd)
		
		setToCart(skus)
	}
	
	const addToCart = (e: any) => {
        e.preventDefault()
        
        let t = ["items", "totalizers", "clientProfileData", "shippingData", "paymentData", "sellers", "messages", "marketingData", "clientPreferencesData", "storePreferencesData", "giftRegistryData", "ratesAndBenefitsData", "openTextField", "commercialConditionData", "customData"];
        let idOF = orderForm.id
        
        let data = {
            orderItems: toCart,
            expectedOrderFormSections: t
        }
        
        fetch(`/api/checkout/pub/orderForm/${idOF}/items?sc=1`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((resp) => {
            return resp.json()
        })
        .then(() => {
			setShow(currentShow => !currentShow)
        })
        .catch(err => {
            console.log('error', err);
        });
    }

	const reloadPage = (e: any) => {
		e.preventDefault()

		window.location.reload()
	}

	function PopUpSuccess() {
		return (
			<div className="buy-together--pop-up">
				<div className="buy-together--pop-up-content">
					<h2><i className="icon-success"></i>Tudo certo!</h2>
					<p>Seus produtos do "Compre Junto" foram adicionados a sacola!</p>
					<span onClick={reloadPage}>Confirmar</span>
				</div>
			</div>
		)
	}

    function ListProducts() {

        return (
            <ul className="buy-together--list-products">
                <li className="buy-together prod-list">
                    <div className="buy-together--left">
                        <img className="prod-img" src={ product?.items[0].images[0].imageUrl } />
                    </div>
                    <div className="buy-together--right">
                        <div className="buy-together--prod-name">
                            <h3>{ product?.items[0].name }</h3>
                        </div>
                        <div className="buy-together--prod-price">
                            { product?.items[0].sellers[0].commertialOffer.ListPrice !== product?.items[0].sellers[0].commertialOffer.Price ? (
                                <div className="prod-prices">
                                    <span className="preco-de">
										<FormattedCurrency value={Number(product?.items[0]?.sellers[0]?.commertialOffer?.ListPrice)} />
									</span>
                                    <span className="preco-por">
										<FormattedCurrency value={Number(product?.items[0].sellers[0].commertialOffer.Price)}/>
									</span>
                                </div>
                            ) : (
                                <span className="preco-por"><FormattedCurrency value={Number(product?.items[0].sellers[0].commertialOffer.Price)} /></span>
                            )}
                        </div>
                    </div>
                </li>
                <li className="buy-together prod-list icon">
                    <i>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7.26589H9.15862V0.360229H6.84138V7.26589H0V9.49231H6.84138V16.3602H9.15862V9.49231H16V7.26589Z" fill="#370F49"/>
                        </svg>
                    </i>
                </li>
                {listProduct && listProduct.map((item: any, idx: any) => {
                    return (
                        <li className="buy-together prod-list" key={idx}>
                            <div className="buy-together--left">
                                <img className="prod-img" src={item.items[0].images[0].imageUrl} />
                            </div>
                            <div className="buy-together--right">
                                <div className="buy-together--prod-name">
                                    <h3>{ item.items[0].name }</h3>
                                </div>
                                <div className="buy-together--prod-price">
                                    { item.items[0].sellers[0].commertialOffer.ListPrice !== item.items[0].sellers[0].commertialOffer.Price ? (
                                        <div className="prod-prices">
                                            <span className="preco-de"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.ListPrice} /></span>
                                            <span className="preco-por"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.Price}/></span>
                                        </div>
                                    ) : (
                                        <span className="preco-por"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.Price}  /></span>
                                    )}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        fetch(`/api/catalog_system/pub/products/crossselling/suggestions/${prodID}`).then(resp => resp.json()).then((result) => {
            const products = result
            listProducts(products)
        })
    }, [])

    return (product?.items[0]?.sellers[0]?.commertialOffer.AvailableQuantity != 0) && (listProduct.length !== 0) ? (
        <div className="buy-together--container">
            <div className="buy-together--content">
                <div className="buy-together--title">
                    <h3>Aproveite e compre junto</h3>
                </div>
                <div className="buy-together--products">
                    {<ListProducts />}
                    <div className="buy-together--total">
                        <div className="value-total">
                            <span className="val-total">
                                <small>Preço total</small>
                                <FormattedCurrency value={Number(totalizer)} />
                            </span>
                        </div>
                        <div className="buy-products">
                            <span className="btn-buy-products" onClick={addToCart}>Comprar junto</span>
                        </div>
                    </div>
                </div>
                {show ? <PopUpSuccess /> : null}
            </div>
        </div>
    ) : null
}

export default BuyTogether