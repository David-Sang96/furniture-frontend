import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import { Form, Link } from "react-router";
import { Icons } from "../icons";
import { Button } from "../ui/button";

interface AuthDropDownProps {
  user: User;
}

function AuthDropDown({ user }: AuthDropDownProps) {
  if (!user)
    return (
      <Button asChild size={"sm"}>
        <Link to={"/sign-in"}>Sign In</Link>
        <span className="sr-only">Sign In</span>
      </Button>
    );

  const initialName = `${user.firstName.charAt(0) ?? ""} ${user.lastName.charAt(0) ?? ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user.imageUrl} alt={initialName} />
            <AvatarFallback>{initialName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={"#"} className="cursor-pointer">
              <Icons.dashBoard className="r mr-2 size-4" aria-hidden="true" />
              Dashboard
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={"#"} className="cursor-pointer">
              <Icons.gear className="r mr-2 size-4" aria-hidden="true" />
              Setting
              <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* <Link to={"/logout"} className="cursor-pointer">
            <Icons.exit className="r mr-2 size-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
          </Link> */}
          <Form method="POST" action="/logout">
            <Button
              type="submit"
              variant={"ghost"}
              className="w-full p-0 font-normal hover:bg-transparent"
            >
              <Icons.exit className="r mr-2 size-4" aria-hidden="true" />
              Log out
              <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
            </Button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthDropDown;
