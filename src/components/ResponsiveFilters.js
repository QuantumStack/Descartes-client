import React from 'react';
import PropTypes from 'prop-types';

class ResponsiveFilters extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    breakpoint: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    title: '',
    breakpoint: 'm',
  }

  render() {
    const {
      id, breakpoint, title, children,
    } = this.props;
    return (
      <div>
        <div className={`uk-hidden@${breakpoint}`}>
          <div className="uk-inline">
            <button type="button" className="uk-icon-button" data-uk-icon="cog" />
            <div id={`${id}-filter-drop`} data-uk-drop="mode: click; pos: bottom-right; animation: uk-animation-slide-top-small uk-animation-fast">
              <div className="uk-card uk-card-body uk-card-default uk-card-small">
                {title && <h6 className="uk-margin-small-bottom uk-text-center uk-text-uppercase">{title}</h6>}
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className={`uk-visible@${breakpoint}`}>
          {children}
        </div>
      </div>
    );
  }
}

export default ResponsiveFilters;
