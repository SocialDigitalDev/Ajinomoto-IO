/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { OrderForm } from 'vtex.order-manager'

interface VendorData {
  ativo: boolean
  vendedor: string
  cdv: string
}

type MarketingData = {
  coupon: string
  utmCampaign: string
  utmMedium: string
  utmSource: string
  utmiCampaign: string
  utmiPage: string
  utmiPart: string
  marketingTags: string[]
}

const VENDOR_TAG = 'vendorCode'
const VENDOR_TAG_PREFIX = 'vendorCode='

export const VendorCode = () => {
  const { orderForm } = OrderForm.useOrderForm()

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [vendorData, setVendorData] = useState<VendorData | null>(() => {
    const vendor = sessionStorage.getItem('vendor')

    if (vendor) {
      return JSON.parse(vendor)
    }

    return null
  })

  function getVendorTag(code: string) {
    return `${VENDOR_TAG_PREFIX}${code}`
  }

  function dupeStringArray(arr = []) {
    return arr.filter((item, pos, self) => self.indexOf(item) === pos)
  }

  async function getSettings(code: string) {
    return fetch(
      `/api/dataentities/VC/search?cdv=${code}&_fields=cdv,ativo,vendedor&_schema=v2`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/vnd.vtex.ds.v10.v2+json',
        },
      }
    ).then((data) => data.json())
  }

  async function getOrderForm() {
    return fetch(
      `/api/checkout/pub/orderForm/${orderForm.id}?refreshOutdatedData=true`,
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/json; charset=UTF-8',
          'sec-fetch-mode': 'cors',
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: '{"expectedOrderFormSections":["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"]}',
      }
    ).then((data) => data.json())
  }

  async function sendAttachment(marketingData: MarketingData) {
    return fetch(
      `/api/checkout/pub/orderForm/${orderForm.id}/attachments/marketingData`,
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/json; charset=UTF-8',
          'sec-fetch-mode': 'cors',
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(marketingData),
      }
    ).then((data) => data.json())
  }

  function save(vendor: VendorData) {
    if (!vendor?.ativo) {
      setError('Esse vendedor está inativo')

      return
    }

    return getOrderForm().then((orderForm) => {
      const marketingData = orderForm?.marketingData || {}
      let marketingTags = marketingData?.marketingTags || []

      if (vendor?.cdv) {
        marketingTags.push(VENDOR_TAG)
        marketingTags.push(getVendorTag(vendor.cdv))
      } else {
        marketingTags = marketingTags.filter((tag: string) => {
          return !(tag.includes(VENDOR_TAG) || tag.includes(VENDOR_TAG_PREFIX))
        })

        marketingTags = marketingTags.length ? marketingTags : null
      }

      marketingData.marketingTags = dupeStringArray(marketingTags)

      sessionStorage.setItem('vendor', JSON.stringify(vendor))

      return sendAttachment(marketingData)
    })
  }

  async function remove() {
    return getOrderForm().then((orderForm) => {
      const marketingData = orderForm?.marketingData || {}
      let marketingTags = marketingData?.marketingTags || []

      marketingTags = marketingTags.filter((tag: string) => {
        return !(tag.includes(VENDOR_TAG) || tag.includes(VENDOR_TAG_PREFIX))
      })

      marketingTags = dupeStringArray(marketingTags)

      marketingData.marketingTags = marketingTags.length ? marketingTags : []

      return sendAttachment(marketingData)
    })
  }

  function getVendor() {
    getOrderForm().then(function (orderForm) {
      sendAttachment(orderForm.marketingData)
    })
  }

  function renderVendor() {
    getVendor()
  }

  function insertVendor() {
    if (inputValue) {
      getSettings(inputValue)
        .then((result) => {
          setVendorData(result[0])

          if (result && result.length) {
            save(result[0])?.finally(() => {
              renderVendor()
            })
          }
        })
        .catch((err) => {
          console.log('INSERT_VENDOR_ERROR', err)
        })
    } else {
      remove().finally(() => {
        renderVendor()
      })
    }
  }

  return (
    <div className="vendor-code">
      <label htmlFor="vendor">Código do Vendedor</label>

      {vendorData ? (
        <div className="vendor-data">
          <span>{vendorData.vendedor}</span>

          <button className="remove-vendor" onClick={remove}>
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
      ) : (
        <div className="input-group">
          <fieldset>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id="vendor"
              placeholder="Código"
              onBlur={() => setError(null)}
            />

            {error && <span>{error}</span>}
          </fieldset>

          <button onClick={insertVendor}>OK</button>
        </div>
      )}
    </div>
  )
}