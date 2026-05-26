import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
}
    from "recharts"

import { useEffect, useState }
    from "react"

import { supabase }
    from "../services/supabaseClient"

import { useAuth }
    from "../context/AuthContext"

export default function FinanceChart() {

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
                valor: entradas
            },
            {
                name: "Saídas",
                valor: saidas
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
                📊 Gráfico Financeiro
            </h2>

            <div
                style={{
                    width: "100%",
                    height: 300
                }}
            >

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="valor"
                            stroke="#2563eb"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    )
}