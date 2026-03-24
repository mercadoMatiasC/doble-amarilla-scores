export function MutationMessage({ mutation }) {
    return (
        (mutation.isError || mutation.isSuccess) && (
            <div id="stats_panel" className="flex rounded p-3">
                <p className={`flex ${mutation.isError  ? 'text-red-400' : 'text-green-500'}  w-full justify-center items-center`}>
                    {mutation.isSuccess && ('Actualizado correctamente!')}
                    {mutation.isError && (mutation.error.message || mutation.errors[0] || "Error al actualizar el recurso")}
                </p>
            </div>
        )
    );
}
