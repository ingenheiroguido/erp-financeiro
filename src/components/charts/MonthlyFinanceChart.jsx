import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

export default function MonthlyFinanceChart({ data }) {
    return (
        <div className="bg-white p-4 mt-6 rounded-xl shadow">

            <h3 className="font-bold mb-4">Evolução Mensal</h3>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="entradas"
                        stroke="#16a34a"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="saidas"
                        stroke="#dc2626"
                        strokeWidth={2}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}