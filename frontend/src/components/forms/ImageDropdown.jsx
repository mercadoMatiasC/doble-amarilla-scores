import { useState } from "react";
import { STORAGE_URL } from "../../constants/api";

export function ImageDropdown({ options, value, onChange, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.route === value);

  return (
    <div className="relative w-full">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full bg-white/10 rounded border border-white/20 p-2 cursor-pointer hover:bg-white/20 transition-all gap-3">
        {selectedOption && (
          <div className="flex items-center gap-3">
            <img src={STORAGE_URL+selectedOption.route} className="w-10 h-10 object-contain" alt="Current logo" />
            <p className="hidden sm:block">ID #{selectedOption.id}</p>
          </div>
        )}
        <span>---</span>
      </div>

      {isOpen && (
        <ul className="grid grid-cols-2 absolute z-50 w-full mt-2 bg-zinc-900 border border-white/30 rounded-lg shadow-2xl max-h-64 overflow-y-auto p-2 gap-2 lg:grid-cols-4">
          {options.map((option, index) => (
            <li key={index} onClick={() => { onChange({ target: { name, value: option.route } }); setIsOpen(false); }} 
              className={`flex flex-col p-2 rounded cursor-pointer transition-all items-center justify-center border-2 ${
                value === option.route ? 'border-yellow-600 bg-amber-500/10 animate-pulse' : 'border-transparent hover:bg-white/10'
              }`}>
              <img src={STORAGE_URL+option.route} className="w-10 h-10 object-contain mb-1" alt={option.name} />
              <span className="text-[9px] text-center leading-tight truncate w-full text-gray-300">
                {option.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}