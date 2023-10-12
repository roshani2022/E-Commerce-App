import React, { useState, useEffect } from "react";
import OrderList from "./Component/OrderList";
import Order from "./Component/Order";

function App() {
  const [orderList, setOrderList] = useState([]);
  const [isOrder, setIsOrder] = useState(false);

  useEffect(() => {
    const loadedOrders = [];
    setOrderList(loadedOrders);
      const orderInformation = JSON.parse(localStorage.getItem("key"))
      console.log(orderInformation)
      if (orderInformation ==="newOrder") {
        setIsOrder(true);
      }
    }, []);
    const addOrderHandler = (oId, oPrice, oProduct, oCategory) => {
      const newOrder = {
        OrderId: oId,
        price: oPrice,
        product: oProduct,
        category: oCategory,
        id: Math.random().toString(),
      };
      const key = `${oId}-${oCategory}`
      
      localStorage.setItem( key,JSON.stringify(newOrder));
      const updatedList = [...orderList, newOrder];
      setOrderList(updatedList);
      setIsOrder(true);
    };  
    
    const deleteOrderHandler = (oId,oCategory) => {
     
      // Generate the key based on orderId and category
      const updatedList = orderList.filter((order) => order.id !== oId && order.category!==oCategory);
      const key = `${oId}-${oCategory}`;
      console.log(key)
      // Remove the item from localStorage using the correct key
      localStorage.removeItem(key)
     
    
      // Update the order list in the state
      
      setOrderList(updatedList);
    };
    

   
    return (
      <div className="App">
      <Order onOrder={addOrderHandler}></Order>
      {<h1>Product</h1>}
      <OrderList
        orders={orderList}
        onOrder={isOrder}
        onClick={deleteOrderHandler}
      ></OrderList>
    </div>
  );
}
export default App;