import React from 'react';
import CartItems from './CartItems';


class OrderCart extends React.Component {
  render () {
    let items =  null;
    let itemTotal = null;

    if (this.props.orders.length > 0) {
      items = this.props.orders.map(order => {
        return (
          <CartItems key={order.id} order={order} qtyChangeHandler={this.props.qtyChangeHandler}/>
        );
      });

      itemTotal = (
        <div>
          <hr />
          <div className="orderTotal">
            Total: <span>{this.props.total} PHP</span>
          </div>
        </div>
      );

    }

    return (
      <div className="OrderCart">
        <h2>Cart</h2>
        <div className="orders">{items}
        </div>
        <div>
          {itemTotal}
        </div>
        <div>
          <button onClick={this.props.checkout}>Checkout</button>
        </div>
      </div>
    );

  }
}

export default OrderCart;