"use client";


import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useLogOut from "@/hooks/useLogOut";
import useUserMe from "@/hooks/useUserMe";
import Avatar from '../ui/Avatar';

export default function AccountDropdown() {
  const userMeQ = useUserMe();

  const logoutMutation = useLogOut();

  return (
    <div>
      <DropdownMenu
        trigger={
          <Button variant="text" className="shrink-0 flex items-center gap-3 justify-start text-start"  >
            <Avatar src=''  size='1.2em' />
            <span className='c-base11'>{userMeQ.data?.email}</span>
          </Button>
        }
      >
        <DropdownMenuItem onSelect={() => logoutMutation.mutate()}>
          {logoutMutation.isPending ? <LoadingSpinner /> : <Icon name="bf-i-ph-sign-out" className="c-base11 mie-3" />}
          Logout
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}
