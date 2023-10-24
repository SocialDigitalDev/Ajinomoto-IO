import React, { useState } from "react"

import './global.css'

const BFSeoText = () => {
  const [isTextShown, setIsTextShown] = useState(false);

  return (
    <section className="BFSeoText-section">
      <h1 className="BFSeoText-title">AjinoFriday: descontos incríveis de Black Friday!</h1>
      <div className={"BFSeoText-content"}>
        {!isTextShown && <div className="shadow" />}
        <p className={`BFSeoText-main ${!isTextShown && 'hide-text'}`}>Lorem ipsum dolor sit amet consectetur. Tincidunt cursus sociis ac aliquam non lectus. Etiam eu consequat faucibus ac tellus sed in. Integer nisl pellentesque neque ac massa. Vitae amet ullamcorper varius et. Commodo non vitae nunc aliquet amet laoreet gravida feugiat. Lacus facilisi sed at arcu pretium. Quam leo tristique blandit vel pretium. Lorem tempor sit habitant et ac lacus etiam urna in. Tristique nibh tristique lorem et consectetur ut aliquet at ac. Enim mi et dui egestas faucibus orci lacus id. Posuere sit suspendisse in ac arcu pellentesque. Scelerisque malesuada ut eu rhoncus elit mattis. Risus congue mattis aenean morbi aliquam augue ipsum sit. Turpis mauris volutpat elementum arcu in consectetur gravida porttitor ut.
Accumsan eget cursus rutrum porttitor felis nulla. Ornare.</p>
        <span
          className="BFSeoText-ver-mais"
          onClick={() => setIsTextShown(!isTextShown)}>
            Ver {isTextShown ? 'menos' : 'mais'}
          </span>
      </div>

    </section>
  )
}

export default BFSeoText
