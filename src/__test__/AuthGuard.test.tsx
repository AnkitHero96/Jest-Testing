import { render, screen, waitFor, act } from '@testing-library/react';
import { auth } from '../components/component/utils/firebase';
import AuthGuard from '../components/component/utils/AuthGuard';
import { Navigate } from 'react-router-dom';

// Mock Firebase auth
jest.mock('../components/component/utils/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

// Mock Navigate from react-router-dom
jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(() => null),
}));

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to login page if not authenticated', async () => {
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(null);
    });

    await act(async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );
    });

    await waitFor(() => {
      // Check if Navigate component was called with the expected props
      expect(Navigate).toHaveBeenCalledWith({ to: '/Login_Page' }, {});
    });
  });

  it('should render children if authenticated', async () => {
    const mockUser = { uid: '12345' };
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(mockUser);
    });

    await act(async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );
    });

    await waitFor(() => {
      // Check if the text 'Protected Content' is present in the document
      expect(screen.getByText('Protected Content')).not.toBeNull();
    });
  });
});
