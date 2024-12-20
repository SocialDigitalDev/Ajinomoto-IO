/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react'
import { OrderShippingProvider } from 'vtex.order-shipping/OrderShipping'

import { MinicartInput } from '../../MinicartInput'

import './global.css'

interface MinicartShippingProps {
  callback: Function
  orderForm: any
}

export const MinicartShipping: StorefrontFunctionComponent<
  MinicartShippingProps
> = ({ callback, orderForm }) => {
  const [isActive, setIsActive]: any = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const fetchOptions: any = {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'content-type': 'application/json; charset=UTF-8',
      'sec-fetch-mode': 'cors',
    },
    body: '{}',
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  }

  const fetchAlways = () => {
    setIsLoading(false)
  }

  const sendShippingAttachment = (body: any) => {
    return fetch(
      `/api/checkout/pub/orderForm/${orderForm.id}/attachments/shippingData`,
      { ...fetchOptions, body: JSON.stringify(body) }
    )
  }

  const addShipping = (inputCode = '') => {
    setIsLoading(true)

    sendShippingAttachment({
      address: !inputCode
        ? null
        : {
          addressType: 'search',
          country: orderForm?.storePreferencesData?.countryCode || 'BRA',
          postalCode: inputCode.replace(/\D/g, ''),
        },
      expectedOrderFormSections: [
        'items',
        'totalizers',
        'clientProfileData',
        'shippingData',
        'paymentData',
        'sellers',
        'messages',
        'marketingData',
        'clientPreferencesData',
        'storePreferencesData',
        'giftRegistryData',
        'ratesAndBenefitsData',
        'openTextField',
        'commercialConditionData',
        'customData',
        'shipping',
      ],
    })
      .then((data) => { return data.json() })
      .then((orderFormResult) => {
        const returnCode = orderFormResult?.shippingData?.address?.postalCode

        const hasSlas = orderFormResult?.shippingData?.logisticsInfo?.find?.(
          (item: any) => item?.slas?.length
        )

   

        if (inputCode && returnCode && hasSlas) {
          callback(transformOrderForm(orderFormResult))
          setIsActive(true)
        } else if (!inputCode) {
          callback(transformOrderForm(orderFormResult))
          setIsActive(false)
        } else {
          setIsActive(null)
        }

        return orderFormResult
      })
      .catch((err: any) => {
        console.log('err => ', err)
        setIsActive(null)
        // setShippingList([])
        // setSelectedSla('')
      })
      .then(fetchAlways, fetchAlways)
  }

  const getPostalCode = (orderForm: any) => {
    return orderForm?.shipping?.selectedAddress?.postalCode
  }

  const transformOrderForm = (newOrderForm: any) => {
    orderForm.shipping = {
      ...orderForm?.shipping,
      selectedAddress: {
        ...newOrderForm?.shippingData?.address,
        __typename: 'Address',
      },
      deliveryOptions: newOrderForm?.shippingData?.logisticsInfo
        ?.map?.((delivery: any) =>
          delivery.slas.map((sla: any) => {
            return {
              id: sla.id,
              deliveryChannel: sla.deliveryChannel,
              price: sla.price,
              estimate: sla.shippingEstimate,
              isSelected: sla.id === delivery.selectedSla,
              __typename: 'DeliveryOptionAAA',
            }
          })
        )
        .reduce?.((acc: any, curr: any) => {
          return acc.concat(curr)
        }),
      availableAddresses: newOrderForm?.shippingData?.availableAddresses.map(
        (address: any) => {
          return {
            ...address,
            __typename: 'Address',
          }
        }
      ),
    }

    orderForm.totalizers = newOrderForm?.totalizers?.length
      ? newOrderForm?.totalizers?.map((totalizer: any) => {
        return {
          ...totalizer,
          __typename: 'Totalizer',
        }
      })
      : orderForm.totalizers

    return orderForm
  }

  useEffect(() => {
    getPostalCode(orderForm) && setIsActive(true)
    setInputValue(getPostalCode(orderForm) || '')
  }, [orderForm])

  return (
    <OrderShippingProvider>
      <div className="shipping">
        <p className='shipping-title'>Calcule seu frete</p>
        <MinicartInput
          handle={addShipping}
          settings={{
            isActiveProp: isActive,
            value: inputValue,
            placeholder: 'Digite seu CEP',
            loading: isLoading,
            inputError: 'CEP inválido',
            regEx: '^(\\d{5})-?(\\d{3})$',
            maxLength: 8,
            labelId: 'shipping',
          }}
        />
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target='_blank'
          rel="noreferrer"
          className='shipping-link'
        >Não sei meu CEP</a>
      </div>
    </OrderShippingProvider>
  )
}
