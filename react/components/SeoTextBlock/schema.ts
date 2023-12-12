export const schema = {
    title: "SEO",
    description: "",
    type: "object",
    properties: {
        enableComponent: {
            title: 'Esconder/Mostrar Texto SEO',
            type: 'boolean',
            description: 'Esconde e Mostra o Componente',
            default: false,
        },
        seoText: {
            type: "string",
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            description: "Texto de SEO",
            title: "Texto SEO",
            widget: {
                'ui:widget': 'textarea',
            },
        }
    }
}
