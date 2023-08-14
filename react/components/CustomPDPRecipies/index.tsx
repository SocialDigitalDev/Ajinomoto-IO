import React from "react";

import { useProduct } from "vtex.product-context";

const CustomPDPRecipies = () => {

    // Chama o produto da API
    const productProperties = useProduct()?.product?.properties;

    // Usa o produto e cria um objeto contendo os itens da receita

    const recipeItems = {
        ingredientes: productProperties?.find(item => item.name === "Ingredientes da Receita")?.values[0],
        tituloReceita: productProperties?.find(item => item.name === "Titulo da receita")?.values[0],
        tempoPreparo: productProperties?.find(item => item.name === "Tempo de preparo")?.values[0],
        rendimento: productProperties?.find(item => item.name === "Rendimento")?.values[0],
        modoPreparo: productProperties?.find(item => item.name === "Modo de Preparo")?.values[0],
        video: productProperties?.find(item => item.name === "Video")?.values[0]?.replace("https://youtu.be/", ""),
        image: productProperties?.find(item => item.name === "Imagem Receita")?.values[0]
    }

    return recipeItems.tituloReceita ? (

        <div className="recipe--container">
            <div className="recipe--wrapper">
                <div className="recipe--left-side">
                    <h3 className="recipe--call-to-video">Prepare-se para cozinhar<br/>Confira como fazer:</h3>
                    {
                        // Verifica se tem vídeo
                        recipeItems.video ?
                        <iframe width="525" height="298" src={`https://www.youtube.com/embed/${recipeItems.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        : // Se não tiver, verifica se tem imagem
                        recipeItems.image ?
                        <img src={recipeItems.image} className="recipe--image" />
                        : // Se não tiver, adiciona imagem placeholder
                        <img src="https://placehold.co/525x298" className="recipe--image" />
                    }
                </div>
                <div className="recipe--right-side">
                    <h3 className="recipe--title">{recipeItems.tituloReceita}</h3>
                    <div className="recipe--data">
                        
                    </div>
                </div>
            </div>
        </div>

    ) : null
}

export default CustomPDPRecipies;