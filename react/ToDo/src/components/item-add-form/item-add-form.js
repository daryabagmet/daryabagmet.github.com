import React from "react";
import "./item-add-form.css";

export default class ItemAddForm extends React.Component {
  state = {
    label: ''
  };

  onLabelChange = (e) => {
    e.target.closest('.item-add-form').classList.remove('error');

    this.setState({
      label: e.target.value
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.label.trim() === '') {
      e.target.closest('.item-add-form').classList.add('error');
    }else {
      this.props.onAddItem(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

	render () {
    return (
			<form className="item-add-form d-flex" onSubmit={ this.onFormSubmit }>
        <input type="text" 
               placeholder="What needs to be done" 
               className="form-control" 
               onChange={ this.onLabelChange } 
               value={this.state.label}
               required/>
				<button className="btn btn-outline-secondary">
					Add Item
				</button>
			</form>
		);
  }
}
