import PropTypes from 'prop-types'

import Preview from '../../../components/Preview'

function Viewer({ bucketlink}) {
  return <Preview urls={[bucketlink]}/>
}

Viewer.propTypes = {
  bucketlink: PropTypes.string,
}

export default Viewer
