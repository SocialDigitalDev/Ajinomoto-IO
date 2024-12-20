import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "vtex.product-context"
import { FormattedCurrency } from "vtex.format-currency"
import { useOrderForm } from "vtex.order-manager/OrderForm"

import './global.css'

const BuyTogether = () => {

    const { orderForm } = useOrderForm()
    const [totalizer, setTotalizer] = useState<number>()
    const [toCart, setToCart] = useState<any>([])
    const [listProduct, setProduct] = useState<any>([])
    const [show, setShow] = useState(false);
    const productContext = useContext(ProductContext)
    // @ts-ignore
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
            .then((response) => {
                console.log('success', response)
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
                    <i className="icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="58" viewBox="0 0 72 58" fill="none">
                            <g clip-path="url(#clip0_1249_5356)">
                                <path d="M65.6644 15.9185C65.6644 15.9185 65.6465 15.8915 65.6376 15.8825C67.3378 13.4951 69.0738 9.78339 67.2125 6.08069C64.5548 0.774383 56.0268 -1.39679 52.868 0.927536C51.7763 1.71132 50.9351 2.64826 50.2908 3.56718C45.9955 1.86447 41.2349 0.990599 35.991 0.972581C30.7561 0.990599 25.9955 1.86447 21.7002 3.56718C21.0559 2.64826 20.2237 1.71132 19.123 0.927536C15.9642 -1.4058 7.43621 0.765374 4.77849 6.08069C2.91719 9.78339 4.65321 13.4951 6.35343 15.8825C6.34448 15.8915 6.33553 15.9095 6.32659 15.9185C0.912715 23.5492 -1.20809 32.5041 0.671105 39.8825C2.14761 45.7023 6.06708 50.3059 12 53.1888C18.2908 56.2519 26.3534 57.8735 35.9821 57.9996H36.0268C45.6465 57.8645 53.7181 56.2519 60.0089 53.1888C65.9418 50.3059 69.8613 45.7023 71.3378 39.8825C73.208 32.5041 71.0872 23.5402 65.6733 15.9185" fill="#E60012" />
                                <path d="M35.991 4.09911C24.3489 4.14415 15.2214 8.72974 8.859 17.7297C4.03573 24.5225 2.04916 32.7117 3.67779 39.1171C4.93954 44.0901 8.19681 47.8829 13.3512 50.3874C19.2214 53.2433 26.8456 54.7658 36.0089 54.8919C45.1633 54.7658 52.7874 53.2523 58.6666 50.3874C63.821 47.8829 67.0782 44.0901 68.34 39.1171C69.9686 32.7207 67.9731 24.5225 63.1498 17.7387C56.7874 8.72974 47.6509 4.14415 36.0089 4.09911" fill="white" />
                                <path d="M36.0089 27.964C38.1924 27.964 39.991 26.6937 39.991 25.1081C39.991 23.5225 38.1924 22.2342 36.0089 22.2342C33.8255 22.2342 32.0089 23.5225 32.0089 25.1081C32.0089 26.6937 33.7986 27.964 36.0089 27.964Z" fill="#E60012" />
                                <path d="M25.8255 23.3243C27.3915 21.5856 29.3602 20.1892 30.6488 18.2162C32.7159 15.036 32.4117 10.8469 29.1007 8.97298C28.5459 8.6937 27.839 8.55856 27.1857 8.40541C26.5951 8.45946 26.0314 8.40541 25.4408 8.54955C22.9889 9.10811 21.0649 10.3694 18.9889 11.7748C17.7092 12.6306 16.5012 13.7207 15.4094 14.7117C13.0023 16.8829 11.6958 20.1802 12.4027 23.5225C12.7786 25.3874 13.9777 26.7387 15.5884 27.7117C17.1097 28.6487 19.0694 28.7658 20.5996 28.1081C23.0336 27.0451 24.1522 25.1441 25.8076 23.3153M27.5347 11.4054C28.3132 11.4054 28.9307 12.018 28.9307 12.7838C28.9307 13.5496 28.3222 14.1622 27.5347 14.1622C26.7472 14.1622 26.1656 13.5676 26.1656 12.7838C26.1656 12 26.7741 11.4054 27.5347 11.4054Z" fill="#E60012" />
                                <path d="M56.5816 14.7117C55.4899 13.7117 54.2908 12.6306 53.0022 11.7748C50.9261 10.3694 49.0022 9.10811 46.5503 8.54955C45.9686 8.40541 45.3959 8.45946 44.8053 8.40541C44.1431 8.55856 43.4362 8.70271 42.8903 8.97298C39.5794 10.8469 39.2841 15.036 41.3422 18.2162C42.6308 20.1802 44.5995 21.5856 46.1655 23.3243C47.8299 25.1532 48.9485 27.0541 51.3735 28.1171C52.9037 28.7748 54.8724 28.6577 56.3847 27.7207C57.9955 26.7387 59.1946 25.3964 59.5794 23.5315C60.2863 20.1892 58.9798 16.8919 56.5726 14.7207M44.4295 14.1802C43.6509 14.1802 43.0335 13.5856 43.0335 12.8018C43.0335 12.018 43.642 11.4234 44.4295 11.4234C45.2169 11.4234 45.7986 12.036 45.7986 12.8018C45.7986 13.5676 45.1901 14.1802 44.4295 14.1802Z" fill="#E60012" />
                                <path d="M48.7964 27.6306C48.0805 27.2703 47.2125 27.5586 46.8456 28.2793C46.7114 28.5496 43.4184 34.9009 36 34.9009C28.5817 34.9009 25.2886 28.5496 25.1544 28.2793C24.7964 27.5586 23.9195 27.2613 23.2036 27.6216C22.4877 27.982 22.1924 28.8649 22.5503 29.5856C22.7204 29.9189 26.7472 37.8198 35.9911 37.8198C45.2349 37.8198 49.2618 29.9189 49.4318 29.5856C49.7897 28.8649 49.5034 27.991 48.7875 27.6306" fill="#E60012" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1249_5356">
                                    <rect width="72" height="58" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </i>
                    <h2>Tudo certo!</h2>
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
                        <img className="prod-img" src={product?.items[0].images[0].imageUrl} />
                    </div>
                    <div className="buy-together--right">
                        <div className="buy-together--prod-name">
                            <h3>{product?.items[0].name}</h3>
                        </div>
                        <div className="buy-together--prod-price">
                            {product?.items[0].sellers[0].commertialOffer.ListPrice !== product?.items[0].sellers[0].commertialOffer.Price ? (
                                <div className="prod-prices">
                                    <span className="preco-de">
                                        <FormattedCurrency value={Number(product?.items[0]?.sellers[0]?.commertialOffer?.ListPrice)} />
                                    </span>
                                    <span className="preco-por">
                                        <FormattedCurrency value={Number(product?.items[0].sellers[0].commertialOffer.Price)} />
                                    </span>
                                </div>
                            ) : (
                                <span className="preco-por"><FormattedCurrency value={Number(product?.items[0].sellers[0].commertialOffer.Price)} /></span>
                            )}
                        </div>
                    </div>
                </li>

                <div className="plus-ico">
                    <svg width="62" height="63" viewBox="0 0 62 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M62 27.7343H35.4897V0.974854H26.5103V27.7343H0V36.3617H26.5103V62.9748H35.4897V36.3617H62V27.7343Z" fill="black" />
                    </svg>
                </div>

                {listProduct && listProduct.map((item: any, idx: any) => {
                    return (
                        <li className="buy-together prod-list" key={idx}>
                            <div className="buy-together--left">
                                <img className="prod-img" src={item.items[0].images[0].imageUrl} />
                            </div>
                            <div className="buy-together--right">
                                <div className="buy-together--prod-name">
                                    <h3>{item.items[0].name}</h3>
                                </div>
                                <div className="buy-together--prod-price">
                                    {item.items[0].sellers[0].commertialOffer.ListPrice !== item.items[0].sellers[0].commertialOffer.Price ? (
                                        <div className="prod-prices">
                                            <span className="preco-de"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.ListPrice} /></span>
                                            <span className="preco-por"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.Price} /></span>
                                        </div>
                                    ) : (
                                        <span className="preco-por"><FormattedCurrency value={item.items[0].sellers[0].commertialOffer.Price} /></span>
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
    ) : null
}

export default BuyTogether
