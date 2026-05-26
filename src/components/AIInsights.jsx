import { useEffect, useState }
    from "react"

import { supabase }
    from "../services/supabaseClient"

import { useAuth }
    from "../context/AuthContext"

export default function AIInsights() {

    const { user } = useAuth()

    const [insights, setInsights]
        = useState([])

    useEffect(() => {

        if (user) {

            generateInsights()

        }

    }, [user])

    async function generateInsights() {

        const insightsList = []

        /* FINANCEIRO */

        const { data: financeData }
            = await supabase
                .from("finances")
                .select("*")
                .eq("user_id", user.id)

        let entradas = 0
        let saidas = 0

        financeData?.forEach(item => {

            if (item.type === "entrada") {

                entradas += Number(item.amount)

            }

            else {

                saidas += Number(item.amount)

            }

        })

        if (saidas > entradas) {

            insightsList.push(
                "⚠️ Suas saídas estão maiores que as entradas."
            )

        }

        else {

            insightsList.push(
                "✅ Seu financeiro está saudável."
            )

        }

        /* ESTOQUE */

        const { data: stockData }
            = await supabase
                .from("products")
                .select("*")
                .eq("user_id", user.id)

        const lowStock =
            stockData?.filter(product =>
                Number(product.quantity) <= 5
            )

        if (lowStock?.length > 0) {

            insightsList.push(
                `📦 Você possui ${lowStock.length} produtos com estoque baixo.`
            )

        }

        else {

            insightsList.push(
                "✅ Todos os produtos possuem estoque saudável."
            )

        }

        /* LUCRO */

        const lucro =
            entradas - saidas

        if (lucro > 0) {

            insightsList.push(
                `💰 Seu lucro atual é de R$ ${lucro}.`
            )

        }

        else {

            insightsList.push(
                "⚠️ Seu lucro está negativo."
            )

        }

        setInsights(insightsList)

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
                🤖 IA do ERP
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15
                }}
            >

                {insights.map(
                    (item, index) => (

                        <div
                            key={index}
                            style={{
                                background: "#1f2937",
                                padding: 18,
                                borderRadius: 14,
                                color: "white"
                            }}
                        >
                            {item}
                        </div>

                    )
                )}

            </div>

        </div>

    )
}