/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { OrderCoupon } from 'vtex.order-coupon'

import './global.css'

interface MinicartInputProps {
  callback: Function
  orderForm: any
}

const { useOrderCoupon } = OrderCoupon

const NO_ERROR = ''

const errorMessages = {
  couponNotFound: 'Cupom inválido',
  couponExpired: 'Cupom expirado',
}

export const Coupon: StorefrontFunctionComponent<MinicartInputProps> = ({
  callback,
  orderForm
}) => {
  const { coupon, insertCoupon } = useOrderCoupon()

  const getOrderForm = () => {
    const fetchOptions: any = {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/json; charset=UTF-8",
        "sec-fetch-mode": "cors",
      },
      body: "",
      method: "POST",
      mode: "cors",
      credentials: "include",
    };

    fetch(`/api/checkout/pub/orderform/${orderForm.id}`, fetchOptions)
      .then((data: any) => {
        console.log('data')

        return data.json()
      })
      .then((orderFormResultAttachments: any) => {
        // window.sessionStorage.setItem("session_code_vendor", "true")
        console.log('orderFormResultAttachments')
        console.log(orderFormResultAttachments)
        orderForm.marketingData =
          orderFormResultAttachments?.marketingData || orderForm?.marketingData;
        orderForm.totalizers =
          orderFormResultAttachments?.totalizers || orderForm?.totalizers;
        const orderFormAttached = orderForm.items?.map((orderFormItem: any) => {
          const item = orderFormResultAttachments?.items?.find(
            (orderFormResultAttachmentsItem: any) =>
              orderFormItem.uniqueId === orderFormResultAttachmentsItem.uniqueId
          );

          orderFormItem.attachments =
            item?.attachments || orderFormItem.attachments;

          return orderFormItem;
        });

        // console.log('orderform 2')
        orderForm.items = orderFormAttached;
        callback(orderForm)
      });
  };

  // const [showPromoButton, setShowPromoButton] = useState(!!coupon)
  const [errorKey, setErrorKey] = useState(NO_ERROR)
  const [currentCoupon, setCurrentCoupon] = useState('')
  const [loadingCoupon, setLoadingCoupon] = useState(false)

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()

    if (!newCoupon) {
      setErrorKey(NO_ERROR)
    }
  }

  const handleCouponChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const newCoupon = evt.target.value.trim()

    setCurrentCoupon(newCoupon)
  }

  const resetCouponInput = () => {
    insertCoupon('')
    setCurrentCoupon('')
    // setShowPromoButton(false)
  }

  const submitCoupon = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setErrorKey(NO_ERROR)
    insertCoupon(currentCoupon).then((result: any) => {
      console.log('result', result, currentCoupon)
      setLoadingCoupon(false)
      if (result.success) {
        setErrorKey(NO_ERROR)
        // setShowPromoButton(true)
      } else {
        setErrorKey(result.errorKey)
      }

      getOrderForm()
    })
    setLoadingCoupon(true)
  }

  return (
    <div className="coupon-custom">
      <p className="coupon-custom-title">Cupom de desconto</p>
      <form onSubmit={submitCoupon}>

        <fieldset className={errorKey ? "fieldset-error" : ''}>
          <div className="input-group">
            <input
              id="coupon-input"
              type="text"
              // autoFocus
              onChange={handleCouponChange}
              onBlur={handleBlur}
              placeholder="Insira seu cupom aqui"
              value={currentCoupon}
            />
          </div>

          <button type="submit">
            {loadingCoupon ? (
              <div className="lds-ring">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              'Aplicar'
            )}
          </button>
        </fieldset>

        {errorKey ? (
          <span className="error-text">
            {errorMessages[errorKey as keyof typeof errorMessages]}
          </span>
        ) : (
          NO_ERROR
        )}

        <span className='coupon-message'>Vale presente é válido apenas no checkout</span>

        {coupon && (
          <div className="coupon-data">
            <span className="coupon-label">Cupom</span>

            <div className="coupon-code">
              <span>{coupon}</span>

              <button onClick={resetCouponInput}>
                <i>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6.5L6 18.5"
                      stroke="#535353"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6.5L18 18.5"
                      stroke="#535353"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </i>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}