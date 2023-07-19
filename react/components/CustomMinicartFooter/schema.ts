export const schema = {
    title: "Cupons",
    description: "",
    type: "object",
    properties: {
      cupomDesconto: {
        type: "boolean",
        default: true,
        description: "",
        title: "Cupom desconto"
      },
      cupomVendedor: {
        type: "boolean",
        default: true,
        description: "",
        title: "Código de vendedor"
      },
      frete: {
        type: "boolean",
        default: true,
        description: "",
        title: "Frete"
      }
    }
  }