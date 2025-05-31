import { Category } from "@/types";
import Select from "../Select";
import { OptionType } from "../../data";

interface ISelectFormProps {
    label: string;
    options: Category[] | OptionType []
    optionDefault: string;
}

export default function SelectForm({ options, label, optionDefault }: ISelectFormProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{label}</label>
            <Select options={options} widthFull={true} label={optionDefault}/>
        </div>
    )
}