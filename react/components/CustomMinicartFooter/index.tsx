/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { OrderQueueProvider } from 'vtex.order-manager/OrderQueue'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
import { FormattedCurrency } from 'vtex.format-currency'
import { OrderShippingProvider } from 'vtex.order-shipping/OrderShipping'

import { schema } from './schema'
import type { MinicartProps } from './types'
import { VendorCode } from '../VendorCode'
import { MinicartShipping } from '../Shipping'
import { SummaryCoupon } from '../SummaryCoupon'
import { ListSLA } from '../Shipping/ListSLA'

import './global.css'

export const CustomMinicartFooter: StorefrontFunctionComponent<
  MinicartProps
> = ({ cupomDesconto = true, cupomVendedor = true, frete = true }) => {
  const { orderForm, setOrderForm } = useOrderForm()

  const [subTotal, setSubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [installments, setInstallments] = useState<any>()
  const [cupom, setCupom] = useState<any>()
  const [marketingDataPromotion, setMarketingDataPromotion]: any = useState({});

  const getValueFromOrderFormTotalizers = (item: string) => {
    const value = orderForm?.totalizers.find(
      (totalizer: any) => totalizer.id.toLowerCase() === item
    )

    return value
  }

  const getSubTotal = () => {
    const itemsTotal = getValueFromOrderFormTotalizers("items")

    const subtotalValue = itemsTotal ? itemsTotal.value / 100 : 0

    setSubTotal(subtotalValue)
  }

  const getDiscount = (updatedOrderForm: any) => {
    const discountTotal = updatedOrderForm?.totalizers.find(
      (totalizer: any) => totalizer.id.toLowerCase() === 'discounts'
    )

    const discountValue = discountTotal ? (discountTotal.value / 100) * -1 : 0

    setDiscount(discountValue)
  }

  const getTotal = () => {
    const itemsTotal = getValueFromOrderFormTotalizers("items")

    const discountTotal = getValueFromOrderFormTotalizers("discounts")

    const shippingTotal = getValueFromOrderFormTotalizers("shipping")

    const totalValue = itemsTotal
      ? Math.max(
        0,
        itemsTotal.value +
        (discountTotal ? discountTotal.value : 0) +
        (shippingTotal ? shippingTotal.value : 0)
      ) / 100
      : 0

    setTotal(totalValue)
  }

  const getShipping = () => {
    const shippingTotal = getValueFromOrderFormTotalizers("shipping")

    const totalValue = shippingTotal ? shippingTotal.value / 100 : null

    setShipping(totalValue)
  }

  const getDeliveryOptions = (updatedOrderForm: any) => {
    const listDelivery = updatedOrderForm?.shipping?.deliveryOptions
    // const uniqueDeliveryOptions: any = [];

    // const temp: any = {};

    // listDelivery.forEach((option: { id: string }) => {
    //   if (!temp[option.id]) {
    //     temp[option.id] = true;
    //     uniqueDeliveryOptions.push(option);
    //   }
    // });

    const pricesById = listDelivery.reduce((accumulator: any, item: any) => {
      if (accumulator[item.id]) {
        accumulator[item.id].price += item.price;
      } else {
        accumulator[item.id] = {
          id: item.id,
          deliveryChannel: item.deliveryChannel,
          price: item.price,
          estimate: item.estimate,
          isSelected: item.isSelected,
          __typename: "DeliveryOption"
        };
      }

      return accumulator
    }, {});

    const pricesArray: any = Object.values(pricesById);

    // setDeliveryOptions(listDelivery);
    setDeliveryOptions(pricesArray)
  }

  const getInstallments = () => {
    const listInstallments = orderForm?.paymentData?.installmentOptions[0]?.installments

    const lastItemFromArray = listInstallments && listInstallments[listInstallments.length - 1] || false

    setInstallments(lastItemFromArray)
  }

  const getCupons = () => {
    const listCupom = orderForm?.marketingData?.coupon

    setCupom(listCupom)
  }

  const updateOrderForm = (orderFormReceived: any) => {
    setOrderForm(orderFormReceived)
    console.log("🚀 ~ file: index.tsx:134 ~ updateOrderForm ~ orderFormReceived:", orderFormReceived)
  }

  const getOrderForm = () => {
    const fetchOptions: any = {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/json; charset=UTF-8',
        'sec-fetch-mode': 'cors',
      },
      body: '',
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    }

    fetch(`/api/checkout/pub/orderform/${orderForm.id}`, fetchOptions)
      .then((data: any) => data.json())
      .then((orderFormResultAttachments: any) => {
        orderForm.shipping =
          orderFormResultAttachments?.shipping || orderForm?.shipping
        orderForm.marketingData =
          orderFormResultAttachments?.marketingData || orderForm?.marketingData
        orderForm.totalizers =
          orderFormResultAttachments?.totalizers || orderForm?.totalizers
        const orderFormAttached = orderForm.items?.map((orderFormItem: any) => {
          const item = orderFormResultAttachments?.items?.find(
            (orderFormResultAttachmentsItem: any) =>
              orderFormItem.uniqueId === orderFormResultAttachmentsItem.uniqueId
          )

          orderFormItem.attachments =
            item?.attachments || orderFormItem.attachments

          return orderFormItem
        })

        orderForm.items = orderFormAttached
        setMarketingDataPromotion(orderForm.marketingData);
        setOrderForm(orderForm)
        console.log("🚀KK ~ file: index.tsx:23 ~ orderForm:", orderForm)
      })
  }

  useEffect(() => {
    getOrderForm()
  }, [])

  useEffect(() => {
    getSubTotal()
    getDiscount(orderForm)
    getTotal()
    getInstallments()
    getCupons()
    getShipping()
    getDeliveryOptions(orderForm)
  }, [orderForm])

  return (
    <OrderQueueProvider>
      <OrderFormProvider>
        <OrderShippingProvider>
          <div className="minicart-footer__container">
            <div className="minicart-footer__fields">
              {frete && (
                <>
                  <div className="minicart-footer__field minicart-footer__field--shipping">
                    <MinicartShipping
                      callback={updateOrderForm}
                      orderForm={orderForm}
                    />
                  </div>

                  <div className="minicart-footer-shipping">
                    {deliveryOptions.length ? (
                      <p className='minicart-footer-shipping__title-resume'>
                        Opções de entrega disponíveis para este CEP
                      </p>
                    ) : ''}
                    <div className="minicart-footer-shipping__list">
                      {
                        deliveryOptions?.map((item: any, index: number) => {
                          return (
                            <ListSLA
                              key={index}
                              index={index}
                              name={item.id}
                              price={item.price}
                              deliveryEstimate={item.estimate}
                              itemSelected={item.isSelected}
                              callback={getOrderForm}
                              orderForm={orderForm}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                </>
              )}

              {cupomDesconto && (
                <div className="minicart-footer__field minicart-footer__field--coupon">
                  {/* <SummaryCoupon /> */}
                  <SummaryCoupon
                    callback={updateOrderForm}
                    orderForm={orderForm}
                    marketingDataPromotion={marketingDataPromotion}
                  />
                </div>
              )}

              {cupomVendedor && (
                <div className="minicart-footer__field minicart-footer__field--vendor">
                  <VendorCode />
                </div>
              )}
            </div>

            <div className="minicart-footer__summary">

              <div className="minicart-footer__summary-content">
                <span>Resumo do pedido</span>
                {
                  shipping || true ? (
                    <div className="minicart-footer__totalizers minicart-footer__totalizers--shipping">
                      <span className="shipping__label minicart-footer__totalizers-label">
                        Frete
                      </span>
                      <span className="shipping__value minicart-footer__totalizers-value">
                        {shipping === null ? "-" : shipping === 0 ? <span className="shipping__free">Grátis</span> : <FormattedCurrency value={shipping ? +shipping : 0} />}
                      </span>
                    </div>
                  ) : ''
                }

                <div className="minicart-footer__totalizers minicart-footer__totalizers--cupom">
                  <span className="cupom__label minicart-footer__totalizers-label">
                    Cupom
                  </span>
                  <span className="cupom__value minicart-footer__totalizers-value">
                    {cupom || '-'}
                  </span>
                </div>

                {
                  discount || true ? (
                    <div className="minicart-footer__totalizers minicart-footer__totalizers--discount">
                      <span className="discount__label minicart-footer__totalizers-label">
                        Você economizou
                      </span>
                      <span className="discount__value minicart-footer__totalizers-value">
                        {discount ? <FormattedCurrency value={discount} /> : "-"}
                      </span>
                    </div>
                  ) : ''
                }

                <div className="minicart-footer__totalizers minicart-footer__totalizers--subtotal">
                  <span className="subtotal__label minicart-footer__totalizers-label">
                    Subtotal
                  </span>
                  <span className="subtotal__value minicart-footer__totalizers-value">
                    <FormattedCurrency value={subTotal} />
                  </span>
                </div>

                <div className="minicart-footer__totalizers minicart-footer__totalizers--total">
                  <span className="total__label minicart-footer__totalizers-label">
                    Total
                  </span>
                  <span className="total__value minicart-footer__totalizers-value">
                    <FormattedCurrency value={total} />
                  </span>
                </div>

                {
                  installments ? (
                    <div className="minicart-footer__totalizers minicart-footer__totalizers--installment">
                      <span className="installment__label minicart-footer__totalizers-label" />
                      <span className="installment__value minicart-footer__totalizers-value">
                        ou <FormattedCurrency value={installments?.value / 100 || 0} /> em {installments?.count}x sem juros
                      </span>
                    </div>
                  ) : ''
                }

                <div className="minicart-footer__buttons">
                  <a href="/checkout#/email" rel="noopener noreferrer" className="minicart-footer-link">
                    <button className="minicart-footer-button">
                      Finalizar compra
                    </button>
                  </a>

                  <a href="javascript:void(0)" rel="noopener noreferrer" className="minicart-footer-link">
                    <button className="minicart-footer-button--outline">
                      Continuar comprando
                    </button>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </OrderShippingProvider>
      </OrderFormProvider>
    </OrderQueueProvider>
  )
}

CustomMinicartFooter.schema = schema