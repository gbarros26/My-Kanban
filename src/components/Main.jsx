import { MoreHorizontal, UserPlus } from 'react-feather';

export default function Main() {
  return (
    <>
      <div className="flex flex-col bg-slate-900 w-full">
        <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
          <h2 className="text-lg">My Board</h2>
          <div className="flex items-center justify-center">
            <button className="bg-gray-200 text-gray-500 px-2 py-1 mr-2 rounded flex justify-center hover:bg-[#1d2125]">
              Share
            </button>
            <button>
              <MoreHorizontal size={16}></MoreHorizontal> {/* ...*/}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
