interface IBalanceProps {
    balance: number
}

export default function Balance({ balance }: IBalanceProps) {
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

    function setCurrency (value:number) {
        return value.toLocaleString("pt-br", {style: "currency", currency: "BRL"})
    }

    return (
        <div className="flex flex-col gap-4">
            <span className="font-bold text-6xl text-green-500">{setCurrency(balance)}</span>
            <div className="flex justify-between">
                {locations.map((location) => (
                    <button key={location.id} className={`btn text-white ${location.class}`}>{location.name}</button>
                ))}
            </div>
        </div>
    )
}