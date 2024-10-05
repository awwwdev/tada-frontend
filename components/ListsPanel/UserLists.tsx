"use client";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/modal";
import { ListFields } from "@/types";
import { useState } from "react";

import { useGlobalContex } from "@/components/Provider";
import UserListDropDown from "@/components/UserListDropDown";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useUserMe from "@/hooks/useUserMe";
import { List } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";

export default function UserLists() {
  const userMeQ = useUserMe();
  const { setSelectedUserListId } = useGlobalContex();
  const listQ = useQuery({
    queryKey: ["lists"],
    queryFn: () => fetchAPI.GET("/lists"),
    enabled: !!userMeQ.data?.id,
  });

  const queryClient = useQueryClient();

  const deleteListM = useMutation({
    mutationFn: (id: string) => fetchAPI.DELETE(`/lists/${id}`),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
  const { setListsPanelOpen } = useGlobalContex();

  return (
    <>
      <div className="flex gap-3 justify-between items-center">
        <span className="c-base10 pis-3 ">My Lists</span>
        <AddListButton />
      </div>

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
                  onClick={() => {
                    setSelectedUserListId(list.id);
                    setListsPanelOpen(false);
                  }}
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
    authorId: "",
    tasks: [],
    emojies: [],
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [listDraft, setListDraft] = useState<ListFields>(initialListDraft);

  const userMeQ = useUserMe();

  const addListM = useMutation({
    mutationFn: async (list: ListFields) => fetchAPI.POST(`/lists`, { ...list, authorId: userMeQ.data?.id }),
    onError: (err) => toast.error("Error: " + err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setListDraft(initialListDraft);
      setShowModal(false);
    },
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Button
        variant="text"
        iconButton
        className="shrink-0"
        onClick={() => {
          if (!userMeQ.data) setShowAuthModal(true);
          if (userMeQ.data) setShowModal(true);
        }}
      >
        <Icon name="bf-i-ph-plus" className=" c-base11" />
        <span className="sr-only">Add a List</span>
      </Button>

      <Modal open={showModal} setOpen={setShowModal}>
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
      <Modal open={showAuthModal} setOpen={setShowAuthModal} title="Please Sign-up or Login first">
        <LoginOrSignUpBox initalTab="login" />
      </Modal>
    </>
  );
}
