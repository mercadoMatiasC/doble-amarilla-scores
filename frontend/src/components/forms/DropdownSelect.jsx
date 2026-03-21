export function DropdownSelect({ options, name, value, onChange, required = true }) {
  return (
    <select name={name} value={value} onChange={onChange} className="w-full bg-white/10 rounded border border-white/20 h-8">
      {!required && (
        <option value="" className="bg-black/90">Seleccionar...</option>
      )}

      {options?.map(option => (
        <option key={option.id} value={option.id} className="bg-black/90 p-2">
          {option.name}
        </option>
      ))}
    </select>
  );
}