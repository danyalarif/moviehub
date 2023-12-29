import { fireEvent, queryByText, render, screen, waitFor } from '@testing-library/react'
import MovieCard from '../components/MovieCard/Index.jsx';
import Reviews from '../components/Reviews/Index.jsx';
import http from '../helpers/axiosInstance.js';

const movieData = {
    _id: 'abc32448',
    title: 'Avengers 2012',
    summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    images: ['https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg'],
    video: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    genres: ['Action', 'Fantasy', 'Comedy'],
    duration: 200
}
const reviews = [
    {
        description: 'This movie is awesome',
        stars: 4,
        user: {
            firstName: 'Danyal',
            lastName: 'Arif'
        },
        createdAt: '2021-09-01T12:00:00.000Z',
    },
    {
        description: 'This movie is mid',
        stars: 3,
        user: {
            firstName: 'Ali',
            lastName: 'Khan'
        },
        createdAt: '2021-11-01T12:00:00.000Z',
    }
]
beforeAll(() => {
    http.get = jest.fn().mockResolvedValue(reviews)
})
//testing if component rendered
test('Reviews component renders and fetches reviews successfully', () => {
    render(<Reviews movie={movieData} />)
    expect(http.get).toHaveBeenCalled()
})
test('Add Review button works correctly in Reviews component', async () => {
    render(<Reviews movie={movieData} />)
    const addButton = screen.getByRole('button', { name: /Add Review/i })
    fireEvent.click(addButton)
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
      useContext: () => ({user: {_id: '29rewr9qq', firstName: 'Danyal', lastName: 'Arif' }})
    }
})