import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/react-hook-form";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";
import { API } from '@/consts';
import { useGlobalContex } from '../Provider';

export default function LoginBox() {

  const { setUserMe } = useGlobalContex();

  const schema = z.object({
    email: z
      .string({ required_error: "Email is required!"})
      .email({ message: "Please enter a valid email." }),
    password: z
      .string({ required_error: "Password is required!"})
      .min(1, { message: "Password must be at least 8 characters long." }),
  });

  const queryClient = useQueryClient();

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(API + '/auth/login/with-password' , {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    } 
    const data = await response.json();
    if (data.error) {
      throw new Error('Something went wrong');
    } 
    setUserMe(data.user);
    console.log("🚀 ~ data.user:", data)
    
    toast.success("You are Logged in.");
    queryClient.invalidateQueries({ queryKey: ["userMe"] });
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
      <Form.ServerErrorMessage />
      <Form.SubmitButton className="w-full">Login</Form.SubmitButton>
    </Form>
  );
}
