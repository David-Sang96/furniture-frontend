import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { phoneSchema } from "@/types/zod/authSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import { Icons } from "../icons";

const ForgetPasswordForm = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as { message: string };

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const onSubmit = (value: z.infer<typeof phoneSchema>) => {
    submit(value, { method: "POST", action: "." });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <Icons.logo className="h-10 w-10" aria-hidden="true" />
            </div>
            <span className="sr-only">Furniture Shop</span>
          </Link>
          <h1 className="text-xl font-bold">Reset Password</h1>
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              to={"/login"}
              className="text-primary underline underline-offset-4"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+601********"
                        required
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {actionData && (
                      <div className="text-sm font-medium text-red-600">
                        {actionData.message}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Processing..." : "Next"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
