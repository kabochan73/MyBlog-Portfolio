import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "@/app/admin/login/page";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("メールアドレス・パスワード・ログインボタンを表示する", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
  });

  it("ログイン成功時に /admin/posts へ遷移する", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    render(<LoginPage />);
    await userEvent.type(screen.getByLabelText("メールアドレス"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("パスワード"), "password");
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin/posts");
    });
  });

  it("ログイン失敗時にエラーメッセージを表示する", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    render(<LoginPage />);
    await userEvent.type(screen.getByLabelText("メールアドレス"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("パスワード"), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("メールアドレスまたはパスワードが正しくありません。")).toBeInTheDocument();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("ネットワークエラー時にエラーメッセージを表示する", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

    render(<LoginPage />);
    await userEvent.type(screen.getByLabelText("メールアドレス"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("パスワード"), "password");
    await userEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("ログインに失敗しました。")).toBeInTheDocument();
    });
  });
});
