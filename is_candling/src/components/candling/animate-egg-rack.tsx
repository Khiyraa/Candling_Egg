import { ArrowLeft } from 'lucide-react';

export default function animateEggRack() {
  return (
    <div className="box-border flex flex-col gap-4">
      <div className="box-border w-full overflow-hidden rounded-md border bg-neutral-100 p-2">
        <div className="box-border flex h-50 w-full items-center justify-between gap-4 rounded-md bg-neutral-300 p-0 pl-1">
          <div className="animate-racks box-border grid w-full grid-cols-4 gap-4 rounded-md bg-neutral-100 p-5 lg:w-80">
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
            <div className="animate-egg-shine mx-auto h-10 w-8 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border border-gray-200 bg-orange-200 shadow-lg"></div>
          </div>
          <div className="flex flex-col gap-2">
            <ArrowLeft className="mr-5 h-20 w-20 text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
