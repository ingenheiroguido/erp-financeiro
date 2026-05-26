const FINANCE_KEY = "erp_financeiro"
const STOCK_KEY = "erp_stock"

export function getFinanceData() {
    const data = localStorage.getItem(FINANCE_KEY)
    return data ? JSON.parse(data) : []
}

export function getStockData() {
    const data = localStorage.getItem(STOCK_KEY)
    return data ? JSON.parse(data) : []
}

// 🔥 soma entradas
export function getTotalEntradas() {
    const data = getFinanceData()
    return data
        .filter(item => item.type === "Entrada")
        .reduce((acc, item) => acc + Number(item.value), 0)
}

// 🔥 soma saídas
export function getTotalSaidas() {
    const data = getFinanceData()
    return data
        .filter(item => item.type === "Saída")
        .reduce((acc, item) => acc + Number(item.value), 0)
}

// 🔥 saldo real
export function getSaldo() {
    return getTotalEntradas() - getTotalSaidas()
}

// 🔥 total produtos
export function getTotalProdutos() {
    const data = getStockData()
    return data.length
}

// 🔥 valor estoque
export function getValorEstoque() {
    const data = getStockData()
    return data.reduce((acc, item) => acc + (item.qty * item.price), 0)
}