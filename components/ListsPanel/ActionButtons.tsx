import Button from "@/components/ui/Button";
import useUserMe from "@/hooks/useUserMe";
import LoginOrSignUpBox from "../auth/LoginOrSignUpBox";
import AccountDropdown from '../header/AccountDropdown';
import { ThemeSwitcher } from "../header/ThemeSwitcher";
import LinkButton from "../ui/Button/LinkButton";
import Icon from "../ui/Icon";
import Modal from "../ui/modal";



export default function ActionButtons() {
  return (
    <div className='grid gap-3'>
      <LinkButton variant="text" href="/settings" className=" justify-start gap-3 text-start" >
        <Icon name="bf-i-ph-gear-six" className="c-base11" />
        <span className="c-base11">Settings</span>
      </LinkButton>
      <ThemeSwitcher />
      <AuthButtons />
      <LinkButton  variant="text" href="https://github.com/awwwdev/tada" className="justify-start gap-3">
        <Icon name="bf-i-ph-github-logo" className="c-base11" />
        <span className="c-base11">View source code</span>
      </LinkButton>
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
              <Button variant="ghost">
                <Icon name="bf-i-ph-sign-in" />
                Login
              </Button>
            }
          >
            <LoginOrSignUpBox initalTab="login" />
          </Modal>
          <Modal
            trigger={
              <Button variant="ghost">
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
