import React, { useState } from "react";
import { useDevice } from "vtex.device-detector";
import { useProduct } from "vtex.product-context";

import "./global.css";

const CustomPDPRecipies = () => {

    const [tab1, setTab1] = useState('active');
    const [tab2, setTab2] = useState('');
    // Chama o produto da API
    const productProperties = useProduct()?.product?.properties;
    // Chama o detector de dispositivos;
    const device = useDevice();
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

    const arrIngredients = recipeItems.ingredientes?.split(';');
    const arrPreparo = recipeItems.modoPreparo?.split('.');

    // Verifica se o split e gera uma variável contendo todos os itens dos ingredientes já formatados em HTML
    const listIngredients:any = arrIngredients ? 
        arrIngredients.map(
            // NÃO RETIRAR O ESPAÇO ABAIXO!!!
            item => item === "Massa" || item === `\r\n\r\nRecheio` || item === `\r\n\r\nMassa` || item === "Recheio" ? 
                <li className="recipe--ingredient item-title"><b>{item}</b></li>
            : <li className="recipe--ingredient">{item}</li>
        )
        // Se não houver ingredientes a lista não será gerada.
        : null;

    // Verifica se o split e gera uma variável contendo todos os itens do modo de preparo já formatados em HTML            
    const listPreparo:any = arrPreparo ? 
        arrPreparo.map(
            item => <li className="recipe--preparation-method-item">{item}.</li>
        )
        // Se não houver modo de preparo a lista não será gerada.
        : null;

    function setTab1Active() {
        setTab1('active');
        setTab2('');
    }

    function setTab2Active() {
        setTab1('');
        setTab2('active');
    }

    // Verifica se há um título para a Receita e a renderiza.
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
                        <div className="recipe--preparing">
                            <h4 className="recipe--preparing-title">Tempo de Preparo</h4>
                            <p className="recipe--preparing-data">{recipeItems.tempoPreparo}</p>
                        </div>
                        <div className="recipe--revenue">
                            <h4 className="recipe--revenue-title">Rendimento</h4>
                            <p className="recipe--revenue-data">{recipeItems.rendimento}</p>
                        </div>
                    </div>
                    {
                        device.device === 'desktop' || device.device === 'tablet' ?
                            <div className="recipe--ingredients-preparation-wrapper">
                                <div className="recipe--ingredients">
                                    <h4 className="recipe--ingredients-title">Ingredientes</h4>
                                    <ul className="recipe--ingredients-text">
                                        {listIngredients ? listIngredients : null}
                                    </ul>
                                </div>
                                <div className="recipe--preparation-method">
                                    <h4 className="recipe--preparation-method-title">Modo de Preparo</h4>
                                    <ul className="recipe--preparation-method-data">
                                        {listPreparo ? listPreparo : null}
                                    </ul>
                                </div>
                            </div>
                        : null
                    }
                    {
                        device.device === 'phone' ?
                            <div className="recipe--ingredients-preparation-wrapper phone-wrapper">
                                <div className="recipe--mobile-tab-selector">
                                    <span className={`tab-1 recipe--tab ${tab1}`} onClick={setTab1Active}>Ingredientes</span>
                                    <span className={`tab-2 recipe--tab ${tab2}`} onClick={setTab2Active}>Modo de Preparo</span>
                                </div>
                                <div className={`recipe--ingredients ${tab1}`}>
                                    <h4 className="recipe--ingredients-title">Ingredientes</h4>
                                    <ul className="recipe--ingredients-text">
                                        {listIngredients ? listIngredients : null}
                                    </ul>
                                </div>
                                <div className={`recipe--preparation-method ${tab2}`}>
                                    <h4 className="recipe--preparation-method-title">Modo de Preparo</h4>
                                    <p className="recipe--preparation-method-data">
                                        {recipeItems.modoPreparo}
                                    </p>
                                </div>
                            </div>
                        : null
                    }
                </div>
            </div>
        </div>
    // Se não há um título, o componente não será renderizado.
    ) : null
}

export default CustomPDPRecipies;