"use client";

import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";

import useDeleteList from "@/hooks/useDeleteList";
import useListMutation from "@/hooks/useListMutation";
import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import Input from "@/components/ui/Input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import Modal from "@/components/ui/modal";
import useLogOut from "@/hooks/useLogOut";
import Avatar from '../ui/Avatar';

export default function AccountDropdown() {
  const userMeQ = useUserMe();

  const logoutMutation = useLogOut();

  return (
    <div>
      <DropdownMenu
        trigger={
          <Button variation="text" className="shrink-0" iconButton>
            <Avatar src='' name={userMeQ.data?.email ?? ""} />
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
