import React from 'react';
import PropTypes from 'prop-types';
import { toggle } from 'uikit';

const initialState = {
  name: '',
  fakeScore: 1,
  outOf: 1,
  category: '',
};

class FakeAssignmentForm extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    categories: PropTypes.objectOf(PropTypes.object).isRequired,
    create: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name, fakeScore, outOf, category,
    } = this.state;
    const { id, create } = this.props;
    if (name && fakeScore != null && outOf != null && category) {
      create(name, fakeScore, outOf, category);
      this.setState(initialState);
      const formToggle = toggle(`#new-fake-assignment-${id}-form`);
      if (formToggle) formToggle.toggle();
    }
  }

  render() {
    const { id, categories } = this.props;
    const {
      name, fakeScore, outOf, category,
    } = this.state;
    return (
      <form id={`new-fake-assignment-${id}-form`} className="uk-margin-small-top" onSubmit={this.handleSubmit} hidden>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand@s">
            <div className="uk-inline uk-width-expand">
              <span className="uk-form-icon" data-uk-icon="tag" />
              <input className="uk-input" type="text" placeholder="Name" name="name" value={name} onChange={this.handleInputChange} required />
            </div>
          </div>
          <div>
            <div className="uk-inline">
              <span className="uk-form-icon" data-uk-icon="pencil" />
              <input className="uk-input" type="number" min={1} placeholder="Test score" name="fakeScore" value={fakeScore} onChange={this.handleInputChange} required />
            </div>
          </div>
          <div>
            <div className="uk-inline">
              <span className="uk-form-icon" data-uk-icon="paint-bucket" />
              <input className="uk-input" type="number" min={1} placeholder="Max" name="outOf" value={outOf} onChange={this.handleInputChange} required />
            </div>
          </div>
          <div>
            <div uk-form-custom="target: > * > span:first-child">
              <select name="category" value={category} onChange={this.handleInputChange} required>
                <option value="">Select category</option>
                {Object.values(categories).map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                <span />
                <span data-uk-icon="icon: chevron-down" />
              </button>
            </div>
          </div>
          <div>
            <button className="uk-button uk-button-secondary" type="submit">
              <span className="uk-margin-small-right" data-uk-icon="plus" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default FakeAssignmentForm;
