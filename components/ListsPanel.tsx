"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";

import useUserMe from "@/hooks/userMe";
import { Folder, FolderFields, List, ListFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContex } from "./Provider";
import Input from "./ui/Input";
import LoadingSpinner from "./ui/LoadingSpinner";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import Modal from "./ui/modal";
import Line from './ui/Line';

export default function ListsPanel() {
  return (
    <div className="flex flex-col b-ie-1 pie-6 gap-3 ">
      <DefaultLists />
      <Line />
      <div className="flex gap-3 justify-between items-center">
        <span className="c-base11">My Folders</span>
        <AddFolderButton />
      </div>
      <Folders />
      <Line />
      <div className="flex gap-3 justify-between items-center">
        <span className="c-base11">My Lists</span>
        <AddListButton />
      </div>
      <Lists />
      {/* <div className="mt-auto flex flex-col gap-3">
        <Modal trigger={<Button variation="ghost">Tasks </Button>}>
          <div className="h-12"></div>
          <div>
            <Pre>{JSON.stringify(tasks, null, 2)}</Pre>
          </div>
        </Modal>
      </div> */}
    </div>
  );
}

function MenuItem({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <Button variation="text" className="!text-start w-full !px-3" onClick={onClick}>
        <Icon name={icon} className="mie-1.5 c-base11" />
        {children}{" "}
      </Button>
    </li>
  );
}

function DefaultLists() {
  const { setSelectedUserListId } = useGlobalContex();

  return (
    <ul className="flex flex-col gap-3 -mis-3 ">
      <MenuItem icon="bf-i-ph-list" onClick={() => setSelectedUserListId(null)}>
        All Tasks
      </MenuItem>
      <MenuItem icon="bf-i-ph-sun" onClick={() => {}}>
        Do Today
      </MenuItem>
      <MenuItem icon="bf-i-ph-sun-horizon" onClick={() => {}}>
        Do Tomorrow
      </MenuItem>
      <MenuItem icon="bf-i-ph-star" onClick={() => {}}>
        Starred
      </MenuItem>
      <MenuItem icon="bf-i-ph-calendar-dots" onClick={() => {}}>
        With Due dates
      </MenuItem>
      <MenuItem icon="bf-i-ph-users" onClick={() => {}}>
        Asigned
      </MenuItem>
      {/* <MenuItem icon="bf-i-ph-user" onClick={() => setListName("assignedToMe")}>
        Asigned To Me
      </MenuItem>
      <MenuItem icon="bf-i-ph-user" onClick={() => setListName("withReminders")}>
        With Reminders
      </MenuItem>
      <MenuItem icon="bf-i-ph-user" onClick={() => setListName("withRepetition")}>
        With Repetition
      </MenuItem>
      <MenuItem icon="bf-i-ph-archive" onClick={() => setListName("archived")}>
        Archived Tasks
      </MenuItem>
      <MenuItem icon="bf-i-ph-trash" onClick={() => setListName("deleted")}>
        Deleted Tasks
      </MenuItem> */}
    </ul>
  );
}

function Folders() {
  const userMeQ = useUserMe();
  const foldersQ = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const data = await fetchAPI.GET("/folders");
      return data;
    },
    enabled: !!userMeQ.data?.id,
  });
  const queryClient = useQueryClient();

  const deleteFolderM = useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchAPI.DELETE(`/folders/${id}`, {
        method: "DELETE",
      });
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
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
                {/* <Button variation="text" className="!text-start w-full"> */}
                <span className="grow">{folder.name}</span>
                {/* </Button> */}
                <DropdownMenu
                  trigger={
                    <Button variation="text" className="shrink-0" iconButton>
                      <Icon name="bf-i-ph-dots-three" className=" c-base11" />
                    </Button>
                  }
                >
                  <DropdownMenuItem>
                    <Icon name="bf-i-ph-pencil" className="c-base11 mie-3" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => deleteFolderM.mutate(folder._id)}>
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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [folderDraft, setFolderDraft] = useState<FolderFields>(initialFolderDraft);

  const userMeQ = useUserMe();

  const addFolderM = useMutation({
    mutationFn: async (folder: FolderFields) => {
      const data = await fetchAPI.POST(`/folders`, { ...folder, author: userMeQ.data?.id });
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      setFolderDraft(initialFolderDraft);
      setShowForm(false);
    },
  });

  return (
    <Modal
      trigger={
        <Button variation="text" iconButton className=" shrink-0" onClick={() => setShowForm(true)}>
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
                value={folderDraft.name}
                onChange={(e) => setFolderDraft((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <Modal.Close>
              <Button
                className="w-full"
                variation="solid"
                type="submit"
                isLoading={addFolderM.isPending}
                disabled={!userMeQ.data?.id}
              >
                <Icon name="bf-i-ph-plus" className="c-base11" />
                <span className="">Add Folder</span>
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
    queryKey: ["lists"],
    queryFn: async () => {
      const data = await fetchAPI.GET("/lists");
      return data;
    },
    enabled: !!userMeQ.data?.id,
  });
  const queryClient = useQueryClient();

  const deleteListM = useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchAPI.DELETE(`/lists/${id}`);
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
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
              <li key={"menu-item-list-" + index} className="flex gap-3 items-center">
                <Icon name="bf-i-ph-list" className="c-base11" />
                <Button
                  variation="text"
                  preStyled={false}
                  className="!text-start w-full"
                  onClick={() => setSelectedUserListId(list.id)}
                >
                  <span className="grow">{list.name}</span>
                </Button>
                <DropdownMenu
                  trigger={
                    <Button variation="text" className="shrink-0" iconButton>
                      <Icon name="bf-i-ph-dots-three" className=" c-base11" />
                    </Button>
                  }
                >
                  <DropdownMenuItem>
                    <Icon name="bf-i-ph-pencil" className="c-base11 mie-3" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => deleteListM.mutate(list._id)}>
                    {deleteListM.isPending ? (
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

function AddListButton() {
  const queryClient = useQueryClient();

  const initialListDraft = {
    name: "",
    author: "",
  };
  const [showForm, setShowForm] = useState<boolean>(false);
  const [listDraft, setListDraft] = useState<ListFields>(initialListDraft);

  const userMeQ = useUserMe();

  const addListM = useMutation({
    mutationFn: async (list: ListFields) => {
      const data = await fetchAPI.POST(`/lists`, { ...list, author: userMeQ.data?.id });
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setListDraft(initialListDraft);
      setShowForm(false);
    },
  });

  return (
    <Modal
      trigger={
        <Button variation="text" iconButton className="shrink-0" onClick={() => setShowForm(true)}>
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
                onChange={(e) => setListDraft((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <Button variation="solid" type="submit" isLoading={addListM.isPending} disabled={!userMeQ.data?.id}>
              <Icon name="bf-i-ph-plus" className="c-base11" />
              <span className="">Create</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
