import PropTypes from 'prop-types'

import Preview from '../components/Preview'
import './App.css'

function App(props) {
  return (
    <>
      <Preview urls={props.bucketlink ? [props.bucketlink] : []} />
    </>
  )
}

App.propTypes = {
  bucketlink: PropTypes.string,
}

export default App
