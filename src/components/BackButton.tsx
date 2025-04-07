import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

function BackButton({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <Button
      variant={"outline"}
      asChild
      className="mb-6 mt-8"
      onClick={() => navigate(-1)}
    >
      {children}
    </Button>
  );
}

export default BackButton;
