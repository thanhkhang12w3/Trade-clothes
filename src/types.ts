export type CategoryId =
  | "ao-khoac"
  | "ao-thun-so-mi"
  | "quan-jeans"
  | "vay-dam"
  | "do-thu-dong"
  | "phu-kien";

export type Category = {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  image: string;
};

export type Item = {
  id: string;
  title: string;
  category: CategoryId;
  size: string;
  style: string;
  condition: string;
  brand: string;
  location: string;
  owner: string;
  postedAt: string;
  wishlist: string;
  description: string;
  image: string;
};

export type NewItem = Omit<Item, "id" | "owner" | "postedAt">;
