import { render, screen } from '@testing-library/react'
import MovieCard from '../components/MovieCard/Index.jsx';

const movieData = {
    _id: 'abc32448',
    title: 'Avengers 2012',
    summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    images: ['https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg'],
    video: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    genres: ['Action', 'Fantasy', 'Comedy'],
    duration: 200
}

//testing if component rendered
test('MovieCard component renders successfully', () => {
    render(<MovieCard movie={movieData} />)
    const element = screen.getByText(/Avengers 2012/i)
    expect(element).toBeInTheDocument()
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