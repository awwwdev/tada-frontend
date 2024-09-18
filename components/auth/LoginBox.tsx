import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";

export default function LoginBox() {
  const { locale } = useRouter();

  const validationErrors = {
    en: {
      email: {
        required: "Email is required",
        invalid: "Please enter a valid email",
      },
      password: {
        required: "Password is required",
        invalid: "Please type in your password",
      },
    },
    fa: {
      email: {
        required: "لطفا این قسمت را خالی نگذارید",
        invalid: "این قسمت نادرست است",
      },
      password: {
        required: "لطفا این قسمت را خالی نگذارید",
        invalid: "این قسمت نادرست است",
      },
    },
  };

  const schema = z.object({
    email: z
      .string({ required_error: validationErrors[locale!].email.required })
      .email({ message: validationErrors[locale!].email.invalid }),
    password: z
      .string({ required_error: validationErrors[locale!].password.required })
      .min(1, { message: validationErrors[locale!].password.invalid }),
  });

  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const onSubmit = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    toast.success("You are Logged in.");
    queryClient.invalidateQueries({ queryKey: ["userMe"] });

    // Request to the API endpoint to log dashboard visit
    const response = await fetch("/api/logDashboardVisit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: data.user.id }),
    });

    const logData = await response.json();
    if (!response.ok) {
      throw new Error(logData.error);
    }
    /*     console.log("🌟triggered userMe invalidation"); */
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  return (
    <Form form={form} className="" hasSubmitButton={false}>
      <Form.Input name="email" label={`${locale === "en" ? "Email" : "ایمیل"}`} required />

      <Form.Input
        name="password"
        type={isPassVisible ? "text" : "password"}
        required
        label={locale === "en" ? "Password" : "کلمهٔ عبور"}
        suffix={
          <button className="px-1em" type="button" onClick={() => setIsPassVisible((s) => !s)}>
            <span className="sr-only">Show Password</span>
            {!isPassVisible && <Icon name="bf-i-ph-eye" subdued={false} />}
            {isPassVisible && <Icon name="bf-i-ph-eye-closed" subdued={false} />}
          </button>
        }
      />
      <Form.ServerErrorMessage />
      <Form.SubmitButton className="w-full">{locale === "en" ? "Login" : "ورود"}</Form.SubmitButton>
    </Form>
  );
}
