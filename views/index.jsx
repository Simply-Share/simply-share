import React from 'react'

import { PAGE_TYPES } from '../common/constants/frontend.js'
import { Viewer, List, NotFound } from './pages/index.js'

function App({ pageType = PAGE_TYPES[404], ...props }) {
  let component = null

  switch (pageType) {
    case PAGE_TYPES.VIEWER:
      component = <Viewer {...props} />
      break
    case PAGE_TYPES.LIST:
      component = <List {...props} />
      break
    default:
      component = <NotFound {...props} />
      break
  }

  return (
    <html>
      <head></head>
      <body>{component}</body>
    </html>
  )
}

module.exports = App
