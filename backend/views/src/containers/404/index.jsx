import { APP_URL } from '../../constants'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-violet-700'>404</h1>
        <p className='text-2xl font-medium text-gray-900 mt-4'>
          Page Not Found
        </p>
        <p className='text-gray-700 mt-2'>{`Sorry, the page you're looking for doesn't exist.`}</p>
        <a
          href={APP_URL}
          className='mt-6 rounded-md inline-block px-5 py-3 bg-violet-700 text-white text-sm font-medium hover:bg-violet-800'>
          Try Simply Share
        </a>
      </div>
    </div>
  )
}

export default NotFound
