import { render, screen } from '@testing-library/react'
import Register from '../pages/Register/Index.jsx'
import userEvent from '@testing-library/user-event'
import { fireEvent } from "@testing-library/react";
import http from '../helpers/axiosInstance.js';

const registerData = {
  firstName: 'Danyal',
  lastName: 'Ariff',
  email: 'danyalarif456@gmail.com',
  password: 'DanyalArif@123',
  confirmPassword: 'DanyalArif@123'
}

//testing if component rendered
test('Register component renders successfully', () => {
    render(<Register />)
    const element = screen.getByText(/Register/i)
    expect(element).toBeInTheDocument()
})
//passing input data
test('Registering a user', async () => {
    render(<Register />)
    const firstName = screen.getByLabelText(/First Name/i)
    const lastName = screen.getByLabelText(/Last Name/i)
    const email = screen.getByLabelText(/Email/i)
    const passwords = screen.getAllByLabelText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Register/i })
    //assigning values to the input fields
    fireEvent.input(firstName, {target: {value: registerData.firstName}});
    fireEvent.input(lastName, {target: {value: registerData.lastName}});
    fireEvent.input(email, {target: {value: registerData.email}});
    fireEvent.input(passwords[0], {target: {value: registerData.password}});
    fireEvent.input(passwords[1], {target: {value: registerData.confirmPassword}});
    //verifying whether the values are assigned to the input fields
    expect(firstName).toHaveDisplayValue(registerData.firstName)
    expect(lastName).toHaveDisplayValue(registerData.lastName)
    expect(email).toHaveDisplayValue(registerData.email)
    expect(passwords[0]).toHaveDisplayValue(registerData.password)
    expect(passwords[1]).toHaveDisplayValue(registerData.confirmPassword)
    http.post = jest.fn().mockResolvedValue(registerData);
    const res = fireEvent.click(submitButton)
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