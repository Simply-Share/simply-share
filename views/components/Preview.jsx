import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import PropTypes from 'prop-types'

export default function Preview({ urls = [] }) {
  const docs = urls.map((url) => ({ uri: url }))
  return (
    <DocViewer
      style={{
        width: '100vw',
        height: '100vh',
      }}
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    />
  )
}

Preview.propTypes = {
  urls: PropTypes.array,
}
