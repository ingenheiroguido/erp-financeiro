import jsPDF from "jspdf"

export function generatePDFReport({
    companyName,
    entradas,
    saidas,
    saldo,
    lowStock
}) {

    const doc = new jsPDF()

    /* TÍTULO */

    doc.setFontSize(22)

    doc.text(
        "ERP PRO - Relatório Inteligente",
        20,
        20
    )

    /* EMPRESA */

    doc.setFontSize(14)

    doc.text(
        `Empresa: ${companyName}`,
        20,
        40
    )

    doc.text(
        `Data: ${new Date().toLocaleDateString()}`,
        20,
        50
    )

    /* FINANCEIRO */

    doc.setFontSize(18)

    doc.text(
        "Resumo Financeiro",
        20,
        80
    )

    doc.setFontSize(14)

    doc.text(
        `Entradas: R$ ${entradas}`,
        20,
        95
    )

    doc.text(
        `Saídas: R$ ${saidas}`,
        20,
        105
    )

    doc.text(
        `Saldo: R$ ${saldo}`,
        20,
        115
    )

    /* ESTOQUE */

    doc.setFontSize(18)

    doc.text(
        "Produtos com Estoque Baixo",
        20,
        145
    )

    doc.setFontSize(14)

    if (lowStock.length === 0) {

        doc.text(
            "Nenhum produto com estoque baixo.",
            20,
            160
        )

    }

    else {

        lowStock.forEach(
            (product, index) => {

                doc.text(
                    `• ${product.name} (${product.quantity} unidades)`,
                    20,
                    160 + (index * 10)
                )

            }
        )

    }

    /* IA */

    doc.setFontSize(18)

    doc.text(
        "Análise Inteligente",
        20,
        220
    )

    doc.setFontSize(14)

    if (saldo > 0) {

        doc.text(
            "Seu financeiro está positivo.",
            20,
            235
        )

    }

    else {

        doc.text(
            "Seu financeiro está negativo.",
            20,
            235
        )

    }

    /* DOWNLOAD */

    doc.save(
        "relatorio-erp-pro.pdf"
    )

}