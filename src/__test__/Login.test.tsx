import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock the specific function from firebase/auth
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock the Navbar component
jest.mock("../components/layout/Navbar", () => () => <div>Mocked Navbar</div>);

const setup = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

const fillForm = (email: string, password: string) => {
  fireEvent.change(screen.getByLabelText(/User name/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: password },
  });
};

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log to verify error handling
  });

  it("renders the login form", () => {
    setup();

    // Check if the input fields and buttons are rendered
    expect(screen.getByLabelText(/User name/i)).not.toBeNull();
    expect(screen.getByLabelText(/Password/i)).not.toBeNull();
    expect(screen.getByRole("button", { name: /Submit/i })).not.toBeNull();
    expect(screen.getByText(/Register Here/i)).not.toBeNull();
  });

  it("handles form submission with correct credentials", async () => {
    const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
    mockSignIn.mockResolvedValueOnce({
      user: { email: "test@example.com" },
    } as any);

    setup();
    fillForm("test@example.com", "password123");

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Expect the signInWithEmailAndPassword function to have been called with correct arguments
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(expect.anything(), "test@example.com", "password123");
    });

    expect(console.log).toHaveBeenCalledWith("Log in Sucessfull");
  });

  it("displays an error message when sign-in fails", async () => {
    const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
    const mockError = new Error("Invalid credentials");
    mockSignIn.mockRejectedValueOnce(mockError);

    setup();
    fillForm("wrong@example.com", "wrongpassword");

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(mockError.message);
    });
  });
});
