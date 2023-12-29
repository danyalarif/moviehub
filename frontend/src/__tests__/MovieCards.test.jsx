import { render, screen } from '@testing-library/react'
import Login from '../pages/Login/Index.jsx'
import { fireEvent } from "@testing-library/react";
import http from '../helpers/axiosInstance.js';
import Banner from '../components/Banner/Index.jsx';
import MovieCards from '../components/MovieCards/Index.jsx';

const moviesData = [
  {
    _id: 'abc32448',
    title: 'Avengers 2012',
    summary: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    images: ['https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg'],
    video: 'https://www.youtube.com/watch?v=eOrNdBpGMv8',
    genres: ['Action', 'Fantasy', 'Comedy'],
    duration: 200
  }, 
  {
    _id: 'abdr4848er',
    title: 'The Equalizer 3',
    summary: 'Since giving up his life as a government assassin, Robert McCall finds solace in serving justice on behalf of the oppressed. Now living in Southern Italy, he soon discovers his new friends are under the control of local crime bosses. As events turn deadly, McCall becomes their protector by taking on the mafia.',
    images: ['https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/64f1e45b8b6cdb001d26e6ae.webp', 'https://www.hollywoodreporter.com/wp-content/uploads/2023/08/MCDEQUA_SP013-H-2023.jpg?w=1296'],
    video: ['https://www.youtube.com/watch?v=19ikl8vy4zs&ab_channel=SonyPicturesEntertainment'],
    genres: ['Action', 'Thriller', 'Crime'],
    duration: 180
  }
]

const getMoviesMock = jest.fn()
getMoviesMock.mockReturnValue(moviesData)
//testing if component rendered
test('MovieCards component renders successfully', () => {
    render(<MovieCards movies={moviesData} heading={'Featured Movies'} getMovies={getMoviesMock} setCurrentPage={(inp) => inp} />)
    const element = screen.getByText(/Featured Movies/i)
    expect(element).toBeInTheDocument()
})
test('Show More button works correctly in MovieCards component', () => {
    render(<MovieCards movies={moviesData} heading={'Featured Movies'} getMovies={getMoviesMock} setCurrentPage={(inp) => inp} />)
    const element = screen.getByText(/Show More/i)
    expect(element).toBeInTheDocument()
    fireEvent.click(element)
    expect(getMoviesMock).toHaveBeenCalled()
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