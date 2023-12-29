import { render, screen } from '@testing-library/react'
import Login from '../pages/Login/Index.jsx'
import { fireEvent } from "@testing-library/react";
import http from '../helpers/axiosInstance.js';

const loginData = {
  email: 'danial.arif417@gmail.com',
  password: 'Danyal@123',
}

//testing if component rendered
test('Login component renders successfully', () => {
    render(<Login />)
    const element = screen.getByText(/Login/i)
    expect(element).toBeInTheDocument()
})
//passing input data
test('Login with a user', async () => {
    render(<Login />)
    const email = screen.getByLabelText(/Email/i)
    const password = screen.getByLabelText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })
    //assigning values to the input fields
    fireEvent.input(email, {target: {value: loginData.email}});
    fireEvent.input(password, {target: {value: loginData.password}});
    //verifying whether the values are assigned to the input fields
    expect(email).toHaveDisplayValue(loginData.email)
    expect(password).toHaveDisplayValue(loginData.password)
    http.post = jest.fn().mockResolvedValue(loginData);
    fireEvent.click(submitButton)
    expect(http.post).toHaveBeenCalled()
})

//mocks
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
  Link: 'Link',
  Route: ({ children, path }) => children({ match: path === '/auth/login' })

}));

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react')
    return {
      ...ActualReact,
      useContext: () => ({ }), // what you want to return when useContext get fired goes here
    }
})