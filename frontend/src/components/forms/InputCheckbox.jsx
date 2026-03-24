export function InputCheckbox({ name, checked, onChange }) {
    return(
        <div className="flex w-full justify-end">
            <input type="checkbox" name={name} checked={!!checked} className="w-5 h-5 accent-amber-600 cursor-pointer" onChange={onChange} />
        </div>
    );
}