import { useState } from "react"
import { supabase } from "../../services/supabaseClient"
import { useAuth } from "../../context/AuthContext"

export default function NewFinanceForm({ onCreated }) {

    const { user } = useAuth()

    const [type, setType] = useState("entrada")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (!user?.id) return alert("Usuário não encontrado")

        setLoading(true)

        const { error } = await supabase
            .from("finances")
            .insert([
                {
                    type,
                    amount: Number(amount),
                    description,
                    user_id: user.id
                }
            ])

        setLoading(false)

        if (error) {
            alert("Erro ao salvar")
            console.log(error)
            return
        }

        setAmount("")
        setDescription("")

        if (onCreated) onCreated()

        alert("Movimentação salva ✔")
    }

    return (

        <form onSubmit={handleSubmit} style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            marginTop: 20
        }}>

            <h2>Nova Movimentação</h2>

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>

            <br /><br />

            <input
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
            />

            <br /><br />

            <input
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </button>

        </form>

    )
}