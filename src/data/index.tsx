export type OptionType = {
    id?: string;
    name: string;
    value: string;
}


export const locationOptions: OptionType[] = [
    {
        name: "Banco",
        value: "bank"
    },
    {
        name: "Emprestado",
        value: "lent"
    },
    {
        name: "Dinheiro",
        value: "cash"
    },
]

export const transactionTypes: OptionType[] = [
    {
        name: "Receita",
        value: "income"
    }, 
    {
        name: "Despesa",
        value: "expense"
    }
]