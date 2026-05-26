import { useState }
    from "react"

import { supabase }
    from "../services/supabaseClient"

import { useAuth }
    from "../context/AuthContext"

export default function ERPChatAI() {

    const { user } = useAuth()

    const [question, setQuestion]
        = useState("")

    const [response, setResponse]
        = useState("")

    async function handleAsk() {

        if (!question) return

        /* FINANCEIRO */

        const { data: finances }
            = await supabase
                .from("finances")
                .select("*")
                .eq("user_id", user.id)

        /* ESTOQUE */

        const { data: products }
            = await supabase
                .from("products")
                .select("*")
                .eq("user_id", user.id)

        let entradas = 0
        let saidas = 0

        finances?.forEach(item => {

            if (item.type === "entrada") {

                entradas += Number(item.amount)

            }

            else {

                saidas += Number(item.amount)

            }

        })

        const lucro =
            entradas - saidas

        const lowStock =
            products?.filter(product =>
                Number(product.quantity) <= 5
            )

        const q =
            question.toLowerCase()

        /* IA */

        if (
            q.includes("lucro")
        ) {

            setResponse(
                `💰 Seu lucro atual é R$ ${lucro}`
            )

        }

        else if (
            q.includes("estoque")
        ) {

            setResponse(
                `📦 Você possui ${lowStock.length} produtos com estoque baixo.`
            )

        }

        else if (
            q.includes("financeiro")
        ) {

            if (lucro > 0) {

                setResponse(
                    "✅ Seu financeiro está positivo."
                )

            }

            else {

                setResponse(
                    "⚠️ Seu financeiro está negativo."
                )

            }

        }

        else {

            setResponse(
                "🤖 Não entendi sua pergunta."
            )

        }

    }

    return (

        <div
            style={{
                background: "#111827",
                padding: 30,
                borderRadius: 24,
                marginBottom: 30
            }}
        >

            <h2
                style={{
                    marginBottom: 20,
                    color: "white"
                }}
            >
                🤖 Chat IA ERP
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20
                }}
            >

                <input
                    type="text"
                    placeholder="Pergunte algo..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    style={{
                        flex: 1,
                        padding: 15,
                        borderRadius: 12,
                        border: "none",
                        background: "#1f2937",
                        color: "white"
                    }}
                />

                <button
                    onClick={handleAsk}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "15px 20px",
                        borderRadius: 12,
                        cursor: "pointer"
                    }}
                >
                    Perguntar
                </button>

            </div>

            <div
                style={{
                    background: "#1f2937",
                    padding: 20,
                    borderRadius: 14,
                    color: "white",
                    minHeight: 80
                }}
            >
                {response || "Aguardando pergunta..."}
            </div>

        </div>

    )
}