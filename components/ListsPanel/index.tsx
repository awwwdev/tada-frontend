"use client";

import Line from "@/components/ui/Line";
import { useGlobalContext } from "../Provider";
import DesktopOnly from "../ui/DesktopOnly";
import Drawer from "../ui/Drawer";
import MobileOnly from "../ui/MobileOnly";
import ActionButtons from "./ActionButtons";
import SmartLists from "./SmartLists";
import UserLists from "./UserLists";

export default function ListPanel() {
  const { listsPanelOpen, setListsPanelOpen } = useGlobalContext();
  return (
    <>
      <MobileOnly>
        <Drawer open={listsPanelOpen} setOpen={setListsPanelOpen} disabled={false} side="left">
          <ListsPanelContent />
        </Drawer>
      </MobileOnly>
      <DesktopOnly>
        <ListsPanelContent />
      </DesktopOnly>
    </>
  );
}

function ListsPanelContent() {
  return (
    <div
      className={`
      flex flex-col b-ie-1 b-base6 pie-3 py-6 pis-3  gap-3 overflow-y-auto bg-base4
      
      `}
    >
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
