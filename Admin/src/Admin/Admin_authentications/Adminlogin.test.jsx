import React from 'react';
import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useLocation } from 'react-router-dom';
import AdminloginPage from './Adminlogin';
import AuthProvider2 from '../../Context/AuthProvider2';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
        interceptors: {
            request: { use: jest.fn(() => 0), eject: jest.fn() },
            response: { use: jest.fn(() => 0), eject: jest.fn() },
        },
    },
}));

function CurrentLocation() {
    const location = useLocation();
    return <span data-testid="current-location">{location.pathname}</span>;
}

function renderLogin() {
    return render(
        <AuthProvider2>
            <MemoryRouter initialEntries={['/login']}>
                <AdminloginPage />
                <CurrentLocation />
            </MemoryRouter>
        </AuthProvider2>
    );
}

beforeEach(() => {
    localStorage.clear();
    global.matchMedia = global.matchMedia || jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }));
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('successful sign in stores the backend token and opens the dashboard', async () => {
    axios.post.mockResolvedValue({ data: { token: 'signed-admin-token' } });
    renderLogin();

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: '  site-admin  ' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'correct-password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
        expect(screen.getByTestId('current-location')).toHaveTextContent('/');
    });
    expect(axios.post).toHaveBeenCalledWith(
        expect.stringMatching(/\/admin\/login$/),
        { username: 'site-admin', password: 'correct-password' }
    );
    expect(JSON.parse(localStorage.getItem('Admins'))).toEqual({
        token: 'signed-admin-token',
        username: 'site-admin',
    });
});

test('failed sign in keeps the administrator on the login page and shows the backend error', async () => {
    axios.post.mockRejectedValue({
        response: { data: { message: 'Invalid username or password' } },
    });
    renderLogin();

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'site-admin' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong-password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
    expect(screen.getByTestId('current-location')).toHaveTextContent('/login');
    expect(localStorage.getItem('Admins')).toBeNull();
});
