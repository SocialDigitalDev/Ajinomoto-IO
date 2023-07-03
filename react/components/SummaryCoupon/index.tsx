/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React from 'react'
import { OrderCoupon } from 'vtex.order-coupon'

import { Coupon } from '../Coupon'

interface MinicartCouponProps {
  callback: Function
  orderForm: any
  marketingDataPromotion: any
}

export const SummaryCoupon: StorefrontFunctionComponent<MinicartCouponProps> = ({
  callback,
  orderForm,
  marketingDataPromotion
}) => {
  console.log(">>>>>>>>>", marketingDataPromotion)

  return (
    <OrderCoupon.OrderCouponProvider>
      <Coupon
        callback={callback}
        orderForm={orderForm}
      />
    </OrderCoupon.OrderCouponProvider>
  )
}
