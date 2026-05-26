import { useEffect, useState } from "react"

import { useAuth } from "../context/AuthContext"

import { supabase } from "../services/supabaseClient"

import { sendWhatsAppMessage }
    from "../services/whatsapp"

export default function Estoque() {

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const [products, setProducts] = useState([])

    const [editingId, setEditingId] = useState(null)

    const [totalItems, setTotalItems] = useState(0)
    const [stockValue, setStockValue] = useState(0)

    const { user } = useAuth()

    useEffect(() => {

        if (user) {
            loadProducts()
        }

    }, [user])

    async function loadProducts() {

        const { data, error } = await supabase
            .from("products")
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

        setProducts(list)

        let items = 0
        let value = 0

        list.forEach(item => {

            items += Number(item.quantity)

            value += (
                Number(item.quantity) *
                Number(item.price)
            )

        })

        setTotalItems(items)
        setStockValue(value)
    }

    async function saveProduct(e) {

        e.preventDefault()

        if (!name || !quantity || !price) {

            alert("Preencha todos os campos")

            return
        }

        if (editingId) {

            const { error } = await supabase
                .from("products")
                .update({
                    name,
                    quantity: Number(quantity),
                    price: Number(price),
                    category
                })
                .eq("id", editingId)

            if (error) {
                console.log(error)
                return
            }

        } else {

            const { error } = await supabase
                .from("products")
                .insert([
                    {
                        name,
                        quantity: Number(quantity),
                        price: Number(price),
                        category,
                        user_id: user.id
                    }
                ])

            if (error) {
                console.log(error)
                return
            }

            // ALERTA WHATSAPP
            if (Number(quantity) <= 5) {

                await sendWhatsAppMessage(
                    user.id,
                    `⚠️ ALERTA ERP PRO

Produto: ${name}

Estoque baixo:
${quantity} unidades.`

                )
            }
        }

        clearForm()

        loadProducts()
    }

    function editProduct(product) {

        setEditingId(product.id)

        setName(product.name)
        setQuantity(product.quantity)
        setPrice(product.price)
        setCategory(product.category || "")
    }

    async function deleteProduct(id) {

        const confirmDelete = confirm(
            "Deseja excluir este produto?"
        )

        if (!confirmDelete) return

        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id)

        if (error) {
            console.log(error)
            return
        }

        loadProducts()
    }

    function clearForm() {

        setEditingId(null)

        setName("")
        setQuantity("")
        setPrice("")
        setCategory("")
    }

    return (

        <div style={{ color: "white" }}>

            {/* HEADER */}
            <div style={{ marginBottom: 30 }}>

                <h1 style={{
                    fontSize: 34,
                    marginBottom: 5
                }}>
                    Estoque Avançado
                </h1>

                <p style={{
                    color: "#9ca3af"
                }}>
                    Gestão inteligente de produtos
                </p>

            </div>

            {/* CARDS */}
            <div style={cardsGrid}>

                <div style={blueCard}>
                    <p>Total de Itens</p>

                    <h2 style={cardValue}>
                        {totalItems}
                    </h2>
                </div>

                <div style={greenCard}>
                    <p>Valor em Estoque</p>

                    <h2 style={cardValue}>
                        R$ {stockValue}
                    </h2>
                </div>

                <div style={redCard}>
                    <p>Produtos</p>

                    <h2 style={cardValue}>
                        {products.length}
                    </h2>
                </div>

            </div>

            {/* FORM */}
            <form
                onSubmit={saveProduct}
                style={formStyle}
            >

                <input
                    type="text"
                    placeholder="Produto"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Preço"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                >
                    {
                        editingId
                            ? "Atualizar"
                            : "Salvar Produto"
                    }
                </button>

            </form>

            {/* LISTA */}
            <div style={listStyle}>

                {products.map(product => (

                    <div
                        key={product.id}
                        style={{
                            background: "#111827",
                            padding: 20,
                            borderRadius: 18,
                            border:
                                product.quantity <= 3
                                    ? "1px solid #ef4444"
                                    : "1px solid transparent"
                        }}
                    >

                        <div style={productHeader}>

                            <div>

                                <h3>
                                    {product.name}
                                </h3>

                                <p style={textGray}>
                                    Categoria:
                                    {" "}
                                    {product.category || "Sem categoria"}
                                </p>

                                <p style={{
                                    color:
                                        product.quantity <= 3
                                            ? "#ef4444"
                                            : "#9ca3af"
                                }}>
                                    Quantidade:
                                    {" "}
                                    {product.quantity}
                                </p>

                            </div>

                            <div style={{
                                textAlign: "right"
                            }}>

                                <h2 style={{
                                    color: "#22c55e"
                                }}>
                                    R$ {product.price}
                                </h2>

                                <div style={actionsStyle}>

                                    <button
                                        onClick={() =>
                                            editProduct(product)
                                        }
                                        style={editButton}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                        style={deleteButton}
                                    >
                                        Excluir
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )
}

/* ESTILOS */

const cardsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginBottom: 30
}

const formStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 15
}

const inputStyle = {
    padding: 15,
    borderRadius: 10,
    border: "1px solid #374151",
    background: "#111827",
    color: "white",
    fontSize: 16
}

const buttonStyle = {
    background: "#2563eb",
    border: "none",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16
}

const editButton = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer"
}

const deleteButton = {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer"
}

const cardValue = {
    fontSize: 32
}

const blueCard = {
    background: "#2563eb",
    padding: 25,
    borderRadius: 20
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

const listStyle = {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 15
}

const productHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const actionsStyle = {
    display: "flex",
    gap: 10,
    marginTop: 10
}

const textGray = {
    color: "#9ca3af"
}