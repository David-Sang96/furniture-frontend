import { ReactNode } from "react";
import { Button } from "./ui/button";

function BackButton({ children }: { children: ReactNode }) {
  return (
    <Button variant={"outline"} asChild className="mb-6 mt-8">
      {children}
    </Button>
  );
}

export default BackButton;
