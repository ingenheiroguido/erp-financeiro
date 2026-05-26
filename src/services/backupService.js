import { getFinanceData, getStockData } from "./financeService"

export function exportBackup() {

    const data = {
        finance: getFinanceData(),
        stock: getStockData(),
        date: new Date()
    }

    const blob = new Blob([JSON.stringify(data)], {
        type: "application/json"
    })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "erp-backup.json"
    a.click()
}