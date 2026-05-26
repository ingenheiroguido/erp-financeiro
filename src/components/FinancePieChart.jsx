import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
}
    from "recharts"

import { useEffect, useState }
    from "react"

import { supabase }
    from "../services/supabaseClient"

import { useAuth }
    from "../context/AuthContext"

const COLORS = [
    "#22c55e",
    "#ef4444"
]

export default function FinancePieChart() {

    const { user } = useAuth()

    const [data, setData]
        = useState([])

    useEffect(() => {

        if (user) {

            loadChart()

        }

    }, [user])

    async function loadChart() {

        const { data }
            = await supabase
                .from("finances")
                .select("*")
                .eq("user_id", user.id)

        if (!data) return

        let entradas = 0
        let saidas = 0

        data.forEach(item => {

            if (item.type === "entrada") {

                entradas += Number(item.amount)

            }

            else {

                saidas += Number(item.amount)

            }

        })

        setData([
            {
                name: "Entradas",
                value: entradas
            },
            {
                name: "Saídas",
                value: saidas
            }
        ])

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
                🥧 Resumo Financeiro
            </h2>

            <div
                style={{
                    width: "100%",
                    height: 320
                }}
            >

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                        >

                            {data.map(
                                (entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                            index % COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    )
}