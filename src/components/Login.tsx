import React, { useState, useEffect } from "react";

import styles from "./Login.module.css";

import tost from 'react-toastify/dist/ReactToastify.css';

import { ToastType } from "./types/global";
import { useNavigate } from "react-router-dom";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

type LoginProps = {
    onNotify: (message: string,  type: ToastType) => void; // Defina a função que espera receber uma string
};


export const Login: React.FC<LoginProps> = ({ onNotify }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    //const [error, setError] = useState<string | null>(null); // Definindo o estado de erro    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica de login pode ser adicionada aqui
        try {
            const response = await fetch('http://localhost:3030/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "usuario_email": username,
                    "usuario_password": password
                })
            })
            const data = await response.json()
            if (!response.ok) {  
                //popup                  
                onNotify(data.message, ToastType.ERROR)
            } else {
                localStorage.setItem('token', data.token)                
                navigate('/')
                //onNotify(data.message, ToastType.SUCCESS)               
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
            onNotify(`${error}`, ToastType.ERROR)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.titleContainer}>
                    <img src='/src/assets/logo.png' alt='Logo' className={styles.logo} />
                    <h1 className={styles.title}>Check Point</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor='username'>Usuário</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Usuário'
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor='password'>Senha</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Senha'
                            required
                        />
                    </div>
                    <button type='submit' className={styles.loginButton}>
                        Entrar
                    </button>
                    <a href='#' className={styles.forgotPassword}>
                        Esqueci minha senha
                    </a>
                </form>
                <footer className={styles.footer}>Rede Doctum - Ciência da Computação</footer>
            </div>
        </div>
    );
};


export default Login;
