import { forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({ label, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label>{label}</label>
            <input 
                className="input w-full focus:outline-0" 
                ref={ref}
                {...props}
            />
        </div>
    );
});

Input.displayName = "Input";
export default Input;