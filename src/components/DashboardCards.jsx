import { useEffect, useState } from "react"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts"

import { supabase } from "../services/supabaseClient"

import { useAuth } from "../context/AuthContext"

import { generateFinancePDF }
    from "../services/pdfReport"

import AIInsights
    from "./AIInsights"

import FinanceChart
    from "./FinanceChart"

import StockChart
    from "./StockChart"

import FinancePieChart
    from "./FinancePieChart"

import ERPChatAI
    from "./ERPChatAI"



export default function DashboardCards() {


    const { user } = useAuth()

    const [entradas, setEntradas] = useState(0)
    const [saidas, setSaidas] = useState(0)
    const [saldo, setSaldo] = useState(0)

    const [products, setProducts] = useState(0)

    const [transactions, setTransactions]
        = useState([])

    const [chartData, setChartData]
        = useState([])

    const [aiMessage, setAiMessage]
        = useState("")

    const [stockMessage, setStockMessage]
        = useState("")

    useEffect(() => {

        if (user) {

            loadDashboard()

        }

    }, [user])

    async function loadDashboard() {

        // FINANCEIRO
        const { data: finances }
            = await supabase
                .from("finances")
                .select("*")
                .eq("user_id", user.id)

        let totalEntradas = 0
        let totalSaidas = 0

        finances?.forEach(item => {

            if (item.type === "entrada") {

                totalEntradas += Number(item.amount)

            }

            if (item.type === "saida") {

                totalSaidas += Number(item.amount)

            }

        })

        const currentSaldo =
            totalEntradas - totalSaidas

        setEntradas(totalEntradas)

        setSaidas(totalSaidas)

        setSaldo(currentSaldo)

        setTransactions(
            finances?.slice(0, 5) || []
        )

        setChartData([
            {
                name: "Entradas",
                valor: totalEntradas
            },
            {
                name: "Saídas",
                valor: totalSaidas
            }
        ])

        // IA FINANCEIRA
        if (currentSaldo <= 0) {

            setAiMessage(
                "⚠️ Atenção: caixa negativo."
            )

        }

        else if (
            totalSaidas >
            totalEntradas * 0.8
        ) {

            setAiMessage(
                "📉 Gastos elevados detectados."
            )

        }

        else {

            setAiMessage(
                "✅ Fluxo financeiro saudável."
            )

        }

        // ESTOQUE
        const { data: stockData }
            = await supabase
                .from("products")
                .select("*")
                .eq("user_id", user.id)

        setProducts(
            stockData?.length || 0
        )

        // IA ESTOQUE
        const lowStock =
            stockData?.filter(
                item =>
                    Number(item.quantity) <= 5
            ) || []

        if (lowStock.length > 0) {

            setStockMessage(
                `⚠️ ${lowStock.length} produto(s) com estoque baixo.`
            )

        }

        else if (
            stockData?.length === 0
        ) {

            setStockMessage(
                "📦 Nenhum produto cadastrado."
            )

        }

        else {

            setStockMessage(
                "✅ Estoque saudável."
            )

        }

    }

    return (

        <div>

            {/* CARDS */}
            <div style={cardsGrid}>

                <div style={greenCard}>
                    <h3>Entradas</h3>

                    <h1>
                        R$ {entradas}
                    </h1>
                </div>

                <div style={redCard}>
                    <h3>Saídas</h3>

                    <h1>
                        R$ {saidas}
                    </h1>
                </div>

                <div style={blueCard}>
                    <h3>Saldo</h3>

                    <h1>
                        R$ {saldo}
                    </h1>
                </div>

                <div style={purpleCard}>
                    <h3>Produtos</h3>

                    <h1>
                        {products}
                    </h1>
                </div>

            </div>

            {/* GRÁFICO */}
            <div style={chartBox}>

                <h2
                    style={{
                        marginBottom: 20
                    }}
                >
                    Financeiro
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={chartData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="valor"
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>

                <AIInsights />

                <FinanceChart />

                <StockChart />

                <FinancePieChart />

                <ERPChatAI />

            </div>

            {/* IA */}
            <div style={aiBox}>

                <h2>
                    🤖 IA Financeira
                </h2>

                <p>
                    {aiMessage}
                </p>

            </div>

            {/* IA ESTOQUE */}
            <div style={stockBox}>

                <h2>
                    📦 IA Estoque
                </h2>

                <p>
                    {stockMessage}
                </p>

            </div>

            <button
                onClick={() =>
                    generateFinancePDF(
                        transactions,
                        entradas,
                        saidas,
                        saldo
                    )
                }

                style={pdfButton}
            >
                📄 Gerar PDF Financeiro
            </button>

            {/* TRANSAÇÕES */}
            <div style={transactionsBox}>

                <h2
                    style={{
                        marginBottom: 20
                    }}
                >
                    Últimas movimentações
                </h2>

                {
                    transactions.map(item => (

                        <div
                            key={item.id}
                            style={transactionItem}
                        >

                            <div>

                                <strong>
                                    {
                                        item.description
                                        || "Movimentação"
                                    }
                                </strong>

                                <p
                                    style={{
                                        color: "#9ca3af"
                                    }}
                                >
                                    {item.type}
                                </p>

                            </div>

                            <h3
                                style={{
                                    color:
                                        item.type === "entrada"
                                            ? "#22c55e"
                                            : "#ef4444"
                                }}
                            >
                                R$ {item.amount}
                            </h3>

                        </div>

                    ))
                }

            </div>

        </div>

    )
}

const cardsGrid = {
    display: "grid",
    gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",

    gap: 20,
    marginBottom: 30
}

const greenCard = {
    background: "#16a34a",
    padding: 30,
    borderRadius: 20,
    color: "white"
}

const redCard = {
    background: "#dc2626",
    padding: 30,
    borderRadius: 20,
    color: "white"
}

const blueCard = {
    background: "#2563eb",
    padding: 30,
    borderRadius: 20,
    color: "white"
}

const purpleCard = {
    background: "#7c3aed",
    padding: 30,
    borderRadius: 20,
    color: "white"
}

const chartBox = {
    background: "#111827",
    padding: 25,
    borderRadius: 20,
    marginBottom: 30
}

const aiBox = {
    background: "#111827",
    padding: 25,
    borderRadius: 20,
    marginBottom: 30,
    border: "1px solid #2563eb"
}

const stockBox = {
    background: "#111827",
    padding: 25,
    borderRadius: 20,
    marginBottom: 30,
    border: "1px solid #16a34a"
}

const transactionsBox = {
    background: "#111827",
    padding: 25,
    borderRadius: 20
}

const transactionItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottom: "1px solid #1f2937"
}

const pdfButton = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "15px 20px",
    borderRadius: 12,
    cursor: "pointer",
    marginBottom: 25,
    fontSize: 16,
    fontWeight: "bold"
}