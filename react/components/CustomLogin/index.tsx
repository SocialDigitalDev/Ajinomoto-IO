
//@ts-ignore
import { useRenderSession } from "vtex.session-client";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  gql,
  ApolloProvider
} from '@apollo/client';

import "./global.css";

// @ts-ignore

const client = new ApolloClient({
  uri: '/_v/private/graphql/v1',
  cache: new InMemoryCache(),
  credentials: 'same-origin'
});

type Steps =
  "login_choices" |
  "send_code_login" |
  "login_with_code" |
  "send_code_signUp" |
  "put_code_signUp" |
  "signUp" |
  "login_with_password"

const CustomLogin: StorefrontFunctionComponent<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogged, setIsOpenLogged] = useState(false);
  const [signUpClass, setSignUpClass] = useState(false);
  const [step, setStep] = useState<Steps>("login_choices");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [classicSignIn] = useMutation(classicSignInMutation);
  const [sendEmailVerificationCode] = useMutation(sendEmailVerificationCodeMutation);
  const [vtexRecoveryPassword] = useMutation(vtexRecoveryPasswordMutation);
  const [vtexAccessKeySignIn] = useMutation(vtexAccessKeySignInMutation);
  const [error, setError] = useState("");

  const { session } = useRenderSession();


  function handleChangePage(stepPage: Steps, e?: any) {
    if (e) {
      e.preventDefault()
    }

    setStep(stepPage)
  }


  async function handleLoginWithPassword(e: any) {
    e.preventDefault();
    try {
      const response = await classicSignIn({
        variables: {
          email,
          password
        }
      })
      console.log("data", response)

      setIsOpen(false)
      location.reload()
    } catch (e) {
      setError(e.message);
      console.log('data', e.message)
    }
  }

  async function handleSendVerificationCode(e: any) {
    e.preventDefault();

    try {
      const response = await sendEmailVerificationCode({
        variables: {
          email
        }
      })

      console.log("data", response);
    } catch (e) {
      setError(e.message);
      console.log(e.message)
    }
  }

  async function handleLoginWithCode(e: any) {
    e.preventDefault();
    try {
      const response = await vtexAccessKeySignIn({
        variables: {
          email,
          code: String(code)
        }
      })

      console.log("data", response);
      setIsOpen(false)
      location.reload()
    } catch (e) {
      setError(e.message);
      console.log("data", e.message)
    }
  }

  // signUp
  async function handleRegisterNewPassword(e: any) {
    e.preventDefault();
    try {
      console.log("data rodou");

      const response = await vtexRecoveryPassword({
        variables: {
          email,
          newPassword: password,
          code: String(code)
        }
      })

      console.log("data", response);
      setIsOpen(false)
      location.reload()
    } catch (e) {
      setError(e.message);
      console.log("data", e.message)
    }
  }

  function handleCloseModal() {
    setIsOpen(false)
    handleChangePage("login_choices")
  }


  useEffect(() => {

    if (step === "signUp") {
      setSignUpClass(true)
      console.log('step', signUpClass)
    }
  }, [step])


  return (
    <div>
      {/*@ts-ignore */}
      {session && session?.namespaces?.profile?.isAuthenticated?.value === "true" ?
        (
          <div className="user-logged" onClick={() => setIsOpenLogged(!isOpenLogged)}>
		  	<svg xmlns="http://www.w3.org/2000/svg" width="41" height="33" viewBox="0 0 41 33" fill="none">
				<g clipPath="url(#clip0_1130_7750)">
					<path d="M37.0487 10.3952C36.805 10.0612 36.5515 9.73699 36.2929 9.42243C37.2824 8.3626 39.2264 5.81222 37.9088 3.26669C36.4321 0.416271 31.6938 -0.750029 29.9387 0.50338C28.636 1.40835 27.9797 2.67628 27.6714 3.4651C25.5086 2.74887 23.1369 2.38107 20.5614 2.3714C17.9859 2.38107 15.6192 2.74887 13.4564 3.4651C13.1531 2.67628 12.4918 1.40835 11.1891 0.50338C9.43402 -0.750029 4.69567 0.416271 3.21898 3.26669C1.90139 5.81222 3.84545 8.3626 4.83489 9.42243C4.57634 9.73699 4.32774 10.0612 4.07914 10.3952C1.07106 14.4893 -0.107314 19.3045 0.936813 23.268C1.7572 26.3943 3.93495 28.8672 7.23141 30.4158C10.7267 32.0612 15.2115 32.9323 20.5564 33.0001H20.5813C25.9262 32.9323 30.406 32.0612 33.9064 30.4158C37.2028 28.8672 39.3806 26.3943 40.201 23.268C41.2401 19.3045 40.0667 14.4893 37.0537 10.3952" fill="#E60012"/>
					<path d="M20.5614 4.04575C14.0928 4.06995 9.02131 6.53322 5.4862 11.3678C2.80627 15.0167 1.70248 19.4157 2.60242 22.8566C3.30348 25.5279 5.11329 27.5653 7.97719 28.9107C11.2438 30.4496 15.48 31.2626 20.5664 31.3304C25.6528 31.2626 29.884 30.4496 33.1506 28.9155C36.0145 27.5702 37.8243 25.5328 38.5253 22.8614C39.4303 19.4206 38.3265 15.0216 35.6465 11.3775C32.1114 6.53805 27.035 4.07479 20.5664 4.05059" fill="white"/>
					<path d="M20.5714 24.6617C21.7846 24.6617 22.7839 23.9793 22.7839 23.1276C22.7839 22.2758 21.7846 21.5838 20.5714 21.5838C19.3582 21.5838 18.3489 22.2758 18.3489 23.1276C18.3489 23.9793 19.3433 24.6617 20.5714 24.6617Z" fill="#E60012"/>
					<path d="M25.9909 24.4633C25.603 24.2358 25.1009 24.352 24.8622 24.7294C24.8473 24.7488 23.5496 26.7668 20.5614 26.7668C17.5732 26.7668 16.3103 24.8117 16.2606 24.7294C16.0219 24.3568 15.5198 24.2358 15.1319 24.4633C14.7441 24.6956 14.6248 25.1843 14.8585 25.5618C14.9331 25.6731 16.6633 28.359 20.5564 28.359C24.4495 28.359 26.1848 25.6731 26.2544 25.5618C26.493 25.1843 26.3687 24.6956 25.9859 24.4633" fill="#E60012"/>
					<path d="M17.5931 16.8363C18.7417 15.128 18.5776 12.8777 16.7379 11.8711C16.4297 11.7211 16.0369 11.6485 15.6739 11.5662C15.3458 11.5952 15.0325 11.5662 14.7044 11.6436C13.342 11.9437 12.2731 12.6212 11.1195 13.3762C10.4085 13.8359 9.74229 14.4215 9.13073 14.9538C7.79325 16.1201 7.07231 17.8913 7.46013 19.6868C7.66895 20.6885 8.33521 21.4096 9.23017 21.9371C10.0754 22.4404 11.1643 22.5033 12.0195 22.15C13.3669 21.579 13.9934 20.5627 14.9132 19.5754C15.7833 18.6414 16.8772 17.8865 17.5931 16.8315M13.8293 16.9525C13.8293 16.5411 14.1624 16.212 14.59 16.212C15.0176 16.212 15.3607 16.5411 15.3607 16.9525C15.3607 17.3638 15.0226 17.6929 14.59 17.6929C14.1575 17.6929 13.8293 17.3735 13.8293 16.9525Z" fill="#E60012"/>
					<path d="M32.0021 14.9538C31.3955 14.4166 30.7243 13.8359 30.0133 13.3762C28.8647 12.6212 27.7908 11.9437 26.4284 11.6436C26.1052 11.5662 25.787 11.5952 25.4589 11.5662C25.0909 11.6485 24.6982 11.7259 24.3949 11.8759C22.5552 12.8825 22.3911 15.1329 23.5347 16.8412C24.2507 17.8962 25.3445 18.6511 26.2146 19.5851C27.1344 20.5675 27.7609 21.5838 29.1083 22.1597C29.9586 22.513 31.0524 22.4501 31.8927 21.9468C32.7876 21.4193 33.4539 20.6982 33.6677 19.6964C34.0605 17.901 33.3346 16.1346 31.9971 14.9635M26.5378 17.7026C26.1052 17.7026 25.7622 17.3832 25.7622 16.9622C25.7622 16.5411 26.1003 16.2217 26.5378 16.2217C26.9753 16.2217 27.2985 16.5508 27.2985 16.9622C27.2985 17.3735 26.9604 17.7026 26.5378 17.7026Z" fill="#E60012"/>
				</g>
				<defs>
					<clipPath id="clip0_1130_7750">
					<rect width="40" height="33" fill="white" transform="translate(0.563904)"/>
					</clipPath>
				</defs>
			</svg>

            {/*@ts-ignore */}
            <div className="login-button-text" onClick={() => window.location.href = '/account'}>Olá <span>{session?.namespaces.profile.email.value}</span></div>
          </div>
        )
        :
        (
          <div className="user-login" onClick={() => setIsOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="33" viewBox="0 0 41 33" fill="none">
				<g clipPath="url(#clip0_1130_7750)">
					<path d="M37.0487 10.3952C36.805 10.0612 36.5515 9.73699 36.2929 9.42243C37.2824 8.3626 39.2264 5.81222 37.9088 3.26669C36.4321 0.416271 31.6938 -0.750029 29.9387 0.50338C28.636 1.40835 27.9797 2.67628 27.6714 3.4651C25.5086 2.74887 23.1369 2.38107 20.5614 2.3714C17.9859 2.38107 15.6192 2.74887 13.4564 3.4651C13.1531 2.67628 12.4918 1.40835 11.1891 0.50338C9.43402 -0.750029 4.69567 0.416271 3.21898 3.26669C1.90139 5.81222 3.84545 8.3626 4.83489 9.42243C4.57634 9.73699 4.32774 10.0612 4.07914 10.3952C1.07106 14.4893 -0.107314 19.3045 0.936813 23.268C1.7572 26.3943 3.93495 28.8672 7.23141 30.4158C10.7267 32.0612 15.2115 32.9323 20.5564 33.0001H20.5813C25.9262 32.9323 30.406 32.0612 33.9064 30.4158C37.2028 28.8672 39.3806 26.3943 40.201 23.268C41.2401 19.3045 40.0667 14.4893 37.0537 10.3952" fill="#E60012"/>
					<path d="M20.5614 4.04575C14.0928 4.06995 9.02131 6.53322 5.4862 11.3678C2.80627 15.0167 1.70248 19.4157 2.60242 22.8566C3.30348 25.5279 5.11329 27.5653 7.97719 28.9107C11.2438 30.4496 15.48 31.2626 20.5664 31.3304C25.6528 31.2626 29.884 30.4496 33.1506 28.9155C36.0145 27.5702 37.8243 25.5328 38.5253 22.8614C39.4303 19.4206 38.3265 15.0216 35.6465 11.3775C32.1114 6.53805 27.035 4.07479 20.5664 4.05059" fill="white"/>
					<path d="M20.5714 24.6617C21.7846 24.6617 22.7839 23.9793 22.7839 23.1276C22.7839 22.2758 21.7846 21.5838 20.5714 21.5838C19.3582 21.5838 18.3489 22.2758 18.3489 23.1276C18.3489 23.9793 19.3433 24.6617 20.5714 24.6617Z" fill="#E60012"/>
					<path d="M25.9909 24.4633C25.603 24.2358 25.1009 24.352 24.8622 24.7294C24.8473 24.7488 23.5496 26.7668 20.5614 26.7668C17.5732 26.7668 16.3103 24.8117 16.2606 24.7294C16.0219 24.3568 15.5198 24.2358 15.1319 24.4633C14.7441 24.6956 14.6248 25.1843 14.8585 25.5618C14.9331 25.6731 16.6633 28.359 20.5564 28.359C24.4495 28.359 26.1848 25.6731 26.2544 25.5618C26.493 25.1843 26.3687 24.6956 25.9859 24.4633" fill="#E60012"/>
					<path d="M17.5931 16.8363C18.7417 15.128 18.5776 12.8777 16.7379 11.8711C16.4297 11.7211 16.0369 11.6485 15.6739 11.5662C15.3458 11.5952 15.0325 11.5662 14.7044 11.6436C13.342 11.9437 12.2731 12.6212 11.1195 13.3762C10.4085 13.8359 9.74229 14.4215 9.13073 14.9538C7.79325 16.1201 7.07231 17.8913 7.46013 19.6868C7.66895 20.6885 8.33521 21.4096 9.23017 21.9371C10.0754 22.4404 11.1643 22.5033 12.0195 22.15C13.3669 21.579 13.9934 20.5627 14.9132 19.5754C15.7833 18.6414 16.8772 17.8865 17.5931 16.8315M13.8293 16.9525C13.8293 16.5411 14.1624 16.212 14.59 16.212C15.0176 16.212 15.3607 16.5411 15.3607 16.9525C15.3607 17.3638 15.0226 17.6929 14.59 17.6929C14.1575 17.6929 13.8293 17.3735 13.8293 16.9525Z" fill="#E60012"/>
					<path d="M32.0021 14.9538C31.3955 14.4166 30.7243 13.8359 30.0133 13.3762C28.8647 12.6212 27.7908 11.9437 26.4284 11.6436C26.1052 11.5662 25.787 11.5952 25.4589 11.5662C25.0909 11.6485 24.6982 11.7259 24.3949 11.8759C22.5552 12.8825 22.3911 15.1329 23.5347 16.8412C24.2507 17.8962 25.3445 18.6511 26.2146 19.5851C27.1344 20.5675 27.7609 21.5838 29.1083 22.1597C29.9586 22.513 31.0524 22.4501 31.8927 21.9468C32.7876 21.4193 33.4539 20.6982 33.6677 19.6964C34.0605 17.901 33.3346 16.1346 31.9971 14.9635M26.5378 17.7026C26.1052 17.7026 25.7622 17.3832 25.7622 16.9622C25.7622 16.5411 26.1003 16.2217 26.5378 16.2217C26.9753 16.2217 27.2985 16.5508 27.2985 16.9622C27.2985 17.3735 26.9604 17.7026 26.5378 17.7026Z" fill="#E60012"/>
				</g>
				<defs>
					<clipPath id="clip0_1130_7750">
					<rect width="40" height="33" fill="white" transform="translate(0.563904)"/>
					</clipPath>
				</defs>
			</svg>

			<div className="login-button-text">Entrar <span>ou cadastrar</span></div>

            
          </div>
        )
      }
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        overlayClassName={signUpClass ? "modal-login-overlay sign-up-active" : "modal-login-overlay"}
        className={"modal-login"}
      >
        {step === "login_choices" && (
          <div className='login-container'>
            <div className="login-content">
              <div className="login-close-button" onClick={handleCloseModal}></div>
              <h1 className='card-title main-step'>Seja bem-vindo<br />Acesse sua conta</h1>
              <div className="login-button">
                <button className='login-btn-1' onClick={() => handleChangePage("login_with_password")}>Entrar com e-mail e senha</button>
                <button className='login-btn-2' onClick={() => handleChangePage("send_code_login")}>Receber chave de acesso rápido por email</button>
              </div>
            </div>            
            <div className="sign-up-row">
              <button className='sign-up-button'>Não possui uma conta?</button>
              <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                Cadastre-se
              </button>
            </div>
          </div>
        )}

        {step === "login_with_password" && (
          <div>
            <div className='login-container'>
              <div className="login-content">
                <div className="login-close-button" onClick={handleCloseModal}></div>
                <h1 className='card-title'>Acessar Conta</h1>
                <span className='login-span-text'>Informe seu e-mail e senha</span>

                <form
                  className='form-step-container'
                  onSubmit={handleLoginWithPassword}
                >
                  <div className="form-input-column">

                    <input
                      className='login-form-input'
                      type="email"
                      placeholder='Insira seu e-mail'
                      onChange={(e) => setEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      value={email}
                    />
                    <input
                      className='login-form-input'
                      type="password"
                      placeholder='Insira sua senha'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />

                    {error && (
                      <div style={{ color: "red" }}>
                        {error === "Password does not follow specified format" ? "A senha deve ter 8 caracteres" : ""}
                      </div>
                    )}
                  </div>

                  <span className='forget-password' onClick={() => handleChangePage("send_code_signUp")}>Esqueci a senha</span>
                  <div className="back-and-submit-row">
                    <button className='login-back-button' onClick={() => handleChangePage("login_choices")}>                     
                      Voltar
                    </button>
                    <button className='login-submit-button' type='submit'>
                      Entrar                    
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                  Cadastre-se                 
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "send_code_login" && (
          <div>
            <div className='login-container'>
              <div className="login-content">

                <div className="login-close-button" onClick={handleCloseModal}></div>
                <h1 className='card-title-fast'>Acesso rápido</h1>
                <span className='login-span-text'>Informe seu e-mail</span>

                <form
                  className='form-step-container'
                  onSubmit={(e) => {
                    handleSendVerificationCode(e)
                    handleChangePage("login_with_code")
                  }}
                >
                  <div className="form-input-column">
                    <input className='login-form-input' type="email" placeholder='Insira seu e-mail' onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                  </div>

                  <div className="back-and-submit-row">
                    <button className='login-submit-button' type='submit'>
                      Entrar
                    </button>

                    <button className='login-back-button' onClick={() => handleChangePage("login_choices")}>                      
                      Voltar
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button'>
                  Cadastre-se                 

                </button>
              </div>
            </div>


          </div>
        )}

        {step === "login_with_code" && (
          <div>
            <div className='login-container'>
              <div className="login-content">

                <div className="login-close-button" onClick={handleCloseModal}></div>
                <h1 className='card-title'>Acesso rápido</h1>
                <span className='login-span-text'>Agora é só informar o código recebido em:</span>
                <span className='email-text'>{email}</span>
                <form
                  className='form-step-container'
                  onSubmit={(e) => {
                    handleLoginWithCode(e)
                    handleChangePage("login_choices")
                  }}
                >
                  <div className="form-input-column">
                    <input className='login-form-input' type="text" placeholder='Insira o código encaminhado' onChange={(e) => setCode(e.target.value)} required />
                  </div>

                  <p className='new-code' onClick={handleSendVerificationCode} >Solicitar novo código</p>

                  <div className="back-and-submit-row">
                    <button className='login-back-button' onClick={() => handleChangePage("send_code_login")}>                     
                      Voltar
                    </button>
                    <button className='login-submit-button' type='submit'>
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
              {/* {children} */}
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                  Cadastre-se                 
                </button>
              </div>
            </div>
          </div>
        )}
        {step === "signUp" && (
          <div>
            <div className='login-container'>
              <div className="login-close-button-sign-up" onClick={() => setIsOpen(false)}></div>

              <div className="top-content"></div>

              <div className="bottom-content">
                <form
                  className='form-step-container'
                  onSubmit={(e) => handleRegisterNewPassword(e)}
                >
                  <div className="title-sign-up"> Crie uma conta</div>
                  <span className='login-span-text-sign-up'>Complete os campos com as suas informações</span>

                  <div className="form-input-column">

                    <input className='login-form-input' value={email} type="email" placeholder='Insira seu e-mail' onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                    <input className='login-form-input' type="password" placeholder='Insira sua senha' onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="requeriments-column">
                    <div className="requeriments">
                      <p> <span>ABC</span> 1 letra maiúscula</p>
                      <p><span>abc</span> 1 letra minúscula</p>
                      <p><span>123</span> 1 número</p>
                      <p><span>!@#</span> 1 caracter especial</p>
                      <p><span>*** </span>No minímo 8 caracteres</p>
                    </div>

                    <span className='forget-password purple' onClick={() => handleChangePage("send_code_signUp")}>Esqueci a senha</span>

                  </div>
                  <div className="back-and-submit-row">

                    <button className='login-back-button' onClick={() => handleChangePage("put_code_signUp")}>
                      Voltar
                    </button>

                    <button className='login-submit-button purple' type='submit'>
                      Confirmar                     
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button'>
                  Cadastre-se                 

                </button>
              </div>
            </div>


          </div>
        )
        }

        {
          step === "send_code_signUp" && (
            <div>
              <div className='login-container'>
                <div className="login-content">

                  <div className="login-close-button" onClick={() => setIsOpen(false)}></div>
                  <h1 className='card-title-fast'>Acesso rápido</h1>
                  <span className='login-span-text'>Informe seu e-mail</span>

                  <form
                    className='form-step-container'
                    onSubmit={(e) => {
                      handleSendVerificationCode(e)
                      handleChangePage("put_code_signUp")
                    }}
                  >
                    <div className="form-input-column">

                      <input className='login-form-input' type="email" placeholder='Insira seu e-mail' onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
                    </div>

                    <div className="back-and-submit-row">
                      <button className='login-back-button' onClick={() => handleChangePage("login_choices")}>                       
                        Voltar
                      </button>

                      <button className='login-submit-button' type='submit'>
                        Entrar
                      </button>
                    </div>
                  </form>
                </div>
                {/* {children} */}
                <div className="sign-up-row">
                  <button className='sign-up-button'>Não possui uma conta?</button>
                  <button className='sign-in-button'>
                    Cadastre-se                    

                  </button>
                </div>
              </div>
            </div>
          )
        }

        {
          step === "put_code_signUp" && (
            <div>
              <div className='login-container'>
                <div className="login-content">
                  <div className="login-close-button" onClick={() => setIsOpen(false)}></div>
                  <h1 className='card-title'>Acessao rápido</h1>
                  <span className='login-span-text'>Agora é só informar o código recebido em:</span>
                  <span className='email-text'>{email}</span>
                  <form
                    className='form-step-container'
                    onSubmit={(e) => handleChangePage("signUp", e)}
                  >
                    <div className="form-input-column">
                      <input className='login-form-input' type="text" placeholder='Insira o código encaminhado' onChange={(e) => setCode(e.target.value)} required />
                    </div>
                    <p className='new-code' onClick={handleSendVerificationCode} >Solicitar novo código</p>
                    <div className="back-and-submit-row">
                      <button className='login-back-button' onClick={() => handleChangePage("send_code_signUp")}>                       
                        Voltar
                      </button>
                      <button className='login-submit-button' type='submit'>
                        Entrar                       
                      </button>
                    </div>
                  </form>
                </div>
                {/* {children} */}
                <div className="sign-up-row">
                  <button className='sign-up-button'>Não possui uma conta?</button>
                  <button className='sign-in-button'>
                    Cadastre-se                    
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </Modal >
    </div >
  )
}

export const CustomLoginWrapper = () => {
  return (
    <ApolloProvider client={client}>
      <CustomLogin />
    </ApolloProvider>
  )
}

const classicSignInMutation = gql`mutation ClassicSignIn($email: String!, $password: String!) {
  classicSignIn(email: $email, password: $password)
}`

export const sendEmailVerificationCodeMutation = gql`
  mutation SendEmailVerification($email: String!) {
    sendEmailVerification(email: $email)
  }
`

export const vtexRecoveryPasswordMutation = gql`
  mutation RecoveryPassword($email: String!, $newPassword: String!, $code: String!){
    recoveryPassword(email: $email, newPassword: $newPassword, code: $code)
  }
`
export const vtexAccessKeySignInMutation = gql`
  mutation AccessKeySignIn($email: String!, $code: String!){
    accessKeySignIn(email: $email, code: $code)
  }
`