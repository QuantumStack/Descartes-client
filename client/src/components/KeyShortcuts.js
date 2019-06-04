import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import { modal } from 'uikit';
import Modal from './Modal';

class KeyShortcuts extends React.PureComponent {
  static propTypes = {
    shortcuts: PropTypes.arrayOf(PropTypes.shape({
      combos: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
      callback: PropTypes.func.isRequired,
      description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
    })).isRequired,
  }

  componentDidMount() {
    const { shortcuts } = this.props;
    shortcuts.forEach(({ combos, callback }) => Mousetrap.bind(combos, callback));
    Mousetrap.bind('?', () => modal('#shortcuts-help-modal').show());
    Mousetrap.bind('?', () => modal('#shortcuts-help-modal').hide(), 'keyup');
  }

  componentWillUnmount() {
    Mousetrap.reset();
  }

  render() {
    const { shortcuts } = this.props;
    return (
      <Modal name="shortcuts-help">
        <h2 className="uk-modal-title">
          <span className="uk-text-middle">Keyboard Shortcuts</span>
          <span className="uk-margin-small-left uk-text-success" data-uk-icon="icon: bolt; ratio: 1.5" data-uk-scrollspy="cls: uk-animation-scale-up" />
        </h2>
        <p>Use these helpers to jump around without lifting your hands from the keys.</p>
        <table className="uk-table uk-table-small uk-table-hover">
          <tbody>
            {shortcuts.map(({ combos, description }) => (
              <tr>
                <td>
                  {(Array.isArray(combos) ? combos : [combos]).map(combo => (
                    <span className="uk-label uk-label-success uk-margin-small-right" style={{ textTransform: 'none' }}>{combo}</span>
                  ))}
                </td>
                <td>
                  <span className="uk-text-middle uk-text-emphasis">{description}</span>
                </td>
                <td />
                <td />
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    );
  }
}

export default KeyShortcuts;
