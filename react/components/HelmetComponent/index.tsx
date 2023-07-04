import React from "react"
import { Helmet } from "vtex.render-runtime"

import "./global.css"

//Caso precise colocar algum script que não tenha app pixel é só adicionar a este arquivo

const HelmetComponent = () => {
  return (
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>
      <link rel="shortcut icon" href="https://casaflora.vteximg.com.br/arquivos/casaflora-favicon.png" />
      <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=71d61aa4-2b6f-4c07-b311-cd176f716ea3"> </script>
    </Helmet>
  )
}

export default HelmetComponent