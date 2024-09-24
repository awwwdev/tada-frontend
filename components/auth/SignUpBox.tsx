import { z } from "zod";
import { useCallback, useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Fieldset from "@/components/ui/Fieldset";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";
import { API } from "@/consts";
import { useGlobalContex } from "../Provider";
import fetchAPI from "@/utils/fetchAPI";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter user's Email")
    .min(5, "Email must be 5 characters or longer")
    .email({ message: "Please enter a valid email." }),
  password: z.string().min(2, "Password must be 8 characters or longer"),
  // use code below for validation
  // password: z
  //   .string()
  //   .min(8, "min")
  //   .max(64, "max")
  //   .regex(/[A-Z]/, "uppercase")
  //   .regex(/[a-z]/, "lowercase")
  //   .regex(/\d/, "digit")
  //   .regex(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/, "special"), // not sure if this works correctly
  confirmPassword: z.string().min(1, "Please fill in the confirm password"),
});

export default function SignUpBox() {
  // const queryClient = useQueryClient();

  const { setUserMe } = useGlobalContex();
  const queryClient = useQueryClient();

  const onSubmit = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (password !== confirmPassword) {
      console.log("Passwords must match. Try again.");
      // error message should be farsi if locale is fa.
      throw new Error("Passwords must match. Try again.");
    }
    const data = await fetchAPI.POST("/auth/signup", { email, password });
    if (data.error) throw new Error("Something went wrong");
    toast.success("You are successfully signed up.");
    // queryClient.setQueryData(['userMe'], () => data.user);
    queryClient.invalidateQueries({ queryKey: ["userMe"], refetchType: 'all' });
  
    setUserMe(data.user);
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  if (form.formState.isSubmitSuccessful) {
    return <p>You signed up successfully. Please check your email and confirm it.</p>;
  }
  return (
    <div className="space-y-2 ">
      <div className="">
        <Form form={form} onSubmit={onSubmit} className="" submitText="Sign Up" hasSubmitButton={false}>
          <Form.Input name="email" required label={"Email"} />
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
          <Form.Input
            name="confirmPassword"
            type={isPassVisible ? "text" : "password"}
            required
            label={"Confirm Password"}
          />
          <div className="h-6"></div>
          <Form.ServerErrorMessage />
          <Form.SubmitButton className="w-full">{"Submit"}</Form.SubmitButton>
        </Form>
      </div>
    </div>
  );
}
