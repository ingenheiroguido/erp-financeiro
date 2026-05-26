import {
    ResponsiveContainer,
    BarChart,
    Bar,
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

export default function StockChart() {

    const { user } = useAuth()

    const [data, setData]
        = useState([])

    useEffect(() => {

        if (user) {

            loadStock()

        }

    }, [user])

    async function loadStock() {

        const { data }
            = await supabase
                .from("products")
                .select("*")
                .eq("user_id", user.id)

        if (!data) return

        const chartData =
            data.map(product => ({
                name: product.name,
                quantidade:
                    Number(product.quantity)
            }))

        setData(chartData)

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
                📦 Estoque Inteligente
            </h2>

            <div
                style={{
                    width: "100%",
                    height: 320
                }}
            >

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="quantidade"
                            fill="#22c55e"
                            radius={[10, 10, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    )
}