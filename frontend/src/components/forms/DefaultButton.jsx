export function DefaultButton({ type, name, value, disabled, onClick, active }) {
  const BASE_CLASS ='w-full p-2 bg-white/10 rounded-lg hover:cursor-pointer hover:bg-white/4 transition-all transition-duration-3s';
  const conditional_class = active ? "text-white" : "text-white/50";

  return (
    <button disabled={disabled} onClick={onClick} type={type} name={name} className={`${BASE_CLASS} ${conditional_class}`}>
      {value}
    </button>
  );
}