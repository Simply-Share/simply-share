import PropTypes from 'prop-types'

import Preview from '../components/Preview'
import './App.css'

function App(props) {
  console.log('App props:', props)
  return (
    <>
      <Preview urls={props.bucketlink ? [props.bucketlink] : ['https://cdn.hitenvats.one/eruva/1_hitenvats16@gmail.com/sweet-boring-shampoo/Resume_hiten.pdf']} />
    </>
  )
}

App.propTypes = {
  bucketlink: PropTypes.string,
}

export default App
