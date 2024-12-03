import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";
import { Icons } from "../icons";
import { NewsLetterForm } from "../news-letter";

const Footer = () => {
  return (
    <footer className="w-full border-t max-lg:pl-4">
      <div className="container mx-auto pb-8 pt-6">
        <section className="flex flex-col justify-between gap-10 lg:gap-x-28 xl:flex-row">
          <section>
            <Link to={"/"} className="flex items-center gap-2">
              <Icons.logo className="size-6" aria-hidden="true" />
              <span className="font-bold 2xl:text-lg">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-14 2xl:gap-20">
            {siteConfig.footerNav.map((footerItem) => (
              <div className="space-y-3" key={footerItem.title}>
                <h4 className="font-medium 2xl:text-lg">{footerItem.title}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground 2xl:text-base">
                  {footerItem.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        to={item.href}
                        target={item.external ? "_blank" : undefined}
                        className="hover:text-foreground"
                      >
                        {item.title}
                        <span className="sr-only">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section className="flex-1 space-y-3">
            <h4 className="font-medium 2xl:text-lg">
              Subscribe to our newsletter
            </h4>
            <NewsLetterForm />
          </section>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
