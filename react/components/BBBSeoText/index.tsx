import React, { useState } from "react";
import { schema } from './schema';

import './global.css';

type BBBSeoTextProps = {
  textoSEO: string
}

const BBBSeoText = ({ textoSEO }: BBBSeoTextProps) => {
  const [isTextShown, setIsTextShown] = useState(false);

  return (
    <section className="seo-section-text">
      <div className="text-area">
        <p className={isTextShown ? 'extended' : 'retracted'} dangerouslySetInnerHTML={{__html: textoSEO}}></p>
        { !isTextShown && (
          <div className="fade" />
        )}
      </div>
      <button
        className="toggle-text"
        onClick={() => setIsTextShown(!isTextShown)}
      >
        {isTextShown ? 'Ver menos' : 'Ler tudo'}
      </button>
    </section>
  )
}

BBBSeoText.schema = schema;

export default BBBSeoText;
