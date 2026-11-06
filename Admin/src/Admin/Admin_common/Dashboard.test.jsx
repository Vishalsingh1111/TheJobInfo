import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        interceptors: {
            request: { use: jest.fn(() => 0), eject: jest.fn() },
            response: { use: jest.fn(() => 0), eject: jest.fn() },
        },
    },
}));

jest.mock('../TechBlogs/TechBlogForm', () => () => null);
jest.mock('../Blogs/BlogForm', () => () => null);
jest.mock('./Showcontactmsg', () => () => null);
jest.mock('../Admin_authentications/AdminLogout', () => () => null);

import axios from 'axios';

beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    axios.get.mockResolvedValue({ data: [] });
});

afterEach(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
});

test('dashboard theme toggle applies and removes the app-wide dark theme', async () => {
    localStorage.setItem('admin-theme', 'light');
    const { container } = render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    expect(await screen.findByText('Dashboard overview')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    await waitFor(() => {
        expect(container.firstChild).toHaveClass('dark');
        expect(document.documentElement).toHaveClass('dark');
        expect(document.body).toHaveClass('dark');
    });
    expect(localStorage.getItem('admin-theme')).toBe('dark');

    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    await waitFor(() => {
        expect(container.firstChild).not.toHaveClass('dark');
        expect(document.documentElement).not.toHaveClass('dark');
        expect(document.body).not.toHaveClass('dark');
    });
    expect(localStorage.getItem('admin-theme')).toBe('light');
});

test('dashboard shows todays visitor count and recent daily totals', async () => {
    const today = new Date().toISOString().slice(0, 10);
    axios.get.mockImplementation((url) => Promise.resolve({
        data: url.endsWith('/admin/visitors')
            ? { dailyVisitors: [{ date: today, count: 12 }, { date: '2026-11-05', count: 8 }] }
            : [],
    }));

    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    );

    expect(await screen.findAllByText('12')).toHaveLength(2);
    expect(screen.getByText('Daily Visitors')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
});
