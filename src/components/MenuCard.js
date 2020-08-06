import React from 'react';
import Axios from 'axios';

class MenuCard extends React.Component {

  deleteBtn = () => {
    Axios.delete('http://localhost:8080/items/' + this.props.id)
    .then(res => console.log(res.data) ) 

}
  editBtn = () => {
    this.props.editItem(this.props.item);
}


    
  render() {

    return (
      <div className="MenuCard">
        <img src={this.props.image} alt=""/>
        <div className="MenuCardDetails">
          <h4>{this.props.name}</h4>
          <p> PHP {this.props.price}</p>
          <button id={this.props.name} className="btn" type="button" onClick={this.props.click} >Order</button>
          <button onClick={this.deleteBtn}>Delete</button>
          <button onClick={this.editBtn}>Edit</button>
        </div>
      
      </div>
    );
  }
}

export default MenuCard;