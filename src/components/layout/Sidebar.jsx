export default function Sidebar() {

    return (

        <aside style={{
            width: 260,
            minHeight: "100vh",
            background: "#0f172a",
            color: "white",
            padding: 20
        }}>

            <h1 style={{ fontSize: 26, marginBottom: 30 }}>
                ERP PRO
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                <button>Dashboard</button>
                <button>Financeiro</button>
                <button>Estoque</button>

            </div>

        </aside>

    )
}