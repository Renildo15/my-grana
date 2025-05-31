import { FinancialSummary } from "@/types"
import { useEffect, useState } from "react"

interface IBalanceProps {
    summary:FinancialSummary | undefined
}

export default function Balance({ summary }: IBalanceProps) {
    const locations = [
        {
            "id": 1,
            "name": "Em dinheiro",
            "value": "cash",
            "class": "btn-info"
        },
        {
            "id": 2,
            "name": "Emprestado",
            "value": "lent",
            "class": "btn-warning"
        },
        {
            "id": 3,
            "name": "Banco",
            "value": "bank",
            "class": "btn-success"
        },
    ]

    const [currentValue, setCurrentValue] = useState<number>(0)
    const [active, setActive] = useState<string>('')

    useEffect(() => {
        if (summary?.balance) {
            setCurrentValue(summary.balance)
        }
    }, [summary])

    function setCurrency (value:number) {
        return value.toLocaleString("pt-br", {style: "currency", currency: "BRL"})
    }

    function handleBalance () {
        setCurrentValue(summary?.balance || 0)
        setActive("")
    }

    function handleCurrentValue (name:string)  {
        setActive(name);
        switch (name) {
            case 'bank':
                setCurrentValue(summary?.location.bank || 0)
                break;
            case 'cash':
                setCurrentValue(summary?.location.cash || 0)
                break;
            case 'lent':
                setCurrentValue(summary?.location.lent || 0)
                break;
            default:
                setCurrentValue(summary?.balance || 0)
                break;
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <span className="w-auto font-bold text-6xl text-green-500">{setCurrency(currentValue || 0)}</span>
            <div className="flex justify-between w-[35%]">
                {locations.map((location) => (
                   <button 
                        onClick={() => handleCurrentValue(location.value)} 
                        key={location.id} 
                        className={`btn text-white ${location.class} ${active === location.value ? "btn-active" : ""}`}
                    >
                        {location.name}
                    </button>
                ))}
                 {active !== "" && (
                    <button 
                        onClick={handleBalance} 
                        className={`btn text-green-800`}
                        key={11111111111111}
                    >
                        Balanço
                    </button>
                )}
            </div>
        </div>
    )
}