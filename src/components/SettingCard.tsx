import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface SettingCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function SettingCard({ children }: SettingCardProps) {
  return (
    <Card className="mx-auto max-w-[700px]">
      <CardHeader>
        <CardTitle>Profile </CardTitle>
        <CardDescription>View your profile details down here</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
