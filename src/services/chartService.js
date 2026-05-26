import { getFinanceData } from "./financeService"

export function getMonthlyFlow() {
    const data = getFinanceData()

    const months = {}

    data.forEach(item => {

        const date = new Date()
        const month = date.getMonth()

        if (!months[month]) {
            months[month] = { entrada: 0, saida: 0 }
        }

        if (item.type === "Entrada") {
            months[month].entrada += Number(item.value)
        }

        if (item.type === "Saída") {
            months[month].saida += Number(item.value)
        }

    })

    return Object.keys(months).map(key => ({
        month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][key],
        entrada: months[key].entrada,
        saida: months[key].saida
    }))
}