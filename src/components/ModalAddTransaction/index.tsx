import { categories } from "@/mocks/mocks";
import Input from "../Input";
import Modal from "../Modal";
import SelectForm from "../SelectForm";
import { locationOptions, transactionTypes } from "../../data";
import { useState } from "react";
import ModalAddCategory from "../ModalAddcategory";

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function ModalAddTransaction(props: IModalAddTransactionProps) {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    return (
        <Modal setIsModalOpen={props.setIsModalOpen}>
            <div className="flex flex-col gap-4 w-full justify-start">
                <h2 className="text-2xl font-semibold">Nova Transação</h2>
                <form className="flex flex-col gap-2 w-full">
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Nome da transação"
                    />

                    <Input
                        label="Valor"
                        type="text"
                        placeholder="Valor"
                    />
                    <SelectForm options={categories} label={"Categoria"} optionDefault={"Selecione uma categoria"}/>
                    <SelectForm options={locationOptions} label={"Onde está o dinheiro?"} optionDefault={"Selecione local"}/>
                    <SelectForm options={transactionTypes} label={"Tipo de transação"} optionDefault={"Selecione tipo"}/>
                    
                    <Input
                        label="Data"
                        type="date"
                    />
                    <div className="flex justify-between w-full">
                        <button className="btn btn-success w-full text-white">Salvar</button>
                    </div>
                </form>
                <button onClick={() => setShowAddCategoryModal(true)} className="btn btn-info  w-full text-white">Nova categoria</button>
            </div>

            { showAddCategoryModal && (
                <ModalAddCategory setIsModalOpen={setShowAddCategoryModal}/>
            )}
        </Modal>
    )
}