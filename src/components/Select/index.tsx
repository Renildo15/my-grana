import { OptionType } from "@/data";
import { Category } from "@/types";

interface ISelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Category[] | OptionType []
    widthFull?: boolean;
    label: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>
}

export default function Select({ options, widthFull=false, label, setState, state }: ISelectProps) {
    return (
        <select className={`select ${widthFull ? 'w-full' : ''}`} value={state} onChange={(e) => setState(e.target.value)}>
            <option value={""}>{label}</option>
            {options.map((option) => (
                <option key={option.name} value={option.name}>{option.name}</option>
            ))}
        </select>
    )
}