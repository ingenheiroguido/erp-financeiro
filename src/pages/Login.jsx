import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

import { supabase } from "../services/supabaseClient"

export default function Login() {

    const navigate = useNavigate()

    const { signIn, signUp } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [resetEmail, setResetEmail] = useState("")

    async function handleLogin() {

        const { error } =
            await signIn(email, password)

        if (error) {

            alert(error.message)

            return
        }

        navigate("/")
    }

    async function handleRegister() {

        const { error } =
            await signUp(email, password)

        if (error) {

            alert(error.message)

            return
        }

        alert("Conta criada com sucesso!")
    }

    async function resetPassword() {

        const { error } =
            await supabase.auth.resetPasswordForEmail(
                resetEmail,
                {
                    redirectTo:
                        "http://localhost:5173"
                }
            )

        if (error) {

            alert("Erro ao enviar email")

            return
        }

        alert("Email de recuperação enviado.")
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial",
                padding: 20
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    background: "#111827",
                    padding: 40,
                    borderRadius: 25,
                    boxShadow:
                        "0 0 40px rgba(0,0,0,0.4)"
                }}
            >

                <h1
                    style={{
                        color: "white",
                        fontSize: 34,
                        marginBottom: 10
                    }}
                >
                    ERP PRO
                </h1>

                <p
                    style={{
                        color: "#9ca3af",
                        marginBottom: 30
                    }}
                >
                    Plataforma SaaS Inteligente
                </p>

                <input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={inputStyle}
                />

                <button
                    onClick={handleLogin}
                    style={loginButton}
                >
                    Entrar
                </button>

                <button
                    onClick={handleRegister}
                    style={registerButton}
                >
                    Criar Conta
                </button>

                {/* RECUPERAR SENHA */}
                <div
                    style={{
                        marginTop: 30
                    }}
                >

                    <h3
                        style={{
                            color: "white",
                            marginBottom: 15
                        }}
                    >
                        🔒 Recuperar senha
                    </h3>

                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={resetEmail}
                        onChange={(e) =>
                            setResetEmail(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <button
                        onClick={resetPassword}
                        style={resetButton}
                    >
                        Enviar recuperação
                    </button>

                </div>

            </div>

        </div>

    )
}

const inputStyle = {

    width: "100%",

    padding: 15,

    marginBottom: 15,

    borderRadius: 12,

    border: "1px solid #374151",

    background: "#1f2937",

    color: "white",

    fontSize: 16,

    boxSizing: "border-box"
}

const loginButton = {

    width: "100%",

    padding: 15,

    borderRadius: 12,

    border: "none",

    background: "#2563eb",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: 12,

    fontSize: 16
}

const registerButton = {

    width: "100%",

    padding: 15,

    borderRadius: 12,

    border: "none",

    background: "#374151",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: 16
}

const resetButton = {

    width: "100%",

    padding: 15,

    borderRadius: 12,

    border: "none",

    background: "#7c3aed",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    fontSize: 16
}