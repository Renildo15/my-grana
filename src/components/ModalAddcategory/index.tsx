import { useRef, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import * as yup from 'yup';
import { createCategory, useCategories } from "@/hooks/categories";
import { useAuth } from "@/context/AuthContext";
import { CreateCategory } from "@/types";
import axios from "axios";

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function ModalAddCategory(props: IModalAddTransactionProps) {
    const {token} = useAuth();
    const nameRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)

    const { mutate: categoriesMutate} = useCategories(token);

    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("Nome é obirgátorio."),
        color: yup.string().required("A cor é obrigártoria.")
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const formData:CreateCategory = {
            name: nameRef.current?.value ?? '',
            color: colorRef.current?.value ?? ''
        }

        try {
            await schema.validate(formData, { abortEarly: false})
            await createCategory(token, formData)

            alert(`Categoria criada com sucesso!`);

            props.setIsModalOpen(false)

            if (nameRef.current) nameRef.current.value = '';
            if (colorRef.current) colorRef.current.value = '#000000';
            categoriesMutate();

        } catch (error) {
             if (error instanceof yup.ValidationError) {
            // Tratamento de erros de validação
            const errorMessages = error.inner.map(err => err.message).join('\n');
            alert(`Por favor, corrija os seguintes erros:\n${errorMessages}`);
        } else if (axios.isAxiosError(error)) {
            // Tratamento de erros da API
            if (error.response) {
                const apiError = error.response.data;
                alert(apiError.message || 'Erro ao criar categoria');
            } else {
                alert('Não foi possível conectar ao servidor');
            }
        } else {
            // Erros inesperados
            console.error('Erro inesperado:', error);
            alert('Ocorreu um erro inesperado ao criar a categoria');
        }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal setIsModalOpen={props.setIsModalOpen}>
            <div className="flex flex-col gap-4 w-full justify-start">
                <h2 className="text-2xl font-semibold">Nova categoria</h2>
                <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Nome da categoria"
                        ref={nameRef}
                    />
                    <Input
                        label="Cor"
                        type="color"
                        className="cursor-pointer w-full"
                        ref={colorRef}
                    />
                    <div className="flex justify-between w-full">
                        <button className="btn btn-success  w-full text-white"> {isLoading ? 'Salvando...' : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}