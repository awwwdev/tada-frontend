import Button from "@/components/ui/Button";
import useUserMe from "@/hooks/useUserMe";
import { useState } from "react";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import AccountDropdown from "../header/AccountDropdown";
import { ThemeSwitcher } from "../header/ThemeSwitcher";
import { useGlobalContext } from "../Provider";
import Icon from "../ui/Icon";
import MenuItem from "../ui/MenuItem/MenuItem";
import Modal from "../ui/modal";

export default function ActionButtons() {
  const { setListsPanelOpen, setSettingsPanelOpen } = useGlobalContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const userMeQ = useUserMe();
  return (
    <div className="grid gap-1.5">
      <AuthButtons />
      <Button
        variant="text"
        className=" justify-start gap-3 text-start"
        onClick={() => {
          // if (userMeQ.data) {
          setListsPanelOpen(false);
          setSettingsPanelOpen(true);
          // } else {
          // setShowAuthModal(true);
          // }
        }}
      >
        <Icon name="bf-i-ph-gear-six" className="mie-1.5 c-base11" />
        <span className="c-base11">Settings</span>
      </Button>{" "}
      {/* <LinkButton variant="text"  className="justify-start gap-3"> */}
      <a href="https://github.com/awwwdev/tada" className="text-start">
        <MenuItem size="xl" className="flex gap-1.5" onClick={() => setListsPanelOpen(false)}>
          <Icon name="bf-i-ph-github-logo" className="c-base11 mie-1.5" />
          <span className="c-base11">Source Code</span>
        </MenuItem>
      </a>
      <Modal title="Please Sign-up or Login first" open={showAuthModal} setOpen={setShowAuthModal}>
        <LoginOrSignUpBox initialTab="login" />
      </Modal>
      <ThemeSwitcher />
    </div>
  );
}

function AuthButtons() {
  const userMeQ = useUserMe();
  const { setListsPanelOpen } = useGlobalContext();

  return (
    <>
      {userMeQ.data ? (
        <AccountDropdown />
      ) : (
        <>
          <Modal
            trigger={
              <MenuItem size="xl" className="justify-start" onClick={() => setListsPanelOpen(false)}>
                <Icon name="bf-i-ph-sign-in" className="mie-1.5 c-base11" />
                Login
              </MenuItem>
            }
          >
            <LoginOrSignUpBox initialTab="login" />
          </Modal>
          <Modal
            trigger={
              <MenuItem size="xl" className="justify-start" onClick={() => setListsPanelOpen(false)}>
                <Icon name="bf-i-ph-sign-in" />
                Sign Up
              </MenuItem>
            }
          >
            <LoginOrSignUpBox initialTab="signup" />
          </Modal>
        </>
      )}
    </>
  );
}
