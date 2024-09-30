import { ThemeSwitcher } from "../header/ThemeSwitcher";
import LinkButton from "../ui/button/LinkButton";
import Icon from "../ui/Icon";

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
    </div>
  );
}
