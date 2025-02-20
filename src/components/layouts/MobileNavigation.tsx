import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Icons } from "../icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";

interface MobileNavigationProps {
  items?: MainNavItem[];
}

const MobileNavigation = ({ items }: MobileNavigationProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const query = "(min-width: 1024px)";

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };
    const result = matchMedia(query);
    result.addEventListener("change", onChange);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  if (isDesktop) return null;

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"icon"} className="ml-4 size-5">
            <Icons.menu aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-9">
          <SheetClose asChild>
            <Link to={"/"} className="flex items-center gap-2">
              <Icons.logo className="size-4" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{items?.[0].title}</AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2 pl-2">
                  {items?.[0].card?.map((item) => (
                    <SheetClose key={item.title} asChild>
                      <Link
                        to={item.href as string}
                        className="text-foreground/70"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4 flex flex-col space-y-2">
              {items?.[0].menu?.map((item) => (
                <SheetClose key={item.title} asChild>
                  <Link to={item.href as string}>{item.title}</Link>
                </SheetClose>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
