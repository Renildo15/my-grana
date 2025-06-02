import { categories } from "@/mocks/mocks";
import Input from "../Input";
import Modal from "../Modal";
import SelectForm from "../SelectForm";
import { locationOptions, transactionTypes } from "../../data";
import { useRef, useState } from "react";
import ModalAddCategory from "../ModalAddcategory";

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function ModalAddTransaction(props: IModalAddTransactionProps) {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null)
    const valueRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const categoryRef = useRef<HTMLSelectElement>(null)
    const locationRef = useRef<HTMLSelectElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value
        const value = valueRef.current?.value
        const date = dateRef.current?.value
        const category = categoryRef.current?.value
        const location = locationRef.current?.value
        const type = typeRef.current?.value

        console.log(
            {
                name,
                value,
                date,
                category,
                location,
                type
            }
        )
    }

    return (
        <Modal setIsModalOpen={props.setIsModalOpen}>
            <div className="flex flex-col gap-4 w-full justify-start">
                <h2 className="text-2xl font-semibold">Nova Transação</h2>
                <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Nome da transação"
                        ref={nameRef}
                    />

                    <Input
                        label="Valor"
                        type="text"
                        placeholder="Valor"
                        ref={valueRef}
                    />
                    <SelectForm options={categories} label={"Categoria"} optionDefault={"Selecione uma categoria"} ref={categoryRef}/>
                    <SelectForm options={locationOptions} label={"Onde está o dinheiro?"} optionDefault={"Selecione local"} ref={locationRef}/>
                    <SelectForm options={transactionTypes} label={"Tipo de transação"} optionDefault={"Selecione tipo"} ref={typeRef}/>
                    
                    <Input
                        label="Data"
                        type="date"
                        ref={dateRef}
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