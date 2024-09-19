"use client";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LinkButton from "@/components/ui/button/LinkButton";
import Modal from "../ui/modal";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import { API } from "@/consts";
import toast from "react-hot-toast";
import useUserMe from "@/hooks/userMe";
import { useQueryClient } from '@tanstack/react-query';

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
      {userMeQ.data ? (
        <Button
          variation="ghost"
          onClick={async () => {
            const res = await fetch(`${API}/auth/logout`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const json = await res.json();
            queryClient.invalidateQueries({ queryKey: ["userMe"] });

            toast(json.message);
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Modal
            trigger={
              <Button variation="ghost">
                <Icon name="bf-i-ph-signin" />
                Login
              </Button>
            }
          >
            <LoginOrSignUpBox initalTab="login" />
          </Modal>
          <Modal
            trigger={
              <Button variation="ghost">
                <Icon name="bf-i-ph-signin" />
                Sign Up
              </Button>
            }
          >
            <LoginOrSignUpBox initalTab="signup" />
          </Modal>
          <Button
            variation="ghost"
            onClick={async () => {
              const res = await fetch(`${API}/auth/user`, {
                credentials: "include",
              });
              const json = await res.json();
              toast(json.message);
            }}
          >
            User Status
          </Button>
        </>
      )}
    </>
  );
}
