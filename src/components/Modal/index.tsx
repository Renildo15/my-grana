interface IModalProps {
    children: React.ReactNode;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}

export default function Modal(props: IModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex flex-col justify-center items-center gap-4">
                    {props.children}
                </div>
                <button 
                    onClick={() => props.setIsModalOpen(false)}
                    className="mt-4 btn"
                >
                    Fechar
                </button>
            </div>
        </div>
    )
} 