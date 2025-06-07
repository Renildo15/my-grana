'use client'

import { useAuth } from "@/context/AuthContext";
import { RiAddBoxLine } from "react-icons/ri";
import SearchInput from "@/components/SearchInput";
import Balance from "@/components/Balance";
import Transactions from "@/components/Transactions";
import ModalAddTransaction from "@/components/ModalAddTransaction";
import Select from "@/components/Select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IParams, useTransactions, useTransactionsBalance } from "@/hooks/transactions";
import { useCategories } from "@/hooks/categories";


export default function Dashboard() {
    const { user, isAuthenticated, token } = useAuth();

    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [typeTransaction, setTypeTransaction] = useState<"income" | "expense" | "">('');
    const [location, setLocation] = useState<"cash" | "bank" | "lent" | "">("");
    const [category, setCategory] = useState<string>('');


    const params: IParams ={
        search:searchTerm, 
        transaction_type:typeTransaction,
        location,
        category
    }

    const { data: transactions, isLoading: transationsIsLoading, error: transactionsError} = useTransactions(token, params);
    const { data:financialSummary } = useTransactionsBalance(token);
    const { data: categories, isLoading: categoriesisLoading, error: categoriesError} = useCategories(token);

    const router = useRouter()
    useEffect(() => {
    if (!isAuthenticated) {
        router.push("/login")
    }
    }, [isAuthenticated, router]);

    if (!user) return <p>Carregando dados...</p>

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-[60%] flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl text-gray-800">Bem-vindo, <strong>{user.username}</strong></h1>
                <Balance summary={financialSummary}/>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl text-gray-800 text-left">Transações</h2>
                        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <button className="btn" onClick={() => setShowAddModal(true)}>
                            <RiAddBoxLine color="black" size={30}/>
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <form className="filter">
                            <input className="btn btn-square" type="reset" value="×" onClick={() => setTypeTransaction('')} />
                            <input className="btn bg-red-400 border-none" type="radio" name="transaction"  aria-label="Despesa" value="expense" onChange={() => setTypeTransaction('expense')} checked={typeTransaction === 'expense'}/>
                            <input className="btn bg-green-400 border-none" type="radio" name="transaction"  aria-label="Receita" value="income" onChange={() => setTypeTransaction('income')} checked={typeTransaction === 'income'}/>
                        </form>

                        <form className="filter">
                            <input className="btn btn-square" type="reset" value="×" onClick={() => setLocation('')}/>
                            <input className="btn bg-amber-400" type="radio" name="transaction" aria-label="Em dinheiro" onChange={() => setLocation('cash')} checked={location==='cash'}/>
                            <input className="btn" type="radio" name="transaction" aria-label="Emprestado" onChange={() => setLocation('lent')} checked={location==='lent'}/>
                            <input className="btn" type="radio" name="transaction" aria-label="Banco" onChange={() => setLocation('bank')} checked={location==='bank'}/>
                        </form>

                        
                        { categories && categories?.length !== 0 ? (
                            <Select 
                                options={categories} 
                                label={"Selecione uma categoria"} 
                                state={category} 
                                setState={setCategory}
                                isLoading={categoriesisLoading}
                                error={categoriesError}
                            />
                        ) : (
                            <div className="p-2">
                                <span className="text-xl">Nenhuma categoria encontrada</span>
                            </div>
                        )}
                    </div>

                    { showAddModal && (

                        <ModalAddTransaction setIsModalOpen={setShowAddModal}/>
                    )}

                    {transactions?.results.length !== 0 ? (
                        <Transactions
                            transactions={transactions}
                            transactionsError={transactionsError}
                            transationsIsLoading={transationsIsLoading}
                        />
                    ):(
                        <div className="p-2">
                            <span className="text-xl">Nenhuma transação encontrada</span>
                        </div>
                    )}
                   
                </div>
            </div>
            
        </div>
    )
}