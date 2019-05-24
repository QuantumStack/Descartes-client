import React from 'react';
import ReactMde from 'react-mde';
import { Converter } from 'showdown';
import xssFilter from 'showdown-xss-filter';
import 'react-mde/lib/styles/css/react-mde-all.css';

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.tab || 'write',
    };
    this.converter = new Converter({
      tables: true,
      noHeaderId: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      extensions: [ xssFilter ],
    });
    this.handleTabChange = this.handleTabChange.bind(this);
    this.generatePreview = this.generatePreview.bind(this);
  }

  handleTabChange(tab) {
    this.setState({ tab });
  }

  generatePreview(md) {
    console.log(md);
    console.log(this.converter.makeHtml(md));
    return Promise.resolve(this.converter.makeHtml(md));
  }

  render() {
    return (
      <ReactMde {...this.props} selectedTab={this.state.tab} onTabChange={this.handleTabChange} generateMarkdownPreview={this.generatePreview} />
    );
  }
}

export default MarkdownEditor;
