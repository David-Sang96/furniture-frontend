export const siteConfig = {
  name: "Furniture Shop",
  description: "A Furniture Shop build with react router.",
  mainNav: [
    {
      title: "Products",
      card: [
        {
          title: "Wooden",
          href: "/products/wooden",
          description: "comfortable with wooden furniture.",
        },
        {
          title: "Bamboo",
          href: "/products/bamboo",
          description: "Build your own bamboo furniture.",
        },
        {
          title: "Metal",
          href: "/products/metal",
          description: "Buy our latest metal furniture.",
        },
      ],
      menu: [
        {
          title: "Services",
          href: "services",
        },
        {
          title: "Blog",
          href: "blog",
        },
        {
          title: "About Us",
          href: "about",
        },
      ],
    },
  ],
};
