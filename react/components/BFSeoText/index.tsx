import React, { useState } from "react"

import './global.css'

type BFSeoTextProps = {
  tituloSEO: string
  textoSEO: string
}

const BFSeoText = ({ tituloSEO, textoSEO }: BFSeoTextProps) => {
  const [isTextShown, setIsTextShown] = useState(false);

  return (
    <section className="BFSeoText-section">
      <h1 className="BFSeoText-title">{tituloSEO}</h1>
      <div className={"BFSeoText-content"}>
        {!isTextShown && <div className="shadow" />}
        <p className={`BFSeoText-main ${!isTextShown && 'hide-text'}`}>{textoSEO}</p>
        <span
          className="BFSeoText-ver-mais"
          onClick={() => setIsTextShown(!isTextShown)}>
            Ver {isTextShown ? 'menos' : 'mais'}
          </span>
      </div>

    </section>
  )
}

BFSeoText.schema = {
  title: "Seo Text",
  description: "descrição",
  type: "object",
  properties: {
    tituloSEO: {
      title: "Título da sessão",
      type: "string",
      default: "AjinoFriday: descontos incríveis de Black Friday!"
    },
    textoSEO: {
      title: "Texto de SEO",
      type: "string",
      default: "Lorem ipsum dolor sit amet consectetur. Tincidunt cursus sociis ac aliquam non lectus. Etiam eu consequat faucibus ac tellus sed in. Integer nisl pellentesque neque ac massa. Vitae amet ullamcorper varius et. Commodo non vitae nunc aliquet amet laoreet gravida feugiat. Lacus facilisi sed at arcu pretium. Quam leo tristique blandit vel pretium. Lorem tempor sit habitant et ac lacus etiam urna in. Tristique nibh tristique lorem et consectetur ut aliquet at ac. Enim mi et dui egestas faucibus orci lacus id. Posuere sit suspendisse in ac arcu pellentesque. Scelerisque malesuada ut eu rhoncus elit mattis. Risus congue mattis aenean morbi aliquam augue ipsum sit. Turpis mauris volutpat elementum arcu in consectetur gravida porttitor ut.Accumsan eget cursus rutrum porttitor felis nulla. Ornare."
    },
  }
}

export default BFSeoText
