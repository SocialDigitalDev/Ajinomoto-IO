import React, { useState } from "react"

import './global.css'

type Category = {
  name: string
  body: string
  img: string
  link: string
}

type BFCategoryListProps = {
  categoria_1: Category
  categoria_2: Category
  categoria_3: Category
  categoria_4: Category
}

const defaultCategory = {
  name: 'Categoria',
  body: 'Texto promocional da categoria',
  img: '/',
  link: '/black-friday-2023'
}

const BFCategoryList = ({
  categoria_1 = defaultCategory,
  categoria_2 = defaultCategory,
  categoria_3 = defaultCategory,
  categoria_4 = defaultCategory
}: BFCategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categoria_1)

  return (
    <div className="categories-container">
      <div className="categories-list">

        {/* Categoria 1 */}
        <div className={`outer-category ${categoria_1.name === selectedCategory.name ? 'active' : ''}`}>
          <div className="category-name" onClick={() => setSelectedCategory(categoria_1)}>
            {categoria_1.name}
          </div>
        </div>

        {/* Categoria 2 */}
        <div className={`outer-category ${categoria_2.name === selectedCategory.name ? 'active' : ''}`}>
          <div className="category-name" onClick={() => setSelectedCategory(categoria_2)}>
            {categoria_2.name}
          </div>
        </div>

        {/* Categoria 3 */}
        <div className={`outer-category ${categoria_3.name === selectedCategory.name ? 'active' : ''}`}>
          <div className="category-name" onClick={() => setSelectedCategory(categoria_3)}>
            {categoria_3.name}
          </div>
        </div>

        {/* Categoria 4 */}
        <div className={`outer-category ${categoria_4.name === selectedCategory.name ? 'active' : ''}`}>
          <div className="category-name" onClick={() => setSelectedCategory(categoria_4)}>
            {categoria_4.name}
          </div>
        </div>

      </div>
      <div className="category-display">
        <div className="details">
          <p className="description">{selectedCategory.body}</p>
          <a href={selectedCategory.link} className="cta">
            <span>Confira agora</span>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <g id="material-symbols:arrow-forward-rounded">
                  <path id="Vector" d="M14.4053 23.8297C14.1816 23.5998 14.0645 23.3071 14.054 22.9518C14.0442 22.5965 14.1511 22.3038 14.3748 22.0739L20.3523 15.9287H6.7199C6.37426 15.9287 6.08433 15.8083 5.85011 15.5675C5.6167 15.3275 5.5 15.0299 5.5 14.6746C5.5 14.3192 5.6167 14.0212 5.85011 13.7804C6.08433 13.5404 6.37426 13.4204 6.7199 13.4204H20.3523L14.3748 7.27522C14.1511 7.0453 14.0442 6.75267 14.054 6.39733C14.0645 6.042 14.1816 5.74937 14.4053 5.51944C14.6289 5.28952 14.9136 5.17456 15.2592 5.17456C15.6049 5.17456 15.8895 5.28952 16.1132 5.51944L24.1645 13.7967C24.2865 13.9012 24.3731 14.0316 24.4244 14.188C24.4748 14.3451 24.5 14.5073 24.5 14.6746C24.5 14.8418 24.4748 14.9985 24.4244 15.1449C24.3731 15.2912 24.2865 15.427 24.1645 15.5524L16.1132 23.8297C15.8895 24.0596 15.6049 24.1746 15.2592 24.1746C14.9136 24.1746 14.6289 24.0596 14.4053 23.8297Z" fill="white"/>
                </g>
              </svg>
            </i>
          </a>
        </div>
        <img src={selectedCategory.img} alt="" />

      </div>
    </div>
  )
}

BFCategoryList.schema = {
  title: "Categorias",
  description: "configuração das categorias: texto, imagem e link",
  type: 'object',
  properties: {
    categoria_1: {
      title: 'Categoria 1',
      description: 'Categoria 1',
      type: 'object',
      properties: {
        name: {
          title: 'Nome',
          type: 'string',
          default: 'Temperos e Sopas'
        },
        body: {
          title: 'Corpo',
          type: 'string',
          default: 'Se você adora dar um toque de sabor único às suas refeições, não pode perder as promoções de temperos&caldos e sopas&cremes da AjinoFriday. Aproveite descontos imperdíveis em produtos que vão realçar o sabor de suas receitas.'
        },
        img: {
          title: 'Url da imagem',
          type: 'string',
          default: 'https://lojaajinomoto.vtexassets.com/assets/vtex.file-manager-graphql/images/1fe45427-ebfe-40e3-bd7a-e482f02f971b___175faebf1348c1c10448da4ac4f024b3.jpg'
        },
        link: {
          title: 'link',
          type: 'string',
          default: '/black-friday-2023'
        }
      }
    },
    categoria_2: {
      title: 'Categoria 2',
      description: 'Categoria 2',
      type: 'object',
      properties: {
        name: {
          title: 'Nome',
          type: 'string',
          default: 'Bebidas'
        },
        body: {
          title: 'Corpo',
          type: 'string',
          default: 'Desfrute de bebidas refrescantes e saborosas com descontos exclusivos durante a AjinoFriday. Procure um novo sabor ou compre os seus favoritos. Estamos prontos para oferecer o sabor da fruta pelos menores preços.'
        },
        img: {
          title: 'Url da imagem',
          type: 'string',
          default: 'https://lojaajinomoto.vtexassets.com/assets/vtex.file-manager-graphql/images/1fe45427-ebfe-40e3-bd7a-e482f02f971b___175faebf1348c1c10448da4ac4f024b3.jpg'
        },
        link: {
          title: 'link',
          type: 'string',
          default: '/black-friday-2023'
        }
      }
    },
    categoria_3: {
      title: 'Categoria 3',
      description: 'Categoria 3',
      type: 'object',
      properties: {
        name: {
          title: 'Nome',
          type: 'string',
          default: 'Molhos e Azeites'
        },
        body: {
          title: 'Corpo',
          type: 'string',
          default: 'Adicione um toque especial às suas receitas com nossas promoções em molhos e azeites. Encontre as melhores ofertas em azeites de alta qualidade e molhos que vão melhorar muito as suas receitas, na AjinoFriday 2023.'
        },
        img: {
          title: 'Url da imagem',
          type: 'string',
          default: 'https://lojaajinomoto.vtexassets.com/assets/vtex.file-manager-graphql/images/1fe45427-ebfe-40e3-bd7a-e482f02f971b___175faebf1348c1c10448da4ac4f024b3.jpg'
        },
        link: {
          title: 'link',
          type: 'string',
          default: '/black-friday-2023'
        }
      }
    },
    categoria_4: {
      title: 'Categoria 4',
      description: 'Categoria 4',
      type: 'object',
      properties: {
        name: {
          title: 'Nome',
          type: 'string',
          default: 'Culinários'
        },
        body: {
          title: 'Corpo',
          type: 'string',
          default: 'Confira uma variedade de produtos essenciais para o preparo de receitas ainda mais gostosas. Aproveite os descontos exclusivos em produtos culinários de alta qualidade na AjinoFriday 2023.'
        },
        img: {
          title: 'Url da imagem',
          type: 'string',
          default: 'https://lojaajinomoto.vtexassets.com/assets/vtex.file-manager-graphql/images/1fe45427-ebfe-40e3-bd7a-e482f02f971b___175faebf1348c1c10448da4ac4f024b3.jpg'
        },
        link: {
          title: 'link',
          type: 'string',
          default: '/black-friday-2023'
        }
      }
    },
  }

}

export default BFCategoryList
