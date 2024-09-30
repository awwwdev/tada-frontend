import { ThemeSwitcher } from "../header/ThemeSwitcher";
import LinkButton from "../ui/button/LinkButton";
import Icon from "../ui/Icon";
import Button from "@/components/ui/button";
import useUserMe from "@/hooks/useUserMe";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import Modal from "../ui/modal";
import AccountDropdown from '../header/AccountDropdown';



export default function ActionButtons() {
  return (
    <div className='grid gap-3'>
      <LinkButton variation="ghost" href="/settings" className="" iconButton>
        <Icon name="bf-i-ph-gear-six" className="c-base11" />
        <span className="sr-only">Settings</span>
      </LinkButton>
      <LinkButton iconButton variation="ghost" href="https://github.com/awwwdev/tada" className="justify-center">
        <Icon name="bf-i-ph-github-logo" className="c-base11" />
        <span className="sr-only">Source Code</span>
      </LinkButton>
      <ThemeSwitcher />
      <AuthButtons />
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
        </>
      )}
    </>
  );
}
