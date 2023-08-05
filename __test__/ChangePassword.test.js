import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChangePassword from "@/components/ChangePassword";
import {
  useLocale,
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

beforeEach(() => {
  localStorage.setItem("i18nextLng", "en");
});

describe("ChangePassword component", () => {
  // Mocking the next-intl useTranslations hook
  jest.mock("next-intl", () => ({
    useTranslations: () => (key) => key, // Return the key as the translation
  }));

  it("renders the form inputs correctly", () => {
    const locale = useLocale();

    const messages = useMessages();
    const t = useTranslations();
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ChangePassword />
      </NextIntlClientProvider>
    );

    // Input fields are present
    expect(screen.getByPlaceholderText("current_password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("new_password")).toBeInTheDocument();

    // Show password icons are present
    expect(screen.getByTestId("showPasswordIcon")).toBeInTheDocument();
    expect(screen.getByTestId("showRepeatPasswordIcon")).toBeInTheDocument();

    // Submit button is present
    expect(screen.getByText("change_password")).toBeInTheDocument();
  });

  it("shows validation errors for empty form submission", async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <ChangePassword />
      </NextIntlClientProvider>
    );

    // Submit the form without filling any inputs
    fireEvent.click(screen.getByText("change_password"));

    // Validate error messages are displayed
    await waitFor(() => {
      expect(screen.getByText("password_required")).toBeInTheDocument();
      expect(screen.getByText("password_min_length")).toBeInTheDocument();
    });
  });

  it("shows validation error for same current and new password", async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <ChangePassword />
      </NextIntlClientProvider>
    );

    // Fill the form with valid data but set current and new password same
    fireEvent.change(screen.getByPlaceholderText("current_password"), {
      target: { value: "current123" },
    });
    fireEvent.change(screen.getByPlaceholderText("new_password"), {
      target: { value: "current123" },
    });

    fireEvent.click(screen.getByText("change_password"));

    // Validate error message is displayed
    await waitFor(() => {
      expect(screen.getByText("password_same")).toBeInTheDocument();
    });
  });

  it("clears form after successful submission", async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <ChangePassword />
      </NextIntlClientProvider>
    );

    // Fill the form with valid data
    fireEvent.change(screen.getByPlaceholderText("current_password"), {
      target: { value: "current123" },
    });
    fireEvent.change(screen.getByPlaceholderText("new_password"), {
      target: { value: "new123" },
    });

    fireEvent.click(screen.getByText("change_password"));

    // Validate form is cleared
    await waitFor(() => {
      expect(screen.getByPlaceholderText("current_password").value).toBe("");
      expect(screen.getByPlaceholderText("new_password").value).toBe("");
    });
  });

  // Add more tests here as needed for other scenarios
  afterEach(() => {
    localStorage.clear();
  });
});
