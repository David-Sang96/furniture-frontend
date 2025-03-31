import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { passwordSchema } from "@/types/zod/authSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { Icons } from "../icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "./Password-Input";

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const submit = useSubmit();
  const navigator = useNavigation();
  const isSubmitting = navigator.state === "submitting";
  const actionData = useActionData() as { message?: string; error?: string };

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    submit(values, { method: "POST", action: "/register/confirm-password" });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md">
              <Icons.logo className="h-8 w-8" aria-hidden="true" />
            </div>
            <span className="sr-only">Confirm Password Form</span>
          </Link>
          <h1 className="text-xl font-bold">Please Insert Your Password</h1>
        </div>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confrim Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {actionData && (
                <div className="flex items-center gap-2">
                  <Link
                    to={"/register"}
                    className="text-sm hover:underline hover:underline-offset-4"
                  >
                    Go back to register
                  </Link>
                  <div className="text-sm font-medium text-red-600">
                    {actionData.message}
                  </div>
                </div>
              )}
              <div>
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                  )}
                  {isSubmitting ? "Confirming..." : "Confirm"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
