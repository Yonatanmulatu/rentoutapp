import React, { Component } from 'react';
import './App.css';
import { Layout, Navigation, Drawer, Content, Grid, Cell } from 'react-mdl';
import MenuCard from './components/MenuCard';
import OrderCart from './components/OrderCart';
import OrderTypeSelector from './components/OrderTypeSelector';
import axios from 'axios';
import AddItem from './components/AddItem'; 
import EditItem from './components/EditItem'; 
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { Route} from 'react-router-dom';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import Address from './components/Map';



class App extends Component {
  categories = [];

  items = [];

  state = {
    total: 0,
    orders: [],
    showCards: [...this.items],
    items: [],
    editItem: null,
    loginUser: JSON.parse(localStorage.getItem('userData')),
    errorMessage: '',
    categories: [],
  };

  componentDidMount() {
    axios('http://localhost:8080/items')
    .then(res => {
      this.items = res.data;
      let items = res.data;
      console.log(res.data);
      this.setState({
        showCards: items,
        items: items
      })
    });

    axios('http://localhost:8080/categories')
    .then(res => {
      this.categories = res.data;
      let categories = res.data;
      this.setState({
        categories: categories
      })
    });
  }

  addItem = newItem => {
    this.setState({
      showCards: [this.state.showCards, newItem]
    })
    axios.put('http://localhost:8080/items/' + this.props.id)
  }

  checkout = () => {
      axios.post('http://localhost:8080/orders', {
        total: this.state.total,
       orders: this.state.orders
      })
  }

  orderClicked = (orderGiven) => {
    const newOrder = {
      ...orderGiven,
    };

    const orderIndex = this.state.orders.findIndex((order) => {
      return order.id === newOrder.id;
    });

    let orders = [...this.state.orders];
    let newTotal = this.state.total + newOrder.price;

    if (orderIndex > -1) {
      orders[orderIndex].qty += 1
      let subTotal = newOrder.price * orders[orderIndex].qty;
      orders[orderIndex].subTotal = subTotal;
    } else {
      newOrder.qty = 1;
      let subTotal = newOrder.price * newOrder.qty;
      newOrder.subTotal = subTotal;
      orders = [...this.state.orders, newOrder];
    }

    this.setState({
      total: newTotal,
      orders: orders,
    });
  };

  editItem = (edited) => {
    this.setState({
      editItem: edited,
    })
  } 

  loginFn = (user) => {
    this.setState({
      loginUser: user 
    })
  }

  logoutFn = () => {
    localStorage.removeItem('userData')
    this.setState({
      loginUser: null   
    })
  }

  errorMessageFn = () => {
    this.setState({
      errorMessage: "Login failed. Try again!"
    })
  }

  updatedItem = (edited) => {
    let newItem = this.state.showCards.map((item) => {
      if( item._id === this.state.editItem._id) {
        console.log(item, this.state.editItem);
        return edited;
      }
      else {
        return item;
      }
    })
    this.setState({
      editItem: null,
      showCards: newItem
    })
  }

  changeCategory = (event) => {
    let showCards = [...this.items];
    if (event.target.value.toLowerCase() !== 'all') {
      showCards = showCards.filter(
        (card) => event.target.value === card.category
      );
    }

    this.setState({ showCards });
  };

  qtyChangeHandler = (order, qty) => {
    let newTotal = 0;
    let orders = this.state.orders.map(item => {
      if(item.id === order.id) {
        item.qty = qty
      }
      order.subTotal = order.price * order.qty
      newTotal += item.subTotal 
      return item;
    })
    this.setState({
      orders: orders,
      total: newTotal
    })
  }

  render() {

    let MenuCards = this.state.showCards.map((item) => {
      return (
        <MenuCard
          key={item._id}
          name={item.name}
          price={item.price}
          image={item.image}
          id={item._id}
          item={item}
          editItem={this.editItem}  
          click={() => this.orderClicked(item)}
        />
      )
    })

    return (
      <React.Fragment>

        <div style={{height: '300px', position: 'relative'}}>
            <Layout style={{background: 'url(https://www.pngkit.com/png/detail/253-2538420_caption-text13-hero-two-wheeler-png.png) center / cover'}}>
                <Drawer title="">
                    <Navigation>                      
                      <a href="/Home" exact>Home</a>
                      <a href="/Find">Find your wheelers</a>
                      <a href="/Register">Join here</a>
                      <a href="/Add">Add your wheelers</a>
                      <a href="/Page">My page</a>
                    </Navigation>
                </Drawer>
                <h3>Rent-out Wheelers</h3>
                <Content/>
            </Layout>
          </div>

            
          <div style={{width: '80%', margin: 'auto'}}>
          <Grid className="content-body">
            <Cell col={3}>
              <Route path='/Register' exact>
                <RegistrationForm/>
              </Route>
            </Cell>
              <Route path='/Find' exact>
            <Cell col={12} className="OrderTypeSelector">
                <OrderTypeSelector categories={this.state.categories} items={this.state.items} changeCategory={this.changeCategory}/>
            </Cell>
            <Cell col={8}>
              <Grid>
                  {MenuCards}
              </Grid>
            </Cell>
            <Cell col={4}>
                <OrderCart orders={this.state.orders} total={this.state.total} qtyChangeHandler={this.qtyChangeHandler} checkout={this.checkout}/>
            </Cell>
            <Cell>
              {/* <Address /> */}
            </Cell>
              </Route>
            <Route path='/Add' exact>
              <AddItem categories={this.categories} addItem={this.addItem}/>
            </Route>
          </Grid>
          </div>
      
        <div style={{width: '80%', margin: 'auto'}}>
          <Grid>
            <Route path='/Home' exact>
              <Cell col={6}>
                <h3>About Us</h3>
                <p>
                  Rent-out Wheelers is an online transportation platform. It is found in 2020. The platform facilitates better access for owners and renters in B2C and B2C marketing channels in their closest vicinity. It benefits daily users, travellers, and delivery businesses. 
                </p>
                </Cell>
                <Cell col={6}>
                <h3>Services</h3>
                <p>
                  The main services are helping community and companies to deliver a self-organised rental businesses with convenience and sustainability in mind. The short- and long-term areas of services supporting:
                </p>
                <ul>
                  <li>Travel</li>
                  <li>Daily usage</li>
                  <li>Delivery services</li>
                </ul>
              </Cell>
            </Route>
            
            <Route path='/Page' exact>
              <Cell col={12}>
                <h3>My page</h3>
                  {
                    this.state.errorMessage
                  }
                  {
                    (this.state.loginUser === null) ? 
                    (<div>
                        <Cell col={12}>
                          <LoginForm loginFn={this.loginFn} errorMessageFn={this.errorMessageFn}/> <RegistrationForm />
                        </Cell>
                      </div>)
                        : 
                        (
                        <div>
                              <button onClick={this.logoutFn}>Log out</button>
                          {this.state.loginUser.role === 'admin' ? 
                          <Cell col={8}>
                            <Grid>
                              <AddItem categories={this.categories} addItem={this.addItem}/>
                            </Grid>
                          </Cell>
                             : ""}
                            {
                              (this.state.editItem !== null)?
                            <Cell col={8}>
                            <Grid>
                              <EditItem categories={this.categories} editItem={this.state.editItem} editItemFunction={this.updatedItem}/>
                            </Grid>
                            </Cell> : ""}

                            <Cell col={12}>
                              <Grid>                              
                                <OrderTypeSelector
                                  categories={this.categories}
                                  changeCategory={this.changeCategory}
                                  />
                              </Grid>
                            </Cell>
                            <Grid>
                              <Cell col={8}>
                                  <Grid>
                                    {MenuCards}
                                  </Grid>
                              </Cell>
                              <Cell col={4}>
                                  <OrderCart orders={this.state.orders} total={this.state.total} qtyChangeHandler={this.qtyChangeHandler} checkout={this.checkout}/>
                              </Cell>
                            </Grid>
                            </div>                
                          )
                    }
              </Cell>
            </Route>
          </Grid>
        </div>  
      </React.Fragment>
    );
  }
}

export default App;
