export function NumberCounter({ name, value, onChange }) {
    const base_class = "py-1 px-3 text-xl rounded bg-white/20 hover:cursor-pointer"

    function decrement() {
        if (value > 0)
            onChange({target: {name,value: value - 1}});
    }

    function increment() {
        onChange({target: {name, value: value + 1}});
    }      

    return (
        <div className="flex flex-row items-center w-full">
            <button className={base_class} onClick={decrement} type="button">-</button>
            <p className="flex px-5 text-xl w-17.5 justify-center items-center bg-black/70">{value}</p>
            <button className={base_class} onClick={increment} type="button">+</button>
        </div>
    );
}