import { SunIcon } from '@heroicons/react/solid';

const SharedLoading = () => (
   <div className="bg-gradient-to-br from-[#1f1f1f] to-[#0000] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-bounce text-white-500"
        color="yellow"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse text-white">
        Loading City Weather Information
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse text-white">
        Hold on, we are crunching the numbers!
      </h2>
    </div>
)

export default SharedLoading;
