"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import fetchAPI from "@/utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Header = () => {
  return (
    <header className={`flex gap-3 items-center b-b-1 b-base5 pb-1.5`}>
      <h1 className=" H3 ">TADA</h1>

      <div className="mis-auto flex items-center gap-3">
        {/* <AuthButtons /> */}
      </div>
    </header>
  );
};

export default Header;


function LogoutButton() {
  const queryClient = useQueryClient();
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        const data = await fetchAPI.POST(`/auth/logout`);
        // queryClient.invalidateQueries({ queryKey: ["userMe"] });
        queryClient.setQueryData(["userMe"], null);
        queryClient.removeQueries(); // removes cached data for all queries
        await queryClient.resetQueries(); // reset all queyries to their initial state
        toast.success(data.message);
      }}
    >
      <Icon name="bf-i-ph-sign-out" />
      Logout
    </Button>
  );
}
