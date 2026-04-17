import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminHeader from "@/components/admin/AdminHeader";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

global.fetch = jest.fn().mockResolvedValue({ ok: true });

describe("AdminHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ナビゲーションリンクを表示する", () => {
    render(<AdminHeader />);
    expect(screen.getByRole("link", { name: "記事" })).toHaveAttribute("href", "/admin/posts");
    expect(screen.getByRole("link", { name: "下書き" })).toHaveAttribute("href", "/admin/posts?status=draft");
    expect(screen.getByRole("link", { name: "タグ" })).toHaveAttribute("href", "/admin/tags");
  });

  it("ログアウトボタンをクリックするとAPIを呼びログインページに遷移する", async () => {
    render(<AdminHeader />);
    await userEvent.click(screen.getByRole("button", { name: "ログアウト" }));

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/admin/logout"),
      expect.objectContaining({ method: "POST" })
    );
    expect(mockPush).toHaveBeenCalledWith("/admin/login");
  });
});
