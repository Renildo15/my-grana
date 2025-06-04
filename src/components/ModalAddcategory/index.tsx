import { useRef } from "react";
import Input from "../Input";
import Modal from "../Modal";
import * as yup from 'yup';

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function ModalAddCategory(props: IModalAddTransactionProps) {

    const nameRef = useRef<HTMLInputElement>(null)
    const colorRef = useRef<HTMLInputElement>(null)

    const schema = yup.object().shape({
        name: yup.string().required("Nome é obirgátorio."),
        color: yup.string().required("A cor é obrigártoria.")
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            name: nameRef.current?.value,
            color: colorRef.current?.value
        }

        try {
            await schema.validate(formData, { abortEarly: false})
            console.log(formData);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.inner.forEach(error => {
                    alert(error.message);
                });
            }
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
                        <button className="btn btn-success  w-full text-white">Salvar</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}