"use client";

import Button from "@/components/ui/button";
import LinkButton from "@/components/ui/button/LinkButton";
import Icon from "@/components/ui/Icon";
import useUserMe from "@/hooks/useUserMe";
import fetchAPI from "@/utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import Modal from "../ui/modal";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className={`flex gap-3 items-center b-b-1 b-base5 pb-1.5`}>
      <h1 className=" H3 ">TADA</h1>

      <div className="mis-auto flex items-center gap-3">
        <LinkButton variation="ghost" href="/settings" className="" iconButton>
          <Icon name="bf-i-ph-gear-six" className="c-base11" />
          <span className="sr-only">Settings</span>
        </LinkButton>
        <LinkButton iconButton variation="ghost" href="https://github.com/awwwdev/tada" className="justify-center">
          <Icon name="bf-i-ph-github-logo" className="c-base11" />
          <span className="sr-only">Source Code</span>
        </LinkButton>
        <ThemeSwitcher theme="dark" />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;

function AuthButtons() {
  const userMeQ = useUserMe();
  const queryClient = useQueryClient();

  return (
    <>
      {userMeQ.data && <p>{userMeQ.data.email}</p>}
      {userMeQ.data ? (
        <LogoutButton />
      ) : (
        <>
          <Modal
            trigger={
              <Button variation="ghost">
                <Icon name="bf-i-ph-sign-in" />
                Login
              </Button>
            }
          >
            <LoginOrSignUpBox initalTab="login" />
          </Modal>
          <Modal
            trigger={
              <Button variation="ghost">
                <Icon name="bf-i-ph-sign-in" />
                Sign Up
              </Button>
            }
          >
            <LoginOrSignUpBox initalTab="signup" />
          </Modal>
          {/* <Button
            variation="ghost"
            onClick={async () => {
              const data = await fetchAPI.GET(`/auth/user`);
              toast(data.message);
            }}
          >
            User Status
          </Button> */}
        </>
      )}
    </>
  );
}

function LogoutButton() {
  const queryClient = useQueryClient();
  return (
    <Button
      variation="ghost"
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
