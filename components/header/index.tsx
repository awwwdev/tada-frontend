import Link from "next/link";
import HamburgerButton from "./HamburgerButton";
import HybridLink from "./HybridLink";
import Button from "../ui/button";
import Icon from "../ui/Icon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LinkButton from "../ui/button/LinkButton";

const Header = () => {
  return (
    <header className={`flex gap-3 items-center `}>
      <h1 className=" H3 ">TADA</h1>

      <div className="mis-auto flex items-center gap-3">
        <LinkButton variation="ghost" href="/settings" className="" iconButton>
          <Icon name="bf-i-ph-gear-six" className="mie-1.5 c-base11" />
          <span className="sr-only">Settings</span>
        </LinkButton>

        <LinkButton iconButton variation="ghost" href="https://github.com/awwwdev/tada" className="justify-center">
          <Icon name="bf-i-ph-github-logo" className="mie-1.5 c-base11" />
          <span className="sr-only">Source Code</span>
        </LinkButton>

        <ThemeSwitcher theme="dark" />
        <Button variation="ghost">
          <Icon name="bf-i-ph-signin" />
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;

function MobileHeader() {
  return (
    <div className={` w-full max-w-page mx-auto grid `} style={{ gridTemplateColumns: "1fr auto 1fr" }}>
      <div className="flex ">
        <HamburgerButton />
      </div>
      <Link href="/" className="fs-sm fw-300 c-base11 tracking-wider font-display flex justify-center items-center">
        awwww.dev
      </Link>
      <div className="flex justify-end items-center">
        {/* <LocaleSwitcher /> */}
        {/* <MobileAccountButtons /> */}
      </div>
    </div>
  );
}

function PublicWebsiteNav() {
  return (
    <nav className="w-full font-display">
      <ul className="flex items-center gap-4  text-xs sm:text-base w-full ">
        <li className="flex items-center">
          <HybridLink
            pageUrl="/"
            inSamePageHref={"#hero"}
            href={"/"}
            className="rd-1 text-xs sm:text-base flex justify-center  items-center  tracking-wider fw-300"
          >
            awww.dev
          </HybridLink>
        </li>
        <li className="mis-auto">
          <a href="#works" className="hover:c-base11 rd-1">
            Works
          </a>
        </li>
        <li>
          <a href="/#tools" className="hover:c-base11 rd-1">
            Tools
          </a>
        </li>
        <li>
          <HybridLink pageUrl="/" inSamePageHref={"#blog"} href={"/blog"} className="hover:c-base11 rd-1">
            Blog
          </HybridLink>
        </li>

        <li>
          <a href="#contact" className="hover:c-base11 rd-1">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
