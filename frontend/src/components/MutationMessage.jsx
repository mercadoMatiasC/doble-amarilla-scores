export function MutationMessage({ mutation }) {
  if (!mutation.isError && !mutation.isSuccess) 
    return null;
  const validationErrors = mutation.error?.errors;

  return (
    <div id="stats_panel" className="flex rounded p-3 w-full">
      <div className={`flex flex-col w-full space-y-1 ${mutation.isError ? 'text-red-400' : 'text-green-500'}`}>
        {mutation.isSuccess && <span>¡Guardado correctamente!</span>}
        {mutation.isError && (
          <>
            {validationErrors ? (
              Object.keys(validationErrors).map((field) => (
                validationErrors[field].map((message, i) => (
                  <p key={`${field}-${i}`} className="text-sm">
                    {message}
                  </p>
                ))
              ))
            ) : (
              <p>{mutation.error?.message || "Error al actualizar el recurso"}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}