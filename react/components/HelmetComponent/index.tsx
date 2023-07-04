import React from 'react'
import { Helmet } from 'vtex.render-runtime'

import "./global.css"

//Caso precise colocar algum script que não tenha app pixel é só adicionar a este arquivo

const HelmetComponent = () => {
  return (
    //@ts-ignore
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>      
    </Helmet>
  )
}

export default HelmetComponent