import { Category, FinancialSummary, Transaction } from "@/types";

export const categories: Category[] = [
    {
        id: "1",
        name: "Trabalho",
        color: "#FF5733"
    },
    {
        id: "2",
        name: "Pessoal",
        color: "#33FF57"
    },
    {
        id: "3",
        name: "Estudos",
        color: "#3357FF"
    },
    {
        id: "4",
        name: "Lazer",
        color: "#F033FF"
    },
    {
        id: "5",
        name: "Saúde",
        color: "#FF33F0"
    },
    {
        id: "6",
        name: "Finanças",
        color: "#33FFF0"
    },
    {
        id: "7",
        name: "Viagens",
        color: "#FFC733"
    },
    {
        id: "8",
        name: "Compras",
        color: "#33FFBD"
    },
    {
        id: "9",
        name: "Família",
        color: "#8C33FF"
    },
    {
        id: "10",
        name: "Outros",
        color: "#CCCCCC"
    }
];

export const transactions: Transaction[] = [
    {
        id: "1",
        name: "Salário",
        value: "5000.00",
        transaction_type: "income",
        location: "bank",
        date: "2024-01-05",
        category: {
            id: "1",
            name: "Trabalho",
            color: "#FF5733"
        }
    },
    {
        id: "2",
        name: "Mercado",
        value: "350.50",
        transaction_type: "expense",
        location: "cash",
        date: "2024-01-10",
        category: {
            id: "4",
            name: "Compras",
            color: "#33FFBD"
        }
    },
    {
        id: "3",
        name: "Academia",
        value: "120.00",
        transaction_type: "expense",
        location: "bank",
        date: "2024-01-12",
        category: {
            id: "5",
            name: "Saúde",
            color: "#FF33F0"
        }
    },
    {
        id: "4",
        name: "Freelance",
        value: "800.00",
        transaction_type: "income",
        location: "lent",
        date: "2024-01-15",
        category: {
            id: "1",
            name: "Trabalho",
            color: "#FF5733"
        }
    },
    {
        id: "5",
        name: "Cinema",
        value: "45.00",
        transaction_type: "expense",
        location: "cash",
        date: "2024-01-18",
        category: {
            id: "4",
            name: "Lazer",
            color: "#F033FF"
        }
    },
    {
        id: "6",
        name: "Transferência",
        value: "200.00",
        transaction_type: "income",
        location: "bank",
        date: "2024-01-20",
        category: {
            id: "10",
            name: "Outros",
            color: "#CCCCCC"
        }
    },
    {
        id: "7",
        name: "Restaurante",
        value: "85.75",
        transaction_type: "expense",
        location: "lent",
        date: "2024-01-22",
        category: {
            id: "7",
            name: "Lazer",
            color: "#F033FF"
        }
    },
    {
        id: "8",
        name: "Combustível",
        value: "150.00",
        transaction_type: "expense",
        location: "cash",
        date: "2024-01-25",
        category: {
            id: "9",
            name: "Viagens",
            color: "#FFC733"
        }
    },
    {
        id: "9",
        name: "Presente",
        value: "100.00",
        transaction_type: "expense",
        location: "bank",
        date: "2024-01-28",
        category: {
            id: "9",
            name: "Família",
            color: "#8C33FF"
        }
    },
    {
        id: "10",
        name: "Dividendos",
        value: "300.00",
        transaction_type: "income",
        location: "bank",
        date: "2024-01-30",
        category: {
            id: "6",
            name: "Finanças",
            color: "#33FFF0"
        }
    }
];


export const financialSummary: FinancialSummary = {
    incomes: 4500,
    expenses: 2261.15,
    balance: 2238.85,
    location: {
      bank: 3300,    // 4500 (salário) - 1200 (aluguel)
      cash: 1031.5,  // 680.50 (mercado) + 48 (cinema) - considerando que começou com 1800
      lent: 331.65,   // 32.75 (uber) + 299.90 (curso) - considerando que começou com 700
    },
  };
  