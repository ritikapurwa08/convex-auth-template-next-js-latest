import { AuthSignUpSchema, AuthSignUpSchemaType } from "@/types/auth/authTypes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import CustomPasswordInput from "../validated-inputs/custom-password-input";
import CustomInput from "../validated-inputs/custom-input";
import {
  LoaderIcon,
  LockIcon,
  MailIcon,
  TriangleAlertIcon,
} from "lucide-react";
import SubmitLoader from "../loaders/submit-loader";

const SignUpInputs = () => {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<AuthSignUpSchemaType>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = (values: AuthSignUpSchemaType) => {
    setIsLoading(true);
    setError("");

    signIn("password", {
      email: values.email,
      name: values.name,
      password: values.password,
      flow: "signUp",
    })
      .then(() => {
        toast.success("sign up Successfull");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/");
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)}>
        <CustomInput
          control={form.control}
          label="Full Name"
          disabled={loading}
          name="name"
          icon={MailIcon}
          placeholder="Enter your name here"
        />

        <CustomInput
          control={form.control}
          name="email"
          label="Email"
          disabled={loading}
          placeholder="Enter Your Email"
        />
        <CustomPasswordInput
          control={form.control}
          label="Password"
          name="password"
          disabled={loading}
          placeholder="Enter Your Password"
          icon={LockIcon}
        />

        <CustomPasswordInput
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
          disabled={loading}
          icon={LockIcon}
          placeholder="Confirm Your Password"
        />
        {!!error && (
          <div className="flex  h-8 rounded-lg flex-row bg-red-500/50 items-center justify-center px-4">
            <TriangleAlertIcon className="  size-3.5" />
            <p className="p-3 rounded-lg ">{error}</p>
          </div>
        )}
        <SubmitLoader
          defaultText="Sign up"
          loadingIcon={LoaderIcon}
          loadingState={loading}
          loadingText="Signing up..."
        />
      </form>
    </Form>
  );
};

export default SignUpInputs;
