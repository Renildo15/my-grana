import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function Input({ ...props }: IInputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{props.label}</label>
            <input className="input w-full focus:outline-0" {...props}/>
        </div>
    )
}