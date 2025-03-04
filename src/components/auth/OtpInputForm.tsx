import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { Icons } from "../icons";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP must be 6 characters.",
  }),
});

export function OtpInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData() as { error?: string; message?: string };

  function onSubmit(value: z.infer<typeof FormSchema>) {
    submit(value, { method: "POST", action: "/register/otp" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link to="#" className="flex flex-col gap-2 font-medium">
          <div className="h-8 w-8 rounded-md">
            <Icons.logo className="h-8 w-8" aria-hidden="true" />
          </div>
          <span className="sr-only">OTP Verify Form</span>
        </Link>
        <h1 className="text-lg font-bold">We've sent OTP to your phone.</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP - One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
                {actionData && (
                  <div>
                    <div className="text-sm font-medium text-red-600">
                      {actionData.message}
                    </div>
                    {actionData.message?.includes("expired") && (
                      <Link
                        to={"/register"}
                        className="text-sm text-primary hover:underline hover:underline-offset-4"
                      >
                        Go back to register
                      </Link>
                    )}
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <LoaderCircle className="animate-spin" />}
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
