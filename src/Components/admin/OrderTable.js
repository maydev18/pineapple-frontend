import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Check } from 'react-bootstrap-icons';
import styles from './Dashboard.module.css'; // Import the CSS module
import { format } from 'date-fns';
import { getsize } from '../../utils/cartUtils/convertSize';
import { useError } from '../../context/ErrorContext';
import { useAuth } from '../../context/AuthContext';
import * as XLSX from 'xlsx'
const sortIcon = <ArrowDownward />;

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#d0e6b7', 
      color: 'black', 
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      padding: '10px', 
      marginTop: '2rem'
    },
  },
  rows: {
    style: {
      fontSize: '14px',
     
    },
  },
};


const Demo = () => {
  const {token} = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order
  const {showError} = useError();
  const handleShow = (order) => {
    setSelectedOrder(order); // Set the selected order
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null); // Clear selected order on close
  };

  const columns = [
    {
      name: 'Order ID',
      cell: row => (
        <div 
          onClick={() => handleShow(row)} 
          className={styles.orderIdCell}  // Apply CSS class
        >
          {row.orderID}
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: 'Payment ID',
      selector: row => row.paymentID,
      sortable: true,
      cell: row => (
        <div className={styles.paymentIdCell}>{row.paymentID}</div> // Apply CSS class
      ),
    },
    {
      name: 'Full Name',
      selector: row => row.address.fullName,
      sortable: true,
      wrap: true,
      cell: row => (
        <div className={styles.nameCell}>{row.address.fullName}</div> // Apply CSS class
      ),
    },
    {
      name: 'Phone Number',
      selector: row => row.address.phone,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Address',
      selector: row => `${row.address.firstLine}, ${row.address.secondLine}, ${row.address.city}, ${row.address.state}, ${row.address.pincode}`,
      sortable: true,
      wrap: true,
      cell: row => (
        <div className={styles.addressCell}>
          {`${row.address.firstLine}, ${row.address.secondLine}, ${row.address.city}, ${row.address.state}, ${row.address.pincode}`}
        </div> // Apply CSS class
      ),
    },
    {
      name: 'Order Time',
      selector: row => format(new Date(row.time), 'dd-MM-yyyy'),
      sortable: true,
    },
    {
      name: 'Mark shipped',
      cell: row => (
        <div className={styles.actionCell}>
          {row.status >= 1 ? (
            <Check className={styles.completedIcon} />
            ) : (
              row.cancelled ? "Order Cancelled" :
              <input
                type="checkbox"
                onChange={() => updateOrderStatus(row.orderID)}
              />
            )
          }
        </div> // Apply CSS class
      ),
    },
    {
      name: 'Mark delivered',
      cell: row => (
        <div className={styles.actionCell}>
          {row.status === 2 ? (
            <Check className={styles.completedIcon} />
          ) : (
              row.cancelled ? "Order Cancelled" :
              row.status === 1 && 
              <input
                type="checkbox"
                onChange={() => updateOrderStatus(row.orderID)}
              />
            )
          }
        </div> // Apply CSS class
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];
  

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/orders', {
          headers: {
            'authorization': "bearer " + token,
          },
        });
        if(!res.ok){
          const err = await res.json();
          throw err;
        }
        let data = await res.json();
        data = data.reverse();
        setOrders(data);
        setFilter(data);
      }
      catch(err){
        showError(err.message , 'danger');
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const result = orders.filter(order => {
      const query = search.toLowerCase();
      return order.orderID.toLowerCase().includes(query) ||
        order.paymentID.toLowerCase().includes(query) ||
        order.address.fullName.toLowerCase().includes(query) ||
        order.address.phone.toLowerCase().includes(query) ||
        order.address.firstLine.toLowerCase().includes(query) ||
        order.address.secondLine.toLowerCase().includes(query);
    });
    setFilter(result);
  }, [search, orders]);

  const updateOrderStatus = async (orderID) => {
    const userConfirmed = window.confirm("Are you sure you want to update the status of this order?");
    if (userConfirmed) {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/update-order-status', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ orderID }),
        });
        if(!res.ok){
          const err = await res.json();
          throw err;
        }
        const updatedOrders = orders.map(order =>
          order.orderID === orderID ? { ...order, status: order.status+1 } : order
        );
        setOrders(updatedOrders);
        setFilter(updatedOrders);
      } catch (error) {
        showError(error.message , 'danger');
      }
    }
  };
  const downloadExcel = () => {
    // Extract and format product data from orders
    const productsData = orders.flatMap(order => 
        order.products.map(product => ({
            orderID: order.orderID,
            fullName: order.address.fullName,
            email: order.address.email,
            phone: order.address.phone,
            productTitle: product.title,
            productID: product._id,
            quantity: product.quantity,
            price: product.price,
            size: product.size,
            orderStatus: order.status,
            cancelled: order.cancelled,
            orderDate: order.time,
            deliveryDate: order.deliveryDate || "N/A",
        }))
    );

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(productsData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Create and download the Excel file
    XLSX.writeFile(workbook, "ProductsData.xlsx");
};

  return (
    <><div className={styles.tableWrapper}>
      <DataTable
        columns={columns}
        data={filter}
        pagination
        dense
        sortIcon={sortIcon}
        responsive
        highlightOnHover
        className={styles.dataTable} // Apply the CSS module class
        title="Customer Orders"
        subHeader
        subHeaderComponent={<input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />}
        customStyles={customStyles} // Apply custom styles
      />
    </div>
    <button onClick={downloadExcel} className={styles.btn}>Download Excel</button>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>

              {selectedOrder.products.length === 0 ? (
                <p>No products</p>
              ) : (
                selectedOrder.products.map((product, index) => (
                  <div className={styles.orderDetails}>
                    <div className={styles.orderSummary}>

                      <div className={styles.products}>
                        <img src={product.image} alt="Product" className={`${styles.productImage} mb-3`} />
                        <div className={styles.Details}>
                          <h5>{product.title}</h5>
                          <div className={styles.Description}>
                            <div>

                              <p><strong>Size: </strong> {getsize(product.size)}</p>
                              <p><strong>Quantity: </strong>{product.quantity}</p>
                              <p><strong>Price: </strong> ₹ {product.price * product.quantity}</p>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal></>
    
  );
};

export default Demo;
