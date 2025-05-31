// import { transactions } from "@/mocks/mocks";
import TransactionCard from "../TransactionCard";
import Pagination from "../Pagination";
import { ITransactionsResponse } from "@/hooks/transactions";

interface ITransactionsProps {
    transationsIsLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transactionsError: any;
    transactions: ITransactionsResponse | undefined
}

export default function Transactions ({ transactions, transactionsError, transationsIsLoading}: ITransactionsProps) {

    return (
        <div className="flex flex-col gap-2 h-80 overflow-y-auto">
            { transationsIsLoading ? (
                <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-36 p-4 mb-3 w-full"></div>
                    <div className="skeleton h-36 p-4 mb-3 w-full"></div>
                    <div className="skeleton h-36 p-4 mb-3 w-full"></div>
                </div>
            ) : transactionsError ? (
                <div className="text-red-500">Erro ao carregar transações. {transactionsError.message}</div>
            )  : (
                transactions?.results.map((t) => (
                    <TransactionCard key={t.id} transaction={t}/>
                ))
            )}
            
            {!transactionsError && 
                <Pagination/>
            }
 
        </div>
    )
}