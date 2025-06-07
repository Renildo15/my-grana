import { Transaction } from "@/types";


interface ITransactionProps {
    transaction: Transaction;
}

export default function TransactionCard ({ transaction }: ITransactionProps) {
    const isExpense = transaction.transaction_type === "expense";
    const valueColor = isExpense ? "text-red-500" : "text-green-500";
    const valueSymbol = isExpense ? "-" : "+";

    console.log(transaction)

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 relative group"
             style={{ borderLeftColor: transaction.category?.color ?? "#000000" }}>
          
          {/* Botões de Ação (aparecem no hover) */}
          <div className="absolute top-0 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => {}}
              className="btn btn-ghost btn-xs text-gray-500 hover:text-primary hover:bg-base-200"
              aria-label="Editar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button 
              onClick={() => {}}
              className="btn btn-ghost btn-xs text-gray-500 hover:text-error hover:bg-base-200"
              aria-label="Deletar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
    
          {/* Conteúdo Principal */}
          <div className="flex justify-between items-start pr-6">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{transaction.name}</h3>
              <div className="flex items-center mt-1">
                <span 
                  className="inline-block w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: transaction.category?.color ?? "#000000" }}
                ></span>
                <span className="text-sm text-gray-600">{transaction.category?.name}</span>
              </div>
            </div>
    
            <div className={`text-right ${valueColor}`}>
              <span className="font-bold text-lg">
                {valueSymbol} R$ {transaction.value}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(transaction.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
    
          {transaction.location && (
            <div className="mt-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-gray-500 capitalize">{transaction.location}</span>
            </div>
          )}
        </div>
      )
}