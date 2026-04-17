import { render, screen } from "@testing-library/react";
import PostList from "@/components/PostList";
import type { Post } from "@/lib/types";

const mockPosts: Post[] = [
  {
    id: 1,
    title: "テスト記事",
    slug: "test-post",
    body: "本文",
    status: "published",
    published_at: "2024-01-15T00:00:00Z",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    tags: [{ id: 1, name: "TypeScript", slug: "typescript" }],
  },
];

describe("PostList", () => {
  it("記事がないとき「記事がありません」を表示する", () => {
    render(<PostList posts={[]} />);
    expect(screen.getByText("記事がありません。")).toBeInTheDocument();
  });

  it("記事タイトルを表示する", () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText("テスト記事")).toBeInTheDocument();
  });

  it("記事タイトルが詳細ページへのリンクになっている", () => {
    render(<PostList posts={mockPosts} />);
    const link = screen.getByRole("link", { name: "テスト記事" });
    expect(link).toHaveAttribute("href", "/posts/test-post");
  });

  it("タグを表示する", () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("公開日を表示する", () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
  });
});
