import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comment from "@/components/Comment";
import {
  useLocale,
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

beforeEach(() => {
  localStorage.setItem("i18nextLng", "en");
});

describe("Comment component", () => {
  it("renders the login prompt when the user is not logged in", () => {
    // Mock auth.currentUser to be null
    jest.mock("firebase", () => ({
      auth: jest.fn(() => ({
        currentUser: null,
      })),
      firestore: {},
    }));
    const locale = useLocale();

    const messages = useMessages();
    const t = useTranslations();
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <Comment projectId='test-project' />
      </NextIntlClientProvider>
    );

    const loginPrompt = screen.getByText(
      "In order to command you need to Login"
    );
    expect(loginPrompt).toBeInTheDocument();
  });

  it("renders the comment form when the user is logged in", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <Comment projectId='test-project' />
      </NextIntlClientProvider>
    );

    const commentForm = screen.getByRole("form");
    expect(commentForm).toBeInTheDocument();
  });

  it("submits the comment when the form is filled and submitted", async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <Comment projectId='test-project' />
      </NextIntlClientProvider>
    );

    const commentInput = screen.getByPlaceholderText("Add a comment");
    const submitButton = screen.getByText("Comment");

    // Type a comment in the input field
    userEvent.type(commentInput, "This is a test comment");

    // Submit the form
    userEvent.click(submitButton);

    // Wait for the createComment function to be called
    await waitFor(() =>
      expect(firestore.collection().add).toHaveBeenCalledWith({
        projectId: "test-project",
        comment: "This is a test comment",
        timestamp: "mock-timestamp",
        userUid: "user-uid",
      })
    );

    // Expect the input field to be cleared after form submission
    expect(commentInput.value).toBe("");
  });

  it("disables the submit button when the comment is empty", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <Comment projectId='test-project' />
      </NextIntlClientProvider>
    );

    const commentInput = screen.getByPlaceholderText("Add a comment");
    const submitButton = screen.getByText("Comment");

    // Initially, the submit button should be disabled
    expect(submitButton).toBeDisabled();

    // Type a comment in the input field
    userEvent.type(commentInput, "This is a test comment");

    // After typing, the submit button should be enabled
    expect(submitButton).toBeEnabled();

    // Clear the comment input
    fireEvent.change(commentInput, { target: { value: "" } });

    // The submit button should be disabled again
    expect(submitButton).toBeDisabled();
  });

  it("clears the comment input and errors when the cancel button is clicked", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages} t={t}>
        <Comment projectId='test-project' />
      </NextIntlClientProvider>
    );

    const commentInput = screen.getByPlaceholderText("Add a comment");

    // Type a comment in the input field
    userEvent.type(commentInput, "This is a test comment");

    // Find the cancel button and click it
    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);

    // The comment input should be cleared
    expect(commentInput.value).toBe("");

    // The error message should be cleared
    const errorMessage = screen.queryByText("Placeholder");
    expect(errorMessage).not.toBeInTheDocument();
  });
  afterEach(() => {
    localStorage.clear();
  });
});
