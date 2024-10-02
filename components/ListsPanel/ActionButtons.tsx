import Button from "@/components/ui/Button";
import useUserMe from "@/hooks/useUserMe";
import Link from "next/link";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import AccountDropdown from "../header/AccountDropdown";
import { ThemeSwitcher } from "../header/ThemeSwitcher";
import LinkButton from "../ui/Button/LinkButton";
import Icon from "../ui/Icon";
import MenuItem from "../ui/MenuItem/MenuItem";
import Modal from "../ui/modal";

export default function ActionButtons() {
  return (
    <div className="grid gap-1.5">
      <ThemeSwitcher />
      <AuthButtons />
      <Link href="/settings" className=" justify-start gap-3 text-start">
        <MenuItem size="xl" className="">
          <Icon name="bf-i-ph-gear-six" className="mie-1.5 c-base11" />
          <span className="c-base11">Settings</span>
        </MenuItem>
      </Link>
      {/* <LinkButton variant="text"  className="justify-start gap-3"> */}
      <a href="https://github.com/awwwdev/tada" className="text-start">
        <MenuItem size="xl" className="flex gap-1.5">
          <Icon name="bf-i-ph-github-logo" className="c-base11" />
          <span className="c-base11">View source code</span>
        </MenuItem>
      </a>
    </div>
  );
}

function AuthButtons() {
  const userMeQ = useUserMe();

  return (
    <>
      {userMeQ.data ? (
        <AccountDropdown />
      ) : (
        <>
          <Modal
            trigger={
              <MenuItem size="xl" className="justify-start">
                <Icon name="bf-i-ph-sign-in" className="mie-1.5 c-base11" />
                Login
              </MenuItem>
            }
          >
            <LoginOrSignUpBox initalTab="login" />
          </Modal>
          <Modal
            trigger={
              <MenuItem size="xl" className="justify-start">
                <Icon name="bf-i-ph-sign-in" />
                Sign Up
              </MenuItem>
            }
          >
            <LoginOrSignUpBox initalTab="signup" />
          </Modal>
        </>
      )}
    </>
  );
}
