"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useGlobalContex } from "@/components/Provider";
import UserListDropDown from "@/components/UserListDropDown";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";
import Input from "@/components/ui/Input";
import Line from "@/components/ui/Line";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Modal from "@/components/ui/modal";
import SMART_LIST_IDS from '@/constants/smartListIds';
import useUserMe from "@/hooks/useUserMe";
import { Folder, FolderFields, List, ListFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ActionButtons from './ActionButtons';

export default function ListsPanel() {
  return (
    <div className="flex flex-col b-ie-1 b-base6 pie-6 py-6 pis-3  gap-3 overflow-y-auto ">
      <SmartLists />
      <Line />
      {/* <div className="flex gap-3 justify-between items-center">
        <span className="c-base11">My Folders</span>
        <AddFolderButton />
      </div>
      <Folders />
      <Line /> */}
      <div className="flex gap-3 justify-between items-center">
        <span className="c-base10 pis-3 ">My Lists</span>
        <AddListButton />
      </div>
      <Lists />
      <div className="mt-auto">
        <ActionButtons />
      </div>
    </div>
  );
}

function MenuItem({ icon, children, onClick, active }: { icon: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <li>
      <Button variant="text" className={`!text-start w-full !px-3 ${active ? "" : ""}`} onClick={onClick}>
        <Icon name={icon} className="mie-1.5 c-base11" />
        {children}{" "}
      </Button>
    </li>
  );
}

function SmartLists() {
  const { setSelectedSmartListId , currentList } = useGlobalContex();

  return (
    <ul className="flex flex-col gap-3  ">
      <MenuItem icon="bf-i-ph-list" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ALL_TASKS)} active={currentList.id === SMART_LIST_IDS.ALL_TASKS}>
        All Tasks
      </MenuItem>
      {/* <MenuItem icon="bf-i-ph-sun" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DO_TODAY)}>
        Do Today
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-sun-horizon" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DO_TOMORROW)}>
        Do Tomorrow
      </MenuItem> */}
      <MenuItem icon="bf-i-ph-star" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.STARRED)}
      active={currentList.id === SMART_LIST_IDS.STARRED}
      >
        Starred
      </MenuItem>
      {/* <MenuItem icon="bf-i-ph-calendar-dots" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.WITH_DUE_DATES)}>
        With Due dates
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-user" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ASSIGNED_TO_ME)}>
        Asigned To Me
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-users" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ASSIGNED)}>
        Asigned
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-alarm" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.WITH_REMINDERS)}>
        With Reminders
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-sneaker-move" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ROUTINES)} >
        Rutines
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-archive" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.ARCHIVED)}>
        Archived Tasks
      </MenuItem> */}
      {/* <MenuItem icon="bf-i-ph-trash" onClick={() => setSelectedSmartListId(SMART_LIST_IDS.DELETED)} >
        Deleted Tasks
      </MenuItem> */}
    </ul>
  );
}

function Folders() {
  const userMeQ = useUserMe();
  const foldersQ = useQuery({
    queryKey: ["folders"],
    queryFn: () => fetchAPI.GET("/folders"),
    enabled: !!userMeQ.data?.id,
  });
  const queryClient = useQueryClient();

  const deleteFolderM = useMutation({
    mutationFn: (id: string) => fetchAPI.DELETE(`/folders/${id}`),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
  });

  return (
    <>
      {foldersQ.isLoading && <LoadingSpinner />}
      <ul>
        {foldersQ.data &&
          foldersQ.data.length > 0 &&
          foldersQ.data.map((folder: Folder, index: number) => {
            return (
              <li key={"menu-item-folder-" + index} className="flex gap-3 items-center">
                <Icon name="bf-i-ph-folder" className="c-base11" />
                {/* <Button variant="text" className="!text-start w-full"> */}
                <span className="grow">{folder.name}</span>
                {/* </Button> */}
                <DropdownMenu
                  trigger={
                    <Button variant="text" className="shrink-0" iconButton>
                      <Icon name="bf-i-ph-dots-three" className=" c-base11" />
                    </Button>
                  }
                >
                  <DropdownMenuItem>
                    <Icon name="bf-i-ph-pencil-simple" className="c-base11 mie-3" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => deleteFolderM.mutate(folder.id)}>
                    {deleteFolderM.isPending ? (
                      <LoadingSpinner />
                    ) : (
                      <Icon name="bf-i-ph-trash" className="c-base11 mie-3" />
                    )}
                    Delete
                  </DropdownMenuItem>
                </DropdownMenu>{" "}
              </li>
            );
          })}
      </ul>
    </>
  );
}

function AddFolderButton() {
  const queryClient = useQueryClient();

  const initialFolderDraft = {
    name: "",
    author: "",
  };
  const [folderDraft, setFolderDraft] = useState<FolderFields>(initialFolderDraft);

  const userMeQ = useUserMe();

  const addFolderM = useMutation({
    mutationFn: async (folder: FolderFields) => fetchAPI.POST(`/folders`, { ...folder, author: userMeQ.data?.id }),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setFolderDraft(initialFolderDraft);
      setShowModal(false);
    },
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      trigger={
        <Button variant="text" iconButton className=" shrink-0">
          <Icon name="bf-i-ph-plus" className=" c-base11" />
          <span className="sr-only">Add a Folder</span>
        </Button>
      }
    >
      <div>
        <h3 className="H3">Add a Folder</h3>
        <div className="h-6"></div>
        <form
          className="mt-auto"
          onSubmit={(e) => {
            e.preventDefault();
            addFolderM.mutate(folderDraft);
          }}
        >
          <div className="grid gap-3 items-end">
            <div className="grow">
              <Input
                name="name"
                label=""
                type="text"
                placeholder="New Folder"
                autoFocus
                value={folderDraft.name}
                onChange={(e) => setFolderDraft((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <Modal.Close>
              <Button
                className="w-full"
                variant="solid"
                type="submit"
                isLoading={addFolderM.isPending}
                disabled={!userMeQ.data?.id}
              >
                <Icon name="bf-i-ph-plus" className="c-base11" />
                <span className="">Create</span>
              </Button>
            </Modal.Close>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function Lists() {
  const userMeQ = useUserMe();
  const { setSelectedUserListId } = useGlobalContex();
  const listQ = useQuery({
    queryKey: ['lists'],
    queryFn: () => fetchAPI.GET("/lists"),
    enabled: !!userMeQ.data?.id,
  });
  
  const queryClient = useQueryClient();

  const deleteListM = useMutation({
    mutationFn:  (id: string) => fetchAPI.DELETE(`/lists/${id}`),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return (
    <>
      {listQ.isLoading && <LoadingSpinner />}
      <ul>
        {listQ.data &&
          listQ.data.length > 0 &&
          listQ.data.map((list: List, index: number) => {
            return (
              <li key={"menu-item-list-" + index} className="flex gap-3 items-center pis-3 hover:bg-base4 rd-1.5">
                <Button
                  variant="text"
                  preStyled={false}
                  className="!text-start w-full"
                  onClick={() => setSelectedUserListId(list.id)}
                >
                <Icon name="bf-i-ph-list" className="c-base11" />
                  <span className="grow">{list.name}</span>
                </Button>
                <UserListDropDown listId={list.id} />
              </li>
            );
          })}
      </ul>
    </>
  );
}

function AddListButton() {
  const queryClient = useQueryClient();

  const initialListDraft: ListFields = {
    name: "",
    author: "",
    tasks: [],
    emojies: [],
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [listDraft, setListDraft] = useState<ListFields>(initialListDraft);

  const userMeQ = useUserMe();

  const addListM = useMutation({
    mutationFn: async (list: ListFields) => fetchAPI.POST(`/lists`, { ...list, author: userMeQ.data?.id }),
    onError: (err) => toast.error("Error: " + err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setListDraft(initialListDraft);
      setShowModal(false);
    },
  });

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      trigger={
        <Button variant="text" iconButton className="shrink-0">
          <Icon name="bf-i-ph-plus" className=" c-base11" />
          <span className="sr-only">Add a List</span>
        </Button>
      }
    >
      <div>
        <h3 className="H3">Add a List</h3>
        <div className="h-6"></div>
        <form
          className="mt-auto"
          onSubmit={(e) => {
            e.preventDefault();
            addListM.mutate(listDraft);
          }}
        >
          <div className="grid gap-3 items-end">
            <div className="grow">
              <Input
                name="name"
                label=""
                type="text"
                placeholder="New Folder"
                value={listDraft.name}
                autoFocus
                onChange={(e) => setListDraft((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <Button variant="solid" type="submit" isLoading={addListM.isPending} disabled={!userMeQ.data?.id}>
              <Icon name="bf-i-ph-plus" className="c-base11" />
              <span className="">Create</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
