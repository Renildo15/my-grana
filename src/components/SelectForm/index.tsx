import { Category } from "@/types";
import { OptionType } from "../../data";
import { forwardRef } from "react";

interface ISelectFormProps {
    label: string;
    options: Category[] | OptionType []
    optionDefault: string;
}

const SelectForm = forwardRef<HTMLSelectElement, ISelectFormProps>(({label, options, optionDefault, ...props}, ref) => {
    const getOptionValue = (option:Category | OptionType) => {
        if ('value' in option) {
            return option.value
        }

        return option.id
    }
    return (
        <div className="flex flex-col gap-2 w-full">
             <label>{label}</label>
             <select 
                className="select w-full focus:outline-0" 
                ref={ref}
                {...props}
            >
                <option value="">{optionDefault}</option>
                {options.map((option) => (
                    <option key={getOptionValue(option)} value={getOptionValue(option)}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
})

SelectForm.displayName = "SelectForm"

export default SelectForm;