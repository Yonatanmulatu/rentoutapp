import React from 'react';

class CartItems extends React.Component {

    render() {
        return (
            <div className="orderChosen" key={this.props.order.id}>
                <span>{this.props.order.name}</span>
                <span>
                    <input 
                        type="number"
                        value={this.props.order.qty}
                        onChange={(e) => this.props.qtyChangeHandler(this.props.order, e.target.value)} 
                        // onChange={(e) => this.qtyEditor.bind(this)}   
                    />
                </span>
                <span>{this.props.order.price} PHP</span>
                <span>{this.props.order.subTotal}</span>
          </div>
        )
    }
}

export default CartItems;