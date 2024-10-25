import { SetStateAction, useEffect, useState } from 'react';
import "./order.css";
import Sidebar from '../Sidebar/sidebar';
import Popup from '../Popup/popup';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/paagination';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

interface OrderItem {
  orderId: number;
  productName: string;
  quantity: number;
  price: number;
}


interface Customer {
  Id: number;
  fullName: string;
}

const products = [
  { name: 'Earbuds', price: 800 },
  { name: 'Mouse', price: 250 },
  { name: 'Phone Cover', price: 120 },
  { name: 'Buds Cover', price: 90 },
  { name: 'Smart Watch', price: 999 },
];


function Order() {
  const Base_Url = 'http://localhost:8000/';

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState({ productName: '', quantity: 0, price: 0 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]); // Set type for customers
  const [selectedCustomer, setSelectedCustomer] = useState('');


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  useEffect(() => {
    const calculateTotals = () => {
      const totalQty = tableData.reduce((sum, item) => sum + item.quantity, 0);
      const totalPr = tableData.reduce((sum, item) => sum + item.price, 0);

      setTotalQuantity(totalQty);
      setTotalPrice(totalPr);
    };

    calculateTotals();
  }, [tableData]);
  




  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(e.target.value);
  };

  const handleAddClick = () => {
    setPopupTitle('Add Order');
    setFormData({ productName: '', quantity: 0, price: 0 });
    setSelectedItem(null);
    setIsPopupOpen(true);
  };

  const handleEditClick = (item: OrderItem) => {
    setPopupTitle('Edit Order');
    setFormData({ productName: item.productName, quantity: item.quantity, price: item.price });
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = (item: OrderItem) => {
    setTableData((prevTableData) => prevTableData.filter((data) => data.orderId !== item.orderId));
    setTotalQuantity((prevTotal) => prevTotal - item.quantity);
    setTotalPrice((prevTotal) => prevTotal - item.price);
  };



  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };


  const handleSaveClick = () => {
    if (!formData.productName || !formData.quantity || !formData.price) {
      toast.error("Please fill in all fields");
      return;
    }

    const newOrder: OrderItem = {
      orderId: Date.now(),
      productName: formData.productName,
      quantity: formData.quantity,
      price: formData.price
    };

    setTableData((prev) => [...prev, newOrder]);
    setTotalQuantity((prev) => prev + formData.quantity);
    setTotalPrice((prev) => prev + formData.price);

    setFormData({ productName: '', quantity: 0, price: 0 });

    toast.success("Order saved successfully!");
    setIsPopupOpen(false);
  };

  const handleSaveOrderClick = async () => {
    if (!selectedCustomer || totalQuantity === 0 || totalPrice === 0) {
      toast.error("Please ensure that a customer is selected and totals are not zero");
      return;
    }
    const selectedCustomerObj = customers.find(customer => customer.fullName === selectedCustomer);
    if (!selectedCustomerObj) {
      toast.error("Selected customer not found");
      return;
    }
    try {
      const orderIds = [];

      for (const orderItem of tableData) {
        const response = await axios.post(`${Base_Url}product`, {
          customerId: selectedCustomerObj.Id,
          productName: orderItem.productName,
          quantity: orderItem.quantity,
          price: orderItem.price
        });

        if (response.data && response.data.orderId) {
          orderIds.push(response.data.orderId);
        } else {
          toast.error("Failed to save order item");
        }
      }

      if (orderIds.length === 0) {
        return;
      }

      const overallResponse = await axios.post(`${Base_Url}orders`, {
        customerId: selectedCustomerObj.Id,
        orderId: orderIds[orderIds.length - 1],
        customerName: selectedCustomerObj.fullName,
        totalQuantity,
        totalPrice
      });

      if (overallResponse.data) {
        toast.success("Order saved successfully!");
        setTableData([]);
        setTotalQuantity(0);
        setTotalPrice(0);

        navigate('/dashboard');
      } else {
        toast.error("Failed to save order");
      }
    } catch (error) {
      toast.error("An error occurred while saving the order");
      console.error(error);
    }
  };


  const handleUpdateClick = async () => {
    if (!formData.productName || !formData.quantity || !formData.price) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (selectedItem) {
        const response = await axios.put(`${Base_Url}product/${selectedItem.orderId}`, {
          productName: formData.productName,
          quantity: formData.quantity,
          price: formData.price,
        });

        if (response.data) {
          setTableData((prev) =>
            prev.map((item) =>
              item.orderId === selectedItem.orderId
                ? { ...item, productName: formData.productName, quantity: formData.quantity, price: formData.price }
                : item
            )
          );
          const quantityDifference = formData.quantity - (selectedItem.quantity || 0);
          const priceDifference = formData.price - (selectedItem.price || 0);

          setTotalQuantity((prev) => prev + quantityDifference);
          setTotalPrice((prev) => prev + priceDifference);

          toast.success("Order updated successfully!");
          setIsPopupOpen(false);
        } else {
          toast.error("Failed to update order");
        }
      }
    } catch (error) {
      toast.error("An error occurred while updating the order");
      console.error(error);
    }
  };


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityChange = (e: { target: { value: any; }; }) => {
    const quantity = e.target.value;
    const product = products.find(product => product.name === formData.productName);
    
    setFormData((prev) => ({
      ...prev,
      quantity: quantity,
      price: product ? product.price * quantity : 0, // Update price based on new quantity
    }));
  };


  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  const handleProductChange = (e: { target: { value: any; }; }) => {
    const selectedProduct = e.target.value;
    const product = products.find(product => product.name === selectedProduct);
  
    setFormData((prev) => ({
      ...prev,
      productName: selectedProduct,
      price: product ? product.price * prev.quantity : 0, // Update price based on quantity
    }));
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="ps-4 borderTable">
          <div className='d-flex  align-items-center'>
            <i className="bi bi-arrow-left backicon" onClick={() => navigate('/dashboard')}></i>
            <span className='order'>Order</span>
          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Customer Name
            <select
              id="customerDropdown"
              value={selectedCustomer}
              onChange={handleCustomerChange}
              className='ms-auto me-4 mt-2'
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.Id} value={customer.fullName}>
                  {customer.fullName}
                </option>
              ))}
            </select>

          </div>
          <div className='heading d-flex justify-content-between align-items-center '>
            Total Quantity
            <input type="text" className='ms-auto me-4 mt-2' readOnly value={totalQuantity} />

          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Total Amount
            <input type="text" className='ms-auto me-4 mt-2 borderradius-2' readOnly value={totalPrice} />

          </div>

          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-primary ms-auto me-4" onClick={handleAddClick}>Add</button>
          </div>
          <table className="table table-bordered mt-2 ">
            <thead>
              <tr>
                {/* <th scope="col">Id</th> */}
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.orderId}>
                  {/* <th scope="row">{item.orderId}</th> */}
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn " onClick={() => handleEditClick(item)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn " onClick={() => handleDeleteClick(item)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={tableData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className="d-flex">
            <button className="btn btn-primary ms-auto me-4" onClick={handleSaveOrderClick}>
              Save
            </button>
          </div>

        </div>
      </div>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title={popupTitle}>
        <div className="mb-3">
          <label htmlFor=""> Product Name</label>
          {/* <input
            type="text"
            name="productName"
            className="form-control mb-2 mt-2"
            value={formData.productName}
            onChange={handleInputChange}
          /> */}

          <select
            name="productName"
            className="productDropdown mb-2 mt-2"
            onChange={handleProductChange}
            value={formData.productName}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <label htmlFor=""> Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control mb-2 mt-2"
            value={formData.quantity}
            onChange={handleQuantityChange} // Update this line
            />

          <label htmlFor=""> Price</label>
          <input
      type="number"
      name="price"
      className="form-control mb-2 mt-2"
      value={formData.price}
      readOnly // Make this read-only to prevent user editing
    />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <div>
            {selectedItem ? (
              <button className="btn btn-primary me-2" onClick={handleUpdateClick}>
                Update Order
              </button>
            ) : (
              <button className="btn btn-primary me-2" onClick={handleSaveClick}>
                Save Order
              </button>
            )}
          </div>
          <button className="btn btn-secondary" onClick={handleClosePopup}>
            Close
          </button>
        </div>

      </Popup>
    </>
  );
}

export default Order;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

