export function InputText({ name, value, onChange }) {
    const base_class = "w-full bg-white/10 rounded border border-white/20 p-2";

    return(
        <input type="text" name={name} value={value} onChange={onChange} className={base_class} />
    );
}