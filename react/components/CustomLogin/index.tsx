
//@ts-ignore
import { useRenderSession } from "vtex.session-client";
import { useDevice } from "vtex.device-detector";

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

  const { isMobile } = useDevice();
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
        <>
          <div className="user-logged" onClick={() => setIsOpenLogged(!isOpenLogged)}>
            {isMobile ?
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="#3D1151"/>
                <path d="M15.0002 15.0001C17.3013 15.0001 19.1668 13.1346 19.1668 10.8334C19.1668 8.53223 17.3013 6.66675 15.0002 6.66675C12.699 6.66675 10.8335 8.53223 10.8335 10.8334C10.8335 13.1346 12.699 15.0001 15.0002 15.0001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.0002 15.0001C17.3013 15.0001 19.1668 13.1346 19.1668 10.8334C19.1668 8.53223 17.3013 6.66675 15.0002 6.66675C12.699 6.66675 10.8335 8.53223 10.8335 10.8334C10.8335 13.1346 12.699 15.0001 15.0002 15.0001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.1585 23.3333C22.1585 20.1083 18.9501 17.5 15.0001 17.5C11.0501 17.5 7.8418 20.1083 7.8418 23.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22.1585 23.3333C22.1585 20.1083 18.9501 17.5 15.0001 17.5C11.0501 17.5 7.8418 20.1083 7.8418 23.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> 
            :
              <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20.2373" cy="20" r="20" fill="#D21E7E"/>
                <path d="M20.237 20C23.2285 20 25.6536 17.5748 25.6536 14.5833C25.6536 11.5918 23.2285 9.16663 20.237 9.16663C17.2454 9.16663 14.8203 11.5918 14.8203 14.5833C14.8203 17.5748 17.2454 20 20.237 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M29.5433 30.8333C29.5433 26.6408 25.3725 23.25 20.2375 23.25C15.1025 23.25 10.9316 26.6408 10.9316 30.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }

            {/*@ts-ignore */}
            <div className="login-button-text" onClick={() => window.location.href = '/account'}>Olá <span>{session?.namespaces.profile.email.value}</span></div>
          </div>
        </>

        :

        (
          <div className="user-login" onClick={() => setIsOpen(true)}>
            {isMobile ?
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#3D1151"/>
              <path d="M15.0002 15.0001C17.3013 15.0001 19.1668 13.1346 19.1668 10.8334C19.1668 8.53223 17.3013 6.66675 15.0002 6.66675C12.699 6.66675 10.8335 8.53223 10.8335 10.8334C10.8335 13.1346 12.699 15.0001 15.0002 15.0001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.0002 15.0001C17.3013 15.0001 19.1668 13.1346 19.1668 10.8334C19.1668 8.53223 17.3013 6.66675 15.0002 6.66675C12.699 6.66675 10.8335 8.53223 10.8335 10.8334C10.8335 13.1346 12.699 15.0001 15.0002 15.0001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.1585 23.3333C22.1585 20.1083 18.9501 17.5 15.0001 17.5C11.0501 17.5 7.8418 20.1083 7.8418 23.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.1585 23.3333C22.1585 20.1083 18.9501 17.5 15.0001 17.5C11.0501 17.5 7.8418 20.1083 7.8418 23.3333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>            
            :
              <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20.2373" cy="20" r="20" fill="#D21E7E"/>
                <path d="M20.237 20C23.2285 20 25.6536 17.5748 25.6536 14.5833C25.6536 11.5918 23.2285 9.16663 20.237 9.16663C17.2454 9.16663 14.8203 11.5918 14.8203 14.5833C14.8203 17.5748 17.2454 20 20.237 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M29.5433 30.8333C29.5433 26.6408 25.3725 23.25 20.2375 23.25C15.1025 23.25 10.9316 26.6408 10.9316 30.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }

            {isMobile ?
              (<div className="login-button-text">Entrar <span>ou cadastrar</span></div>)
              :
              (<div className="login-button-text">Entrar <span>cadastrar</span></div>)
            }
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

              <div className="login-close-button" onClick={handleCloseModal}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h1 className='card-title'>Acessar Conta</h1>
              <div className="login-button">
                <button className='login-btn-1' onClick={() => handleChangePage("login_with_password")}>Entrar com e-mail e senha</button>
                <button className='login-btn-2' onClick={() => handleChangePage("send_code_login")}>Receber chave de acesso rápido por email</button>
              </div>
            </div>            
            <div className="sign-up-row">
              <button className='sign-up-button'>Não possui uma conta?</button>
              <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                Cadastre-se
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </button>
            </div>
          </div>
        )}

        {step === "login_with_password" && (
          <div>
            <div className='login-container'>
              <div className="login-content">

                <div className="login-close-button" onClick={handleCloseModal}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
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
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9624 22.5875L4.3749 15L11.9624 7.4125" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.6252 15L4.58775 15" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Voltar
                    </button>

                    <button className='login-submit-button' type='submit'>
                      Entrar
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.0065 0C7.66691 0 0.0933238 7.80869 0.00717875 17.4746L0 33.5908C0 37.1304 2.76741 40 6.1809 40H22.028C31.9526 40 40 31.6553 40 21.3641V0H17.0065Z" fill="#A10E11"/>
                      <path d="M22.8352 12.9183L29.9169 20L22.8352 27.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.0834 20H29.7184" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                  Cadastre-se
                  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
              </div>
            </div>


          </div>
        )}

        {step === "send_code_login" && (
          <div>
            <div className='login-container'>
              <div className="login-content">

                <div className="login-close-button" onClick={handleCloseModal}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                </div>
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

                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8352 6.91832L23.9169 14L16.8352 21.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.0835 14H23.7185" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>

                    <button className='login-back-button' onClick={() => handleChangePage("login_choices")}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9624 22.5875L4.3749 15L11.9624 7.4125" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.6252 15L4.58775 15" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Voltar
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button'>
                  Cadastre-se
                  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
              </div>
            </div>


          </div>
        )}

        {step === "login_with_code" && (
          <div>
            <div className='login-container'>
              <div className="login-content">

                <div className="login-close-button" onClick={handleCloseModal}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                </div>
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
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9624 22.5875L4.3749 15L11.9624 7.4125" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.6252 15L4.58775 15" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>


                      Voltar
                    </button>

                    <button className='login-submit-button' type='submit'>
                      Entrar

                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8352 6.91832L23.9169 14L16.8352 21.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.0835 14H23.7185" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>

                  </div>
                </form>


              </div>
              {/* {children} */}
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button' onClick={() => handleChangePage("send_code_signUp")}>
                  Cadastre-se
                  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
              </div>
            </div>


          </div>
        )}
        {step === "signUp" && (
          <div>
            <div className='login-container'>
              <div className="login-close-button-sign-up" onClick={() => setIsOpen(false)}>

                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>


              </div>

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
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9624 22.5875L4.3749 15L11.9624 7.41253" stroke="#0A3F40" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.6252 15L4.58775 15" stroke="#0A3F40" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Voltar
                    </button>

                    <button className='login-submit-button purple' type='submit'>
                      Confirmar
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8352 6.91832L23.9169 14L16.8352 21.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.0835 14H23.7185" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>

                  </div>
                </form>
              </div>
              <div className="sign-up-row">
                <button className='sign-up-button'>Não possui uma conta?</button>
                <button className='sign-in-button'>
                  Cadastre-se
                  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

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

                  <div className="login-close-button" onClick={() => setIsOpen(false)}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                  </div>
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
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9624 22.5875L4.3749 15L11.9624 7.4125" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M25.6252 15L4.58775 15" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                        Voltar
                      </button>

                      <button className='login-submit-button' type='submit'>
                        Entrar

                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8352 6.91832L23.9169 14L16.8352 21.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M4.0835 14H23.7185" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>

                    </div>
                  </form>


                </div>
                {/* {children} */}
                <div className="sign-up-row">
                  <button className='sign-up-button'>Não possui uma conta?</button>
                  <button className='sign-in-button'>
                    Cadastre-se
                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

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

                  <div className="login-close-button" onClick={() => setIsOpen(false)}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.84211 7.84211L11 11M11 11L14.1579 14.1579M11 11L14.1579 7.84211M11 11L7.84211 14.1579M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                  </div>
                  <h1 className='card-title'>Acessao rápido</h1>
                  <span className='login-span-text'>Agora é só informar o código recebido em:</span>

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
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9624 22.5875L4.3749 15L11.9624 7.4125" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M25.6252 15L4.58775 15" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                        Voltar
                      </button>

                      <button className='login-submit-button' type='submit'>
                        Entrar

                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.8352 6.91832L23.9169 14L16.8352 21.0816" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M4.0835 14H23.7185" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </button>

                    </div>
                  </form>


                </div>
                {/* {children} */}
                <div className="sign-up-row">
                  <button className='sign-up-button'>Não possui uma conta?</button>
                  <button className='sign-in-button'>
                    Cadastre-se
                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10.6442 1L16 6.5L10.6442 12M1 6.49996H15.8497" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

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