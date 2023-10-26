export const categoryListSchema = {
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
