import PropTypes from 'prop-types'
import DocViewer, { PDFRenderer } from '@cyntler/react-doc-viewer'

import '@cyntler/react-doc-viewer/dist/index.css'

export default function Preview({ urls = [] }) {
  const docs = urls.map((url) => ({ uri: url }))
  return (
      <DocViewer
        documents={docs}
        pluginRenderers={[PDFRenderer]}
        theme={{
          primary: 'rgb(109 40 217)',
          secondary: '#ffffff',
          tertiary: 'rgb(109 40 217)',
          textPrimary: '#ffffff',
          textSecondary: '#ffffff',
          textTertiary: '#ffffff',
          disableThemeScrollbar: false,
        }}
      />
  )
}

Preview.propTypes = {
  urls: PropTypes.array,
}
