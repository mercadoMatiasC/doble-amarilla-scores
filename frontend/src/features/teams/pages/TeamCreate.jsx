import { PageAnimWrapper } from "../../../components/PageAnimWrapper";
import { TeamForm } from "../components/TeamForm";

export function TeamCreate() {

  return (
    <PageAnimWrapper>
      <div className='w-[90%] rounded flex flex-col text-white bg-black/50 p-5 space-y-3 sm:w-[80%] md:w-[60%] lg:w-[50%] 2xl:p-8 2xl:justify-between 2xl:flex-row 2xl:space-y-0 2xl:min-h-170'>
        <div className='w-full flex flex-col gap-3 items-baseline 2xl:flex-col'>
          <TeamForm />
        </div>
      </div>
    </PageAnimWrapper>
  );
}