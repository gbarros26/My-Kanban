import { ChevronRight, ChevronLeft, Plus } from 'react-feather';
import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div
        className={`bg-[#1d2125] h-[calc(100vh-3rem)] border-r border-r[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
          collapsed ? 'w-[40px]' : 'w-[280px]'
        }`}
      >
        {collapsed && (
          <div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm"
            >
              {' '}
              {/* seta */}
              <ChevronRight size={18}></ChevronRight>
            </button>
          </div>
        )}
        {!collapsed && (
          <div>
            <div className="workspac p-3 flex justify-between border-b border-b-[#9fadbc29]">
              <h4>Remote Dev 's workspace</h4>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-slate-600 rounded-sm p-1"
              >
                {' '}
                {/* seta */}
                <ChevronLeft size={18}></ChevronLeft>
              </button>
            </div>
            <div className="boarlist">
              <div className="flex justify-between px-3 py-2">
                <h6>Your Boards</h6>
                <button className="hover:bg-slate-600 p-1 rounded-sm">
                  <Plus size={16}></Plus>
                </button>
              </div>
            </div>
            <ul>
              <li>
                <button className="px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500">
                  <span className="w-6 h-m rounded-sm mr-2 bg-red-600">
                    &nbsp;
                  </span>
                  <span>MyTrello Board</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
