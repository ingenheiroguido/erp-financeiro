import { Link } from "react-router-dom"
import { useState } from "react"

export default function MainLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(true)

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#0f172a",
                color: "white",
                fontFamily: "Arial"
            }}
        >

            {/* BOTÃO MENU */}
            <button
                onClick={() =>
                    setMenuOpen(!menuOpen)
                }
                style={mobileButton}
            >
                ☰
            </button>

            {/* SIDEBAR */}
            <aside
                style={{
                    ...sidebarStyle,

                    left:
                        menuOpen
                            ? 0
                            : -260
                }}
            >

                <div>

                    <h1
                        style={{
                            fontSize: 28,
                            marginBottom: 5
                        }}
                    >
                        ERP PRO
                    </h1>

                    <p
                        style={{
                            color: "#9ca3af",
                            marginBottom: 40
                        }}
                    >
                        Gestão inteligente
                    </p>

                </div>

                {/* MENU */}
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 15
                    }}
                >

                    <Link
                        to="/"
                        style={linkStyle}
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        to="/financeiro"
                        style={linkStyle}
                    >
                        💰 Financeiro
                    </Link>

                    <Link
                        to="/estoque"
                        style={linkStyle}
                    >
                        📦 Estoque
                    </Link>

                    <Link
                        to="/settings"
                        style={linkStyle}
                    >
                        ⚙️ Configurações
                    </Link>

                </nav>

                {/* FOOTER */}
                <div
                    style={{
                        marginTop: "auto",
                        color: "#6b7280",
                        fontSize: 14
                    }}
                >
                    SaaS Premium v2.0
                </div>

            </aside>

            {/* CONTEÚDO */}
            <main
                style={{
                    flex: 1,
                    padding: 20,

                    marginLeft:
                        menuOpen
                            ? 260
                            : 0,

                    transition: "0.3s",

                    width: "100%"
                }}
            >

                {/* TOPBAR */}
                <div
                    style={{
                        background: "#111827",
                        padding: 20,
                        borderRadius: 20,
                        marginBottom: 25,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 15
                    }}
                >

                    <div>

                        <h2
                            style={{
                                marginBottom: 5
                            }}
                        >
                            Painel Administrativo
                        </h2>

                        <p
                            style={{
                                color: "#9ca3af"
                            }}
                        >
                            Controle total do sistema
                        </p>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                        }}
                    >

                        <div
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#22c55e"
                            }}
                        />

                        <span
                            style={{
                                color: "#22c55e"
                            }}
                        >
                            Sistema Online
                        </span>

                    </div>

                </div>

                {children}

            </main>

        </div>

    )
}

const sidebarStyle = {
    width: 260,
    background: "#111827",
    padding: 25,
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    bottom: 0,
    transition: "0.3s",
    zIndex: 1000
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    background: "#1f2937",
    padding: 15,
    borderRadius: 12,
    fontWeight: "bold"
}

const mobileButton = {
    position: "fixed",
    top: 15,
    left: 15,
    zIndex: 2000,
    background: "#2563eb",
    border: "none",
    color: "white",
    width: 45,
    height: 45,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 20
}