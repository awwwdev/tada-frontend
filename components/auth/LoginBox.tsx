import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/react-hook-form";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";
import { API } from "@/consts";
import { useGlobalContex } from "../Provider";
import fetchAPI from "@/utils/fetchAPI";

export default function LoginBox() {
  const { setUserMe } = useGlobalContex();

  const schema = z.object({
    email: z.string({ required_error: "Email is required!" }).email({ message: "Please enter a valid email." }),
    password: z
      .string({ required_error: "Password is required!" })
      .min(1, { message: "Password must be at least 8 characters long." }),
  });

  const queryClient = useQueryClient();

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    const data = await fetchAPI.POST("/auth/login/with-password", { email, password });
    if (data.error) throw new Error("Something went wrong");
    setUserMe(data.user);
    toast.success("You are Logged in.");
    queryClient.setQueryData(["userMe"], () => data.user);
    queryClient.invalidateQueries({ queryKey: ["userMe"], refetchType: 'all' });
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  return (
    <Form form={form} className="" hasSubmitButton={false}>
      <Form.Input name="email" label={"Email"} required />

      <Form.Input
        name="password"
        type={isPassVisible ? "text" : "password"}
        required
        label={"Password"}
        suffix={
          <button className="px-1em" type="button" onClick={() => setIsPassVisible((s) => !s)}>
            <span className="sr-only">Show Password</span>
            {!isPassVisible && <Icon name="bf-i-ph-eye" subdued={false} />}
            {isPassVisible && <Icon name="bf-i-ph-eye-closed" subdued={false} />}
          </button>
        }
      />
      <div className='h-6'></div>
      <Form.ServerErrorMessage />
      <Form.SubmitButton className="w-full">Login</Form.SubmitButton>
    </Form>
  );
}
