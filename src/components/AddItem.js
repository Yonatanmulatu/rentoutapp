import React from 'react';
import Axios from 'axios';

class AddItem extends React.Component {
  state = {
    name: '',
    price: 0,
    category: '',
    image: ''
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitClickHandler = () => {
    let newItem = {
      name: this.state.name,
      price: this.state.price*1,
      category: this.state.category,
      image: this.state.image
    }
    Axios.post('http://localhost:8080/items', newItem)
    .then(res => {
      this.props.addItem(res.data);
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
             {
               this.props.categories.map((category) => {
                 return <option>{category.name}</option>
               }) 
             }
          </select><br/>
          Image:
          <input 
            type="text" 
            name="image" 
            onChange={this.inputChangeHandler}
            value={this.state.image}
          /><br/>
          <button onClick={this.submitClickHandler}>Submit</button>
        </div>
        );
    }
}


export default AddItem;
