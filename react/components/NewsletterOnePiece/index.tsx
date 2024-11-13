import React, { useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

import { defaultProps } from "./defaultProps";
import { schemaEditor } from "./schemaEditor";

import "./global.css";

const NewsletterOnePiece = () => {
	const [email, setEmail] = useState("");
	const [nome, setName] = useState("");
	const [aceite, setAceite] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorNameEmptyMessage, setErrorNameEmptyMessage] = useState(false);
	const [errorNameEmailEmptyMessage, setErrorNameEmailEmptyMessage] = useState(
		false
	);
	const [errorMessage, setErrorMessage] = useState(false);
	const [errorAceiteMessage, setErrorAceiteMessage] = useState(false);

	const regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const requestOptions = {
		method: "POST",
		headers: {
			Accept: "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			nome: nome,
			aceite: aceite,
		}),
	};

	const requestNewsletter = () => {
		if (nome !== "" && email !== "" && regex.test(email) && aceite == true) {
			setErrorMessage(false);
			fetch(`/api/dataentities/NL/documents`, requestOptions)
				.then(res => res.json())
				.then(() => {
					setSuccessMessage(true);
					setName("");
					setEmail("");
					setAceite(false);
					setTimeout(function () {
						setSuccessMessage(false);
					}, 3500);
				});
		} else if (nome === "" && email !== "") {
			setSuccessMessage(false);
			setErrorMessage(false);
			setErrorNameEmptyMessage(true);
			setTimeout(function () {
				setSuccessMessage(false);
				setErrorNameEmptyMessage(false);
				setErrorMessage(false);
				setErrorNameEmailEmptyMessage(false);
			}, 3500);
		} else if (nome !== "" && email === "") {
			setSuccessMessage(false);
			setErrorNameEmptyMessage(false);
			setErrorMessage(true);
			setTimeout(function () {
				setSuccessMessage(false);
				setErrorNameEmptyMessage(false);
				setErrorMessage(false);
				setErrorNameEmailEmptyMessage(false);
			}, 3500);
		} else if (nome === "" && email === "") {
			setSuccessMessage(false);
			setErrorNameEmptyMessage(false);
			setErrorMessage(false);
			setErrorNameEmailEmptyMessage(true);
			setTimeout(function () {
				setSuccessMessage(false);
				setErrorNameEmptyMessage(false);
				setErrorMessage(false);
				setErrorNameEmailEmptyMessage(false);
			}, 3500);
		} else if (
			nome !== "" &&
			email !== "" &&
			regex.test(email) &&
			aceite == false
		) {
			setSuccessMessage(false);
			setErrorNameEmptyMessage(false);
			setErrorMessage(false);
			setErrorAceiteMessage(true);
			setTimeout(function () {
				setSuccessMessage(false);
				setErrorNameEmptyMessage(false);
				setErrorMessage(false);
				setErrorNameEmailEmptyMessage(false);
				setErrorAceiteMessage(false);
			}, 3500);
		}
	};

	return (
		<>
			{canUseDOM && (
				<div className="custom-newsletter-op">
					<div className="container-newsletter">
						<div className="texto-container">
							<div className="texto-newsletter">
								<span className="texto-newsletter__titulo">
									{defaultProps.title}
								</span>
								<span className="texto-newsletter__subtitulo">
									{defaultProps.subtitle}
								</span>
							</div>
							<div className="icon">
								<i></i>
							</div>
						</div>
						<form
							className="container-form"
							onSubmit={event => {
								event.preventDefault();
								requestNewsletter();
							}}
							noValidate
						>
							<div className="container-form__input">
								<div className="container-form__input--group">
									<i className="container-form__input--icon icon__user" />
									<input
										className="container-newsletter-form__input"
										type="text"
										name="nome"
										placeholder="Digite seu nome aqui"
										required
										value={nome}
										onChange={event => {
											setName(event.target.value);
										}}
									/>
								</div>
								<div className="container-form__input--group">
									<i className="container-form__input--icon icon__letter" />
									<input
										className="container-newsletter-form__input"
										type="email"
										name="email"
										placeholder="Digite seu e-mail aqui"
										required
										value={email}
										onChange={event => {
											setEmail(event.target.value);
										}}
									/>
								</div>
							</div>

							<div className="container-form__checkbox">
								<label htmlFor="aceite" className="txt-termos-condicoes">
									<input
										className="vtex-container-newsletter-form__input aceite"
										type="checkbox"
										name="aceite"
										required
										checked={aceite}
										onChange={() => {
											if (aceite == false) {
												setAceite(true);
											} else {
												setAceite(false);
											}
										}}
									/>
									<span className="check-aceite"></span>
									<span>
										Concordo que a Ajinomoto pode usar meus dados de contato e
										interações.{" "}
										<a href="/institucional/politica-de-privacidade">
											Política de privacidade
										</a>
										.
									</span>
								</label>
							</div>

							<div className="container-form__footer">
								<div className="container-form__messages">
									{!!successMessage && (
										<p className="container-form__messages--success">
											E-mail cadastrado com sucesso!
										</p>
									)}
									{!!errorNameEmptyMessage && (
										<p className="container-form__messages--error">
											Preencha o campo <strong>Nome</strong>.
										</p>
									)}

									{!!errorAceiteMessage && (
										<p className="container-form__messages--error-aceite">
											É necessário aceitar receber a newsletter para se
											cadastrar.
										</p>
									)}

									{!!errorNameEmailEmptyMessage && (
										<p className="container-form__messages--error">
											Preencha os campos <strong>Nome</strong> e{" "}
											<strong>E-mail</strong>.
										</p>
									)}

									{!!errorMessage && (
										<p className="container-form__messages--error">
											Insira um endereço de <strong>E-mail</strong> válido.
										</p>
									)}
								</div>
								<button className="container-newsletter-form__button">
									{defaultProps.button}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

NewsletterOnePiece.defaultProps = defaultProps;
NewsletterOnePiece.schemaEditor = schemaEditor;

export default NewsletterOnePiece;
