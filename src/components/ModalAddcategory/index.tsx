import Input from "../Input";
import Modal from "../Modal";

interface IModalAddTransactionProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function ModalAddCategory(props: IModalAddTransactionProps) {
    return (
        <Modal setIsModalOpen={props.setIsModalOpen}>
            <div className="flex flex-col gap-4 w-full justify-start">
                <h2 className="text-2xl font-semibold">Nova categoria</h2>
                <form className="flex flex-col gap-2 w-full">
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Nome da categoria"
                    />
                    <Input
                        label="Cor"
                        type="color"
                        className="cursor-pointer w-full"
                    />
                    <div className="flex justify-between w-full">
                        <button className="btn btn-success  w-full text-white">Salvar</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}