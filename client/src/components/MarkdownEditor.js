import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import converter from '../util/markdown';

class MarkdownEditor extends React.PureComponent {
  render() {
    return (
      <SimpleMDE {...this.props} previewRender={converter.makeHtml} />
    );
  }
}

export default MarkdownEditor;
