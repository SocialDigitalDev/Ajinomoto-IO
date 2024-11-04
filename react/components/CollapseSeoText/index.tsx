import React, { useState } from "react"

import './global.css'

type CollapseSeoTextProps = {
  textoSEO: string
}

const CollapseSeoText = ({ textoSEO }: CollapseSeoTextProps) => {
  const [isTextShown, setIsTextShown] = useState(false);

  return (
    <section className="CollapseSeoText-section">
      
      <div className={"CollapseSeoText-content"}>
        {!isTextShown && <div className="shadow" />}
        <div className={`CollapseSeoText-main ${!isTextShown && 'hide-text'}`} dangerouslySetInnerHTML={{ __html: textoSEO }} />
        <span
          className={`CollapseSeoText-ver-mais ${isTextShown && 'open'}`}
          onClick={() => setIsTextShown(!isTextShown)}>
            ler {isTextShown ? 'menos' : 'mais'}
          </span>
      </div>

    </section>
  )
}

CollapseSeoText.schema = {
  title: "Collapse Seo Text",
  description: "descrição",
  type: "object",
  properties: {
    textoSEO: {
      title: "Texto de SEO",
      type: "string",
      default: "Lorem ipsum dolor sit amet consectetur. Tincidunt cursus sociis ac aliquam non lectus. Etiam eu consequat faucibus ac tellus sed in. Integer nisl pellentesque neque ac massa. Vitae amet ullamcorper varius et. Commodo non vitae nunc aliquet amet laoreet gravida feugiat. Lacus facilisi sed at arcu pretium. Quam leo tristique blandit vel pretium. Lorem tempor sit habitant et ac lacus etiam urna in. Tristique nibh tristique lorem et consectetur ut aliquet at ac. Enim mi et dui egestas faucibus orci lacus id. Posuere sit suspendisse in ac arcu pellentesque. Scelerisque malesuada ut eu rhoncus elit mattis. Risus congue mattis aenean morbi aliquam augue ipsum sit. Turpis mauris volutpat elementum arcu in consectetur gravida porttitor ut.Accumsan eget cursus rutrum porttitor felis nulla. Ornare.",
      widget: {
        'ui:widget': 'textarea',
      },
    }
  }
}

export default CollapseSeoText
