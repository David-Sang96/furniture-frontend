export interface NavItem {
  title: string;
  href?: string;
  description?: string;
}
/**
 * `NavItemWithChildren` extends `NavItem` and allows for nested structures.
 * The `card` and `menu` properties are of type `NavItemWithChildren[]`, meaning
 * they can contain children of the same type as their parent. This works because
 * TypeScript supports recursive types, enabling hierarchical or tree-like structures.
 */
export interface NavItemWithChildren extends NavItem {
  card?: NavItemWithChildren[];
  menu?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithChildren;
