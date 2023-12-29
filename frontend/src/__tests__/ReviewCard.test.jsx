import {
  fireEvent,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import MovieCard from "../components/MovieCard/Index.jsx";
import Reviews from "../components/Reviews/Index.jsx";
import http from "../helpers/axiosInstance.js";
import ReviewCard from "../components/ReviewCard/Index.jsx";

const review = {
  _id: 'rijeaworj123',
  description: "This movie is awesome",
  stars: 4,
  user: {
    firstName: "Danyal",
    lastName: "Arif",
  },
  createdAt: "2021-09-01T12:00:00.000Z",
};
const mockHandleEditReview = jest.fn();
const mockHandleDeleteReview = jest.fn();
//testing if component rendered
test("ReviewCard component renders and fetches reviews successfully", () => {
  render(<ReviewCard review={review} handleEditReview={mockHandleDeleteReview} handleDeleteReview={mockHandleDeleteReview} />);
  const element = screen.getByText(/This movie is awesome/i);
  expect(element).toBeInTheDocument();
});
test('Edit Review button works correctly in ReviewCard component', async () => {
    render(<ReviewCard review={review} handleEditReview={mockHandleDeleteReview} handleDeleteReview={mockHandleDeleteReview} />)
    const editButton = screen.getByTestId('edit-icon')
    expect(editButton).toBeInTheDocument()
    const res = fireEvent.click(editButton)
    waitFor(() => expect(mockHandleEditReview).toHaveBeenCalled())
})
test('Delete Review button works correctly in ReviewCard component', async () => {
    render(<ReviewCard review={review} handleEditReview={mockHandleDeleteReview} handleDeleteReview={mockHandleDeleteReview} />)
    const deleteButton = screen.getByTestId('delete-icon')
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    waitFor(() => expect(mockHandleDeleteReview).toHaveBeenCalled())
})
//mocks
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
  Link: "Link",
  Route: ({ children, path }) => children({ match: path === "/auth/login" }),
}));

jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({
      user: { _id: "29rewr9qq", firstName: "Danyal", lastName: "Arif" },
    }),
  };
});
