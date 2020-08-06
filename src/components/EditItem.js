import React from 'react';
import Axios from 'axios';

class AddItem extends React.Component {
  state = {
    name: this.props.editItem.name,
    price: this.props.editItem.price,
    category: this.props.editItem.category,
    image: this.props.editItem.image,
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editBtn = () => {
    let editItem = {
        _id: this.props.editItem._id,
        name: this.state.name,
        price: this.state.price*1,
        category: this.state.category,
        image: this.state.image
      }
    Axios.put('http://localhost:8080/items/' + this.props.editItem._id, editItem)
    .then(res => {
        this.props.editItemFunction(editItem);
      })
  }

  displayCategories = this.props.categories.map(cat => {
    return(
      <option key={cat.name}>{cat.name}</option>
    );
  });
  render() {
      
    return (
        <div>
          Name: 
          <input 
            type="text" 
            name="name" 
            onChange={this.inputChangeHandler}
            value={this.state.name}
            /><br/>
          Price: 
          <input 
            type="number" 
            name="price" 
            min="0" 
            onChange={this.inputChangeHandler}
            value={this.state.price}
          /><br/>
          Category:
          <select name="category" onChange={this.inputChangeHandler}>
             <option>
               ...Select One...
             </option>
             {this.categoryOptions}
          </select><br/>
          Image:
          <input 
            type="text" 
            name="image" 
            onChange={this.inputChangeHandler}
            value={this.state.image}
          /><br/>
          <button onClick={this.editBtn}>Edit</button>
        </div>
        );
    }
}


export default AddItem;
