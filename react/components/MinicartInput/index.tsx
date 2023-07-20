
import React, { useEffect, useState } from 'react'

import './global.css'

interface MinicartInputProps {
  handle: Function
  settings: Settings
}

interface Settings {
  isActiveProp: any
  value: string
  placeholder: string
  loading: boolean
  inputError: string
  regEx: string
  maxLength?: number
  labelId: string
}

export const MinicartInput: StorefrontFunctionComponent<MinicartInputProps> = ({
  handle,
  settings,
}) => {

  // eslint-disable-next-line no-console
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [newRegExp] = useState(new RegExp(settings.regEx))

  const handleInputChange = (event: any) => {
    if (settings.regEx !== '') {
      event.target.value = event.target.value.replace(newRegExp, '$1-$2')
    }

    setInputValue(event.target.value)
  }

  useEffect(() => {
    setIsActive(settings.isActiveProp)
    setInputValue('')
  }, [settings.isActiveProp])

  function handleButtonClick() {
    if (inputValue) {
      handle(inputValue.trim())
    }
  }

  return (
    <div className="minicart-input">
      {!isActive ? (
        <div className="minicart-input__field">
          <div className="minicart-input__group">
            <label htmlFor={settings.labelId}>Calcule seu frete</label>

            <fieldset>
              <input
                id={settings.labelId}
                type="text"
                placeholder={settings.placeholder || ''}
                onChange={(event: any) => handleInputChange(event)}
                value={inputValue}
                pattern={settings.regEx}
                maxLength={settings.maxLength}
              />

              <button
                className="shipping-input__btn"
                onClick={() => handleButtonClick()}
              >
                Calcular
              </button>
            </fieldset>
          </div>

          {isActive === null ? (
            <span className="shipping-input__error">{settings.inputError}</span>
          ) : null}
        </div>
      ) : (
        <div className="minicart-result">
          <span className='minicart-result__label'>
          Calcule seu frete
          </span>

          <div className="minicart-result__data">
            <span className="minicart-result__value">
              {settings.value.replace(newRegExp, '$1-$2')}
            </span>

            <button className="minicart-result__remove"
              onClick={() => handle('')}
            >
              <i>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6.5L6 18.5" stroke="#636363" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6.5L18 18.5" stroke="#636363" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
