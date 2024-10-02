"use client";

import Line from "@/components/ui/Line";
import ActionButtons from "./ActionButtons";
import SmartLists from "./SmartLists";
import UserLists from "./UserLists";

export default function ListsPanel() {
  return (
    <div className="flex flex-col b-ie-1 b-base6 pie-7.5 py-6 pis-3  gap-3 overflow-y-auto ">
      <SmartLists />
      <Line />
      <UserLists />
      <div className="mt-auto">
        <ActionButtons />
      </div>
      {/* <div className="flex gap-3 justify-between items-center">
        <span className="c-base11">My Folders</span>
        <AddFolderButton />
      </div>
      <Folders />
      <Line /> */}
    </div>
  );
}


