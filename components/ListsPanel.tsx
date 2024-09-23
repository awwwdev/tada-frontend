"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Pre from "@/components/ui/Pre";

import { useGlobalContex } from "./Provider";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/consts";
import { Folder, FolderFields, List, ListFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import toast from "react-hot-toast";
import { boolean } from "zod";
import Input from "./ui/Input";
import useUserMe from "@/hooks/userMe";
import LoadingSpinner from "./ui/LoadingSpinner";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";

export default function ListsPanel() {
  const { tasks } = useGlobalContex();

  const listsQ = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      const response = await fetch(API + "/lists", { credentials: "include" });
      return response.json();
    },
  });
  return (
    <div className="flex flex-col b-ie-1 pie-6">
      <DefaultLists />
      My Folders
      <Folders />
      <AddFolderButton />
      My Lists
      <Lists />
      <AddListButton />
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
      <Button variation="text" className="!text-start w-full" onClick={onClick}>
        <Icon name={icon} className="mie-1.5 c-base11" />
        {children}{" "}
      </Button>
    </li>
  );
}

function DefaultLists() {
  const { setListName } = useGlobalContex();

  return (
    <ul className="flex flex-col gap-3  ">
      <MenuItem icon="bf-i-ph-list" onClick={() => setListName("all")}>
        All Tasks
      </MenuItem>
      <MenuItem icon="bf-i-ph-sun" onClick={() => setListName("doToday")}>
        Do Today
      </MenuItem>
      <MenuItem icon="bf-i-ph-sun-horizon" onClick={() => setListName("doTomorrow")}>
        Do Tomorrow
      </MenuItem>
      <MenuItem icon="bf-i-ph-star" onClick={() => setListName("starred")}>
        Starred
      </MenuItem>
      <MenuItem icon="bf-i-ph-calendar-dots" onClick={() => setListName("withDueDates")}>
        With Due dates
      </MenuItem>
      <MenuItem icon="bf-i-ph-users" onClick={() => setListName("assigned")}>
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
      // const response = await fetch(API + "/folders?userId=" + userMeQ.data?.id, { credentials: "include" });
      const response = await fetch(API + "/folders", { credentials: "include" });
      return response.json();
    },
    enabled: !!userMeQ.data?.id,
  });
  const queryClient = useQueryClient();

  const deleteFolderM = useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchAPI(`/folders/${id}`, {
        method: "DELETE",
        credentials: "include",
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

                <div>
                  <DropdownMenu
                    trigger={
                      <Button variation="text" className="!text-start w-full shrink-0" iconButton>
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
                  </DropdownMenu>
                </div>
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
      const data = await fetchAPI(`/folders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...folder, author: userMeQ.data?.id }),
      });
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
    <div>
      {showForm ? (
        <div>
          <form
            className="mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              addFolderM.mutate(folderDraft);
            }}
          >
            <div className="flex gap-3 items-end">
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
              <Button
                iconButton
                variation="solid"
                type="submit"
                isLoading={addFolderM.isPending}
                disabled={!userMeQ.data?.id}
              >
                <Icon name="bf-i-ph-plus" className="c-base11" />
                <span className="sr-only">Add Folder</span>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button variation="text" className="!text-start mt-3 w-full" onClick={() => setShowForm(true)}>
          <Icon name="bf-i-ph-plus" className="mie-1.5 c-base11" />
          <span className="italic c-base11">Add a Folder</span>
        </Button>
      )}
    </div>
  );
}

function Lists() {
  const userMeQ = useUserMe();
  const listQ = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      // const response = await fetch(API + "/folders?userId=" + userMeQ.data?.id, { credentials: "include" });
      const response = await fetch(API + "/lists", { credentials: "include" });
      return response.json();
    },
    enabled: !!userMeQ.data?.id,
  });
  const queryClient = useQueryClient();

  const deleteListM = useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchAPI(`/lists/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
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

                {/* <Button variation="text" className="!text-start w-full"> */}
                <span className="grow">{list.name}</span>
                {/* </Button> */}

                <div>
                  <DropdownMenu
                    trigger={
                      <Button variation="text" className="!text-start w-full shrink-0" iconButton>
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
                  </DropdownMenu>
                </div>
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
      const data = await fetchAPI(`/lists`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...list, author: userMeQ.data?.id }),
      });
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
    <div>
      {showForm ? (
        <div>
          <form
            className="mt-auto"
            onSubmit={(e) => {
              e.preventDefault();
              addListM.mutate(listDraft);
            }}
          >
            <div className="flex gap-3 items-end">
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
              <Button
                iconButton
                variation="solid"
                type="submit"
                isLoading={addListM.isPending}
                disabled={!userMeQ.data?.id}
              >
                <Icon name="bf-i-ph-plus" className="c-base11" />
                <span className="sr-only">Add List</span>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button variation="text" className="!text-start mt-3 w-full" onClick={() => setShowForm(true)}>
          <Icon name="bf-i-ph-plus" className="mie-1.5 c-base11" />
          <span className="italic c-base11">Add a List</span>
        </Button>
      )}
    </div>
  );
}
