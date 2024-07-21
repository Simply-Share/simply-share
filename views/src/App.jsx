import PropTypes from 'prop-types'

import NotFound from './Containers/404'
import List from './Containers/List'
import Viewer from './Containers/Viewer'
import { PAGE_TYPES } from './constants'

import './index.css'

function App(props) {
  let { bucketlink, data = null } = props
  if (data) {
    data = JSON.parse(decodeURIComponent(data))
  }

  switch (data.pageType) {
    case PAGE_TYPES[404]:
      return <NotFound />
    case PAGE_TYPES.LIST:
      return <List urls={bucketlink} data={data} />
    case PAGE_TYPES.VIEWER:
      return <Viewer bucketlink={bucketlink} />
    default:
      return <NotFound />
  }
}

App.propTypes = {
  bucketlink: PropTypes.string,
  filetype: PropTypes.string,
  data: PropTypes.string,
}

export default App
