/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
import React from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
// import { useOrderShipping } from 'vtex.order-shipping/OrderShipping'

interface ListSLAProps {
  name: string
  price: number
  index: number
  deliveryEstimate: string
  itemSelected: boolean
  orderForm: any
  callback: Function
}

export const ListSLA = ({
  name,
  price,
  index,
  deliveryEstimate,
  itemSelected
}: ListSLAProps) => {
  const deliveryDay = deliveryEstimate.match(/\d+/g) ?? 1
  
  return (
    <button
      className="minicart-footer-shipping__item"
      tabIndex={index}      
    >
      <input
        type="radio"
        id={name}
        name="list-sla"
        value={name}
        defaultChecked={itemSelected}
        className="minicart-footer-shipping__input"
      />
      <label htmlFor={name} className="minicart-footer-shipping__label">
        <div className="minicart-footer-shipping__icon">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="25" cy="25" r="24.5" fill="#FAEEFF" stroke="#370F49" />
            <path
            d="M24.9997 27.5H26.2497C27.6247 27.5 28.7497 26.375 28.7497 25V12.5H17.4997C15.6247 12.5 13.9872 13.5375 13.1372 15.0625"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M12.5 31.25C12.5 33.325 14.175 35 16.25 35H17.5C17.5 33.625 18.625 32.5 20 32.5C21.375 32.5 22.5 33.625 22.5 35H27.5C27.5 33.625 28.625 32.5 30 32.5C31.375 32.5 32.5 33.625 32.5 35H33.75C35.825 35 37.5 33.325 37.5 31.25V27.5H33.75C33.0625 27.5 32.5 26.9375 32.5 26.25V22.5C32.5 21.8125 33.0625 21.25 33.75 21.25H35.3625L33.225 17.5125C32.775 16.7375 31.95 16.25 31.05 16.25H28.75V25C28.75 26.375 27.625 27.5 26.25 27.5H25"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M20 37.5C21.3807 37.5 22.5 36.3807 22.5 35C22.5 33.6193 21.3807 32.5 20 32.5C18.6193 32.5 17.5 33.6193 17.5 35C17.5 36.3807 18.6193 37.5 20 37.5Z"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M30 37.5C31.3807 37.5 32.5 36.3807 32.5 35C32.5 33.6193 31.3807 32.5 30 32.5C28.6193 32.5 27.5 33.6193 27.5 35C27.5 36.3807 28.6193 37.5 30 37.5Z"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M37.5 25V27.5H33.75C33.0625 27.5 32.5 26.9375 32.5 26.25V22.5C32.5 21.8125 33.0625 21.25 33.75 21.25H35.3625L37.5 25Z"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M12.5 20H20"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M12.5 23.75H17.5"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
            <path
            d="M12.5 27.5H15"
            stroke="#370F49"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="minicart-footer-shipping__infos">
          <p className="minicart-footer-shipping__name">{name}</p>
          <p className="minicart-footer-shipping__price">
            Pedido pronto em até{' '}
            {+deliveryDay > 1
              ? `${deliveryDay} dias úteis`
              : `${deliveryDay} dia útil`}
            {/* {deliveryDay === 1 ? `${deliveryDay}úteis` : `${deliveryDay}útil`} */}
          </p>
          <p className="minicart-footer-shipping__price">
            {price === 0 ? (
              'Frete Grátis'
            ) : (
              <FormattedCurrency value={price / 100} />
            )}
          </p>
        </div>

        <span className="minicart-footer-shipping__select" />
      </label>
    </button>
  )
}
