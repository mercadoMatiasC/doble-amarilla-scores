export function DropdownSelect({ options, name, defaultValue }) {
  return (
    <select name={name} defaultValue={defaultValue} className="w-full bg-white/10 rounded border border-white/20 h-8">
      <option value="" className="bg-black/90">Todos</option>

      {options.map(option => (
        <option key={option.id} value={option.id} className="bg-black/90">
          {option.name}
        </option>
      ))}
    </select>
  );
}