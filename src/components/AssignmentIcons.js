import React from 'react';
import PropTypes from 'prop-types';

class AssignmentIcons extends React.PureComponent {
  static propTypes = {
    unpublished: PropTypes.bool,
    override: PropTypes.number,
    fakeScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
  }

  static defaultProps = {
    unpublished: false,
    override: null,
    fakeScore: null,
    description: null,
  }

  render() {
    const {
      unpublished, override, fakeScore, description,
    } = this.props;
    return (
      <span>
        {unpublished && <span className="uk-text-primary uk-margin-xsmall-right" data-uk-icon="icon: lock; ratio: 0.9" />}
        {override != null && <span className="uk-text-warning uk-margin-xsmall-right" data-uk-icon="icon: lifesaver; ratio: 0.9" />}
        {fakeScore != null && <span className="uk-text-link uk-margin-xsmall-right" data-uk-icon="icon: pencil; ratio: 0.9" />}
        <span className="uk-text-emphasis" data-uk-icon={`icon: ${description ? 'info' : 'chevron-down'}; ratio: 0.9`} />
      </span>
    );
  }
}

export default AssignmentIcons;
