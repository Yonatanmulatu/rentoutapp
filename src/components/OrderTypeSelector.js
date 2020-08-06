import React from 'react';

class OrderTypeSelector extends React.Component {
  render() {
    const options = this.props.categories.map((category,index) => {
      return (
        <option 
          key={index} 
          value={category.name}>
          {category.name}
        </option>
      );
    });
  
    return (
      <div className="OrderTypeSelector">
        <select onChange={this.props.changeCategory}>{options}</select>
      </div>
    );
  }
}

export default OrderTypeSelector;