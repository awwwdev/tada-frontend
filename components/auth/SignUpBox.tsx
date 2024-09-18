import { z } from "zod";
import { useCallback, useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Fieldset from "@/components/ui/Fieldset";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter user's Email")
    .min(5, "Email must be 5 characters or longer")
    .email({ message: "Please enter a valid email." }),
  firstname: z.string().min(1, "Please enter user's first name"),
  lastname: z.string().min(1, "Please enter user's last name"),
  firstnameFa: z.string().min(1, "Please enter user's first name in Farsi"),
  lastnameFa: z.string().min(1, "Please enter user's last name in Farsi"),
  countryCode: z.string().max(2, { message: "Must be 2 or fewer characters long" }).optional().nullable(),
  phoneCountryCode: z
    .string()
    .regex(/^(\s*|\d+)$/)
    .max(4, { message: "Must be 4 or fewer digits" })
    .optional()
    .nullable(),
  phone: z
    .string()
    .regex(/^(\s*|\d+)$/)
    .optional()
    .nullable(),
  password: z.string().min(8, "Password must be 8 characters or longer"),
  // use code below for validation
  // password: z
  //   .string()
  //   .min(8, "min")
  //   .max(64, "max")
  //   .regex(/[A-Z]/, "uppercase")
  //   .regex(/[a-z]/, "lowercase")
  //   .regex(/\d/, "digit")
  //   .regex(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/, "special"), // not sure if this works correctly
  // confirmPassword: z.string().min(1, "Please fill in the confirm password"),
});

export default function SignUpBox() {
  const { locale } = useRouter();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const [signedUp, setSignedUp] = useState(false);

  const onSubmit = async (formValues) => {
    // if (formValues.password !== formValues.confirmPassword) {
    //   // error message should be farsi if locale is fa.
    //   throw new Error("Passwords must match. Try again.");
    // }
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
      options: {
        emailRedirectTo: window.location.href,
      },
    });
    if (signUpError) {
      console.log("fdf", signUpError.message);
      throw signUpError;
    }

    if (user.user.identities && user.user.identities.length === 0) {
      // const error = {
      //   message: ,
      // };
      throw new Error("A user with this email address already exists.");
    }

    const updateResponse = await fetch("/api/updateUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.user.id,
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        firstnameFa: formValues.firstnameFa,
        lastnameFa: formValues.lastnameFa,
        phoneCountryCode: formValues.phoneCountryCode,
        phone: formValues.phone,
      }),
    });

    const updateResult = await updateResponse.json();

    if (!updateResponse.ok) {
      throw new Error(updateResult.error.message); // or result.error.message
    }

    const insertResponse = await fetch("/api/insertSensitiveInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.user.id,
        phoneCountryCode: formValues.phoneCountryCode,
        phone: formValues.phone,
        email: formValues.email,
      }),
    });

    const insertResult = await insertResponse.json();

    if (!insertResponse.ok) {
      throw new Error(insertResult.error.message);
    }

    const insertPayerResponse = await fetch("/api/insertPayerInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.user.id,
      }),
    });

    const insertPayerResult = await insertPayerResponse.json();

    if (!insertPayerResponse.ok) {
      throw new Error(insertPayerResult.error.message);
    }

    setSignedUp(true);
  };

  const form = useFormHook({ schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  if (signedUp) {
    return <p>You signed up successfully. Please check your email and confirm it.</p>;
  }
  return (
    <div className="space-y-2 ">
      <div className="">
        <Form form={form} onSubmit={onSubmit} className="" submitText="Sign Up" hasSubmitButton={false}>
          <Form.Input name="firstname" required label={locale === "en" ? "Firstname" : "نام به انگلیسی"} />
          <Form.Input name="lastname" required label={locale === "en" ? "Lastname" : "نام خانوادگی به انگلیسی"} />
          <Form.Input name="firstnameFa" required label={locale === "en" ? "Firstname in Farsi" : "نام به فارسی"} />
          <Form.Input
            name="lastnameFa"
            required
            label={locale === "en" ? "Lastname in Farsi" : "نام خانوادگی به فارسی"}
          />
          <Form.Input name="email" required label={locale === "en" ? "Email" : "ایمیل"} />
          <Fieldset name="phonenumber" legend={locale === "en" ? "Phone" : "تلفن"}>
            <div className="flex gap-3">
              <Form.Input name="phoneCountryCode" size={4} label={locale === "en" ? "Country Code" : "کد کشور"} />
              <div className="grow">
                <Form.Input name="phone" label={locale === "en" ? "Number" : "شماره"} />
              </div>
            </div>
          </Fieldset>
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
          {/* <Form.Input name="confirmPassword" type={isPassVisible ? "text" : "password"} required  required label={locale === 'en' ?'Confirm Password' : 'تکرار کلمهٔ عبور' }/> */}
          <div className="h-3"></div>
          <Form.ServerErrorMessage />
          <Form.SubmitButton width="parent">{locale === "en" ? "Submit" : "ثبت"}</Form.SubmitButton>
        </Form>
      </div>
    </div>
  );
}
