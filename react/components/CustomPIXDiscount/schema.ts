export const schema = {
    title: "Preco no PIX",
    description: "",
    type: "object",
    properties: {
        enableComponent: {
            title: 'Esconder/Mostrar Componente',
            type: 'boolean',
            description: 'Esconde e Mostra o Componente',
            default: false,
        },
        percentualValue: {
            title: "Valor Percentual",
            type: "number",
            default: '0.05',
            description: "Insira aqui o valor percentual no formato decimal, exemplo: 0.05 para 5%",
            widget: {
                'ui:widget': 'text'
            }
        }
    }
}