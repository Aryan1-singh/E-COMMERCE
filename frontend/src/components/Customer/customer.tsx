import React, { useEffect, useState } from 'react';
import './customer.css';
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Customer {
  Id: number;
  fullName: string;
  address: string;
  contactDetail: number;
}



function ManageCustomer() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customer');
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  // const handleDeleteClick = async (id: number) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8000/orders/${id}`);
  //     if (response.status === 200) {
  //       setOrders(orders.filter(order => order.id !== id));
  //     }
  //   } catch (error) {
  //     console.error('Error deleting order:', error);
  //   }
  // };


  return (
    <>
      <Sidebar />

      <div className={`container-fluid `}>
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-10">
            <span >
              <h1 className='pt-5' >Manage Customer</h1> </span>
            {/* <div className="d-flex justify-content-end mt-5">

              <button className="btn btn-primary " onClick={() => navigate('/order')}
              >New Order</button>
            </div> */}
            <div className="d-flex justify-content-center mt-3">


              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact Detail</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.Id}>
                      <th scope="row">{order.Id}</th>
                      <td>{order.fullName}</td>
                      <td>{order.address}</td>
                      <td>{order.contactDetail}</td>
                      <td>
                        <button className="btn" >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCustomer;
