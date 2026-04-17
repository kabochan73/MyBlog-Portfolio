export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  body: string;
  status: "published" | "draft";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: Tag[];
};
