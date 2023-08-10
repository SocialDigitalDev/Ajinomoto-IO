import React from "react";

import "./global.css";

const BackButton = () => {

    function backButton(e) {
        e.preventDefault();
        history.go(-1);
    }

    return (
        <>
            <a href="#" className="link--back-button" onClick={backButton}>
                <span className="label">Voltar</span>
            </a>
        </>
    )

}

export default BackButton;