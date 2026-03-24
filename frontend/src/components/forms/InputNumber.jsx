export function InputNumber({ name, value, onChange, placeholder, min, max }) {
    const base_class = "w-full bg-white/10 rounded border border-white/20 p-2";

    return(
        <input type="number" name={name} min={min} max={max} value={value} placeholder={placeholder} onChange={onChange} className={base_class} />
    );
}