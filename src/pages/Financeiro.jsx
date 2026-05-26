import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../services/supabaseClient"

export default function Financeiro() {

    const { user } = useAuth()

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("entrada")

    const [transactions, setTransactions] = useState([])

    const [entradas, setEntradas] = useState(0)
    const [saidas, setSaidas] = useState(0)
    const [saldo, setSaldo] = useState(0)

    useEffect(() => {

        if (user) {

            loadTransactions()

        }

    }, [user])

    async function loadTransactions() {

        const { data, error } = await supabase
            .from("finances")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", {
                ascending: false
            })

        if (error) {

            console.log(error)

            return

        }

        const list = data || []

        setTransactions(list)

        let totalEntradas = 0
        let totalSaidas = 0

        list.forEach((item) => {

            const value = Number(item.amount)

            if (item.type === "entrada") {

                totalEntradas += value

            }

            if (item.type === "saida") {

                totalSaidas += value

            }

        })

        setEntradas(totalEntradas)
        setSaidas(totalSaidas)
        setSaldo(totalEntradas - totalSaidas)

    }

    async function addTransaction(e) {

        e.preventDefault()

        if (!description || !amount) {

            alert("Preencha todos os campos")

            return

        }

        const { error } = await supabase
            .from("finances")
            .insert([
                {
                    description,
                    amount,
                    type,
                    user_id: user.id
                }
            ])

        if (error) {

            console.log(error)

            alert("Erro ao salvar")

            return

        }

        setDescription("")
        setAmount("")
        setType("entrada")

        loadTransactions()

    }

    return (

        <div style={{ color: "white" }}>

            <div style={{ marginBottom: 30 }}>

                <h1 style={{ fontSize: 32 }}>
                    💰 Financeiro
                </h1>

                <p style={{ color: "#9ca3af" }}>
                    Controle financeiro inteligente
                </p>

            </div>

            <div style={cardsContainer}>

                <div style={greenCard}>

                    <p>Entradas</p>

                    <h2>
                        R$ {entradas}
                    </h2>

                </div>

                <div style={redCard}>

                    <p>Saídas</p>

                    <h2>
                        R$ {saidas}
                    </h2>

                </div>

                <div style={blueCard}>

                    <p>Saldo</p>

                    <h2>
                        R$ {saldo}
                    </h2>

                </div>

            </div>

            <form
                onSubmit={addTransaction}
                style={formStyle}
            >

                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                    style={inputStyle}
                />

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value)
                    }
                    style={inputStyle}
                >

                    <option value="entrada">
                        Entrada
                    </option>

                    <option value="saida">
                        Saída
                    </option>

                </select>

                <button
                    type="submit"
                    style={buttonStyle}
                >
                    Salvar
                </button>

            </form>

            <div style={{ marginTop: 30 }}>

                <h2 style={{ marginBottom: 20 }}>
                    Últimas Movimentações
                </h2>

                <div style={transactionsContainer}>

                    {transactions.map((item) => (

                        <div
                            key={item.id}
                            style={transactionCard}
                        >

                            <div>

                                <p style={{ fontWeight: "bold" }}>
                                    {item.description}
                                </p>

                                <span style={{ color: "#9ca3af" }}>
                                    {item.type}
                                </span>

                            </div>

                            <div
                                style={{
                                    color:
                                        item.type === "entrada"
                                            ? "#22c55e"
                                            : "#ef4444",

                                    fontWeight: "bold"
                                }}
                            >
                                R$ {item.amount}
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )

}

const cardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginBottom: 30
}

const formStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 15
}

const inputStyle = {
    padding: 15,
    borderRadius: 10,
    border: "1px solid #374151",
    background: "#111827",
    color: "white"
}

const buttonStyle = {
    background: "#2563eb",
    border: "none",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
}

const greenCard = {
    background: "#16a34a",
    padding: 25,
    borderRadius: 20
}

const redCard = {
    background: "#dc2626",
    padding: 25,
    borderRadius: 20
}

const blueCard = {
    background: "#2563eb",
    padding: 25,
    borderRadius: 20
}

const transactionsContainer = {
    display: "flex",
    flexDirection: "column",
    gap: 15
}

const transactionCard = {
    background: "#111827",
    padding: 20,
    borderRadius: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}