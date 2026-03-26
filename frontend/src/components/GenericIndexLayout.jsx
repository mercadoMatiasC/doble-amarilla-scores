import { DefaultButton } from "./forms/DefaultButton";
import { PageAnimWrapper } from "./PageAnimWrapper";
import { MagnifyingGlass } from "./svgs/MagnifyingGlass";

export function GenericIndexLayout({ title, children, meta, changePage, handleSearch, searchParams }) {
  return (
    <div className='rounded flex flex-col text-white bg-black/50 p-8 lg:justify-between w-[80%] space-y-3 lg:flex-row lg:w-1/2 lg:space-y-0 2xl:min-h-170'>
      {/* -- LEFT PANEL -- */}
      <PageAnimWrapper key={searchParams.toString()} centered={false}>
        <div className='flex flex-col space-y-4 w-full min-h-120 2xl:min-h-0'>
          {children}
        </div>
      </PageAnimWrapper>

      <hr className='my-4 border-white/25 lg:hidden' />
      <div className="hidden w-px mx-5 bg-white/25 h-25 self-stretch lg:block"></div>

      {/* -- RIGHT PANEL -- */}
      <div className='flex flex-col gap-3 items-center justify-between lg:items-baseline lg:w-1/2 lg:flex-col'>
        <form onSubmit={handleSearch} className='flex flex-col w-full gap-3'>
          <h2>Buscar {title}</h2>
          <div className='flex flex-row'>
            <input className="w-full bg-white/10 rounded rounded-r-none border border-white/20 p-2" defaultValue={searchParams.get("search") || ""} placeholder="Buscar..." type="search" name="search" />
            <button className="bg-white/10 rounded rounded-l-none p-1 hover:cursor-pointer" type="submit">
              <MagnifyingGlass />
            </button>
          </div>
        </form>

        {/* -- PAGINATION -- */}
        <div className='flex flex-row w-full justify-between mt-5 gap-10'>
          <DefaultButton disabled={meta?.current_page === 1} onClick={() => changePage(meta.current_page - 1)} type="button" value="Anterior" />
          <DefaultButton disabled={meta?.current_page === meta?.last_page} onClick={() => changePage(meta.current_page + 1)} type="button" value="Siguiente" />
        </div>
      </div>
    </div>
  );
}