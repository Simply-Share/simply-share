import React from 'react'
import ReactDOM from 'react-dom/client'
import r2wc from 'react-to-webcomponent'

import App from './App'

export default r2wc(App, React, ReactDOM, {
  props: {
    bucketlink: 'string',
    filetype: 'string',
    data: 'string',
    title: 'string',
    pageType: 'string'
  },
})
