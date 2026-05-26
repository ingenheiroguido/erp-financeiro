import jsPDF from "jspdf"

export function generateFinancePDF(
    finances,
    entradas,
    saidas,
    saldo
) {

    const doc = new jsPDF()

    doc.setFontSize(22)

    doc.text(
        "ERP PRO - Relatório Financeiro",
        20,
        20
    )

    doc.setFontSize(14)

    doc.text(
        `Entradas: R$ ${entradas}`,
        20,
        40
    )

    doc.text(
        `Saídas: R$ ${saidas}`,
        20,
        50
    )

    doc.text(
        `Saldo: R$ ${saldo}`,
        20,
        60
    )

    doc.text(
        "Movimentações:",
        20,
        80
    )

    let y = 95

    finances.forEach(item => {

        doc.text(

            `${item.type} - ${item.description || "Sem descrição"} - R$ ${item.amount}`,

            20,

            y

        )

        y += 10

    })

    doc.save(
        "relatorio-financeiro.pdf"
    )

}