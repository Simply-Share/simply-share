import DocViewer, * as Renderer from 'react-doc-viewer'
import PropTypes from 'prop-types'

const renderer = [
    Renderer.BMPRenderer,
    Renderer.DocViewerRenderers,
    Renderer.HTMLRenderer,
    Renderer.ImageProxyRenderer,
    Renderer.JPGRenderer,
    Renderer.MSDocRenderer,
    Renderer.MSGRenderer,
    Renderer.PDFRenderer,
    Renderer.PNGRenderer,
    Renderer.TIFFRenderer,
    Renderer.TXTRenderer,
]

export default function Preview({ urls = [] }) {
  const docs = urls.map((url) => ({ uri: url }))
  return (
    <DocViewer
      style={{
        width: '100vw',
        height: '100vh',
      }}
      documents={docs}
      pluginRenderers={renderer}
    />
  )
}

Preview.propTypes = {
  urls: PropTypes.array,
}
