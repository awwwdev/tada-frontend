import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Tabs from "@/components/ui/Tabs";
import SignUpBox from "./SignUpBox";
import LoginBox from "./LoginBox";
import Button from "@/components/ui/button";
import Space from "@/components/ui/Space";

type TabValue = "signup" | "login";

export default function LoginOrSignUpBox({ initalTab = "signup" }: { initalTab?: TabValue }) {
  const [tabVelue, setTabValue] = useState<TabValue>(initalTab);
  return (
    <div className=" b-solid rd-lg w-full ">
      <div className="">
        <Tabs value={tabVelue} onValueChange={(v: TabValue) => setTabValue(v)}>
          <Tabs.TabsList className="flex gap-1.5  b-b-1 b-sand5">
            <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
            <Tabs.Trigger value="login">Login</Tabs.Trigger>
          </Tabs.TabsList>
          <Space size="h-6" />
          <Tabs.Content value="signup">
            <SignUpBox />
            <p className="mt-8 text-sm c-sand11 text-center">
              Already a user?{` `}
              <Button className="underline" variation="text" preStyled={false} onClick={() => setTabValue("login")}>
                {" "}
                Login here
              </Button>
            </p>
          </Tabs.Content>
          <Tabs.Content value="login">
            <LoginBox />
            <Space size="h-6" />
            <div>
              <p className=" fs-sm c-sand11 text-center">
                Forgot Password?{" "}
                <Link className="underline" href="/request-reset-password">
                  Reset it here.
                </Link>
              </p>
              <p className=" fs-sm c-sand11 text-center">
                No Account?{` `}
                <Button variation="text" className="underline" preStyled={false} onClick={() => setTabValue("signup")}>
                  {" "}
                  Sign Up here.
                </Button>
              </p>
            </div>
          </Tabs.Content>
        </Tabs>
        <div></div>
      </div>
    </div>
  );
}
