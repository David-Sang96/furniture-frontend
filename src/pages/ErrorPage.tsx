import { Icons } from "@/components/icons";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="my-32 flex grow items-center justify-center">
        <Card className="w-[350px] md:w-[500px]">
          <CardHeader className="flex place-items-center gap-2">
            <div className="mb-4 mt-2 grid size-24 place-items-center rounded-full border border-dashed border-muted-foreground/70">
              <Icons.exclamation
                className="size-10 text-muted-foreground/70"
                aria-hidden="true"
              />
            </div>
            <CardTitle>Oops!</CardTitle>
            <CardDescription>
              An error occurs! This page could not be found.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to={"/"}>Go Back Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Error;
