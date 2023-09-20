/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react'
import { OrderQueueProvider } from 'vtex.order-manager/OrderQueue'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'
// import { FormattedCurrency } from 'vtex.format-currency'
import { Progress } from 'vtex.styleguide'

import './global.css'

interface ShippingBarProps {
  shippingValue: number
  initialMessage: string
  successMessage: string
}

const ShippingBar: StorefrontFunctionComponent<ShippingBarProps> = ({
  shippingValue = 15000,
  initialMessage = 'Faltam {valor} para Frete Grátis!',
  successMessage = 'Você ganhou Frete Grátis!',
}) => {
  const { orderForm } = useOrderForm()
  const [value, setValue] = useState(0)

  // eslint-disable-next-line no-console
  const [percent, setPercent] = useState(0)

  const getValue = () => {
    const itemsTotal = orderForm?.value

    const subtotalValue = itemsTotal ? itemsTotal / 100 : 0

    setValue(subtotalValue)
  }

  const getPercent = () => {
    const percent = (orderForm?.value / shippingValue) * 100 || 0

    setPercent(percent)
  }

  useEffect(() => {
    getValue()
    getPercent()
  }, [orderForm])

  return (
    <OrderQueueProvider>
      <OrderFormProvider>
        <div className="shippingBar">
          {shippingValue - orderForm?.value > 0 ? (
            <p
              dangerouslySetInnerHTML={{
                __html: initialMessage.replace(
                  '{valor}',
                  `<span
                    class="shippingBar--value">
                    ${(shippingValue / 100 - value).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}</span>`
                ),
              }}
            />
          ) : (
            <p>
              <strong>{successMessage}</strong>
            </p>
          )}

          <Progress percent={percent} success type="line" />
        </div>
      </OrderFormProvider>
    </OrderQueueProvider>
  )
}

ShippingBar.schema = {
  title: 'Banner de frete',
  type: 'object',
  properties: {
    shippingValue: {
      title: 'Valor frete grátis',
      type: 'number',
      default: 15000,
    },
    initialMessage: {
      title: 'Mensagem inicial',
      type: 'string',
      default: 'Faltam {valor} para Frete Grátis!',
    },
    successMessage: {
      title: 'Mensagem de sucesso',
      type: 'string',
      default: 'Você ganhou Frete Grátis!',
    },
  },
}

export default ShippingBar
