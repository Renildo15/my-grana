import Input from "../Input";
import Modal from "../Modal";
import SelectForm from "../SelectForm";
import { locationOptions, transactionTypes } from "../../data";
import { useRef, useState } from "react";
import ModalAddCategory from "../ModalAddcategory";
import * as yup from 'yup';
import { createTransaction, useTransactions } from "@/hooks/transactions";
import { useAuth } from "@/context/AuthContext";
import { Category, CreateTransaction } from "@/types";

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categories: Category[];
}

export default function ModalAddTransaction(props: IModalAddTransactionProps) {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const { token } = useAuth();
    const { mutate: transactionsMutate} = useTransactions(token);

    const nameRef = useRef<HTMLInputElement>(null)
    const valueRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const categoryRef = useRef<HTMLSelectElement>(null)
    const locationRef = useRef<HTMLSelectElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)

    const schema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        value: yup
        .number()
        .required("Valor é obrigatório")
        .positive("Deve ser positivo")
        .typeError("Insirira um valor vállido")
        .moreThan(0, 'O valor deve ser maior que zero')
        .max(1000000, 'O valor não pode exceder 1.000.000')
        .test(
            'is-decimal',
            'O valor deve ter no máximo 2 casas decimais',
        (value) => value === undefined || value === null || /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
       date: yup
        .string()
        .required("Data é obrigatória")
        .test(
            "is-valid-date",
            "Digite uma data válida",
                (value) => {
                if (!value) return false; // Já cobre o required
                // Verifica se é uma data válida (formato ISO ou similar)
                return !isNaN(Date.parse(value));
            }
        )
        .transform((value) => (value === "" ? undefined : value)),
        // category: yup.string().required("Categoria é obrigatória"),
    })
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
    
        const formData:CreateTransaction  = {
            name : nameRef.current?.value ?? '',
            value : valueRef.current?.value ?? '',
            date : dateRef.current?.value ?? '',
            category_id : categoryRef.current?.value ?? '',
            location : (locationRef.current?.value as "cash" | "bank" | "lent") ?? '',
            transaction_type : (typeRef.current?.value as "expense" | "income" ?? ''),
        }

        console.log(formData)
        try {
            await schema.validate(formData, { abortEarly: false });
            await createTransaction(token, formData)

            alert("Transação criada com sucesso!");

            props.setIsModalOpen(false);

            if (nameRef.current) nameRef.current.value = '';
            if (valueRef.current) valueRef.current.value = '';
            if (dateRef.current) dateRef.current.value = '';
            if (categoryRef.current) categoryRef.current.value = '';
            if (locationRef.current) locationRef.current.value = '';
            if (typeRef.current) typeRef.current.value = '';

            transactionsMutate();

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                err.inner.forEach(error => {
                    alert(error.message);
                });
            }
        }
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
                        type="number"
                        placeholder="Valor"
                        ref={valueRef}
                    />
                    <SelectForm options={props.categories} label={"Categoria"} optionDefault={"Selecione uma categoria"} ref={categoryRef}/>
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