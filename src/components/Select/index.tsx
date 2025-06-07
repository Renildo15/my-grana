import { OptionType } from "@/data";
import { Category } from "@/types";

interface ISelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Category[] | OptionType []
    widthFull?: boolean;
    label: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

export default function Select({ options, widthFull=false, label, setState, state, isLoading, error }: ISelectProps) {
    return (
        <>
            { isLoading  ? (
                 <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-10 p-4 mb-3 w-full"></div>
                </div>
            ) : error ? (
                <div className="text-red-500">Erro ao carregar categorias. {error.message}</div>
            ) : (
                <select className={`select ${widthFull ? 'w-full' : ''}`} value={state} onChange={(e) => setState(e.target.value)}>
                    <option value={""}>{label}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                </select>
            )}
        </>
       
    )
}
