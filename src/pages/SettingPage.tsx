import { PasswordInput } from "@/components/auth/Password-Input";
import { SettingCard } from "@/components/SettingCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthStore from "@/store/authStore";
import { updatePasswordSchema } from "@/types/zod/authSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const SettingPage = () => {
  const getUser = useAuthStore((store) => store.user);
  const submit = useSubmit();
  const navigate = useNavigation();
  const actionData = useActionData() as { message: string };
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isSubmitting = navigate.state === "submitting";

  const onSubmit = (values: z.infer<typeof updatePasswordSchema>) => {
    submit(values, { method: "POST", action: "/setting" });
  };

  useEffect(() => {
    if (!actionData) return;
    if (actionData.message) toast.success(actionData.message);
  }, [actionData]);

  return (
    <section className="mt-4 max-sm:mb-20">
      <SettingCard>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">Your account details</h3>
            {getUser && (
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>First Name -</span>
                  <div>{getUser.firstName}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Last Name -</span>
                  <div>{getUser.lastName}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Phone -</span>
                  <div>{"01" + getUser.phone}</div>
                </div>
              </div>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Update Password</Button>
            </DialogTrigger>
            <DialogContent className="mx-auto max-sm:w-[95%] md:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Password</DialogTitle>
                <DialogDescription>
                  Update your password here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <PasswordInput required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <PasswordInput required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <PasswordInput required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting && (
                        <LoaderCircle
                          className="animate-spin"
                          aria-hidden="true"
                        />
                      )}
                      {isSubmitting ? "Saving..." : "Save Password"}
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SettingCard>
    </section>
  );
};

export default SettingPage;
