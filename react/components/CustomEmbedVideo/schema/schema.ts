export const schema = {
  title: "Video",
  description: "",
  type: "object",
  properties: {
      enableComponent: {
          title: 'Esconder/Mostrar Texto SEO',
          type: 'boolean',
          description: 'Esconde e Mostra o Componente',
          default: false,
      },
      video: {
          type: "string",
          default: "",
          description: "Insira o vídeo aqui",
          title: "Video de rodapé",
          widget: {
              'ui:widget': 'text',
          },
      }
  }
}
