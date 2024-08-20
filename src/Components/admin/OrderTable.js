import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/Auth";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Check } from "react-bootstrap-icons";
function getsize(size) {
  if (size === 'small') return 'S';
  if (size === 'medium') return 'M';
  if (size === 'large') return 'L';
  if (size === 'extraLarge') return 'XL';
  if (size === 'doubleExtraLarge') return 'XXL';
}

const sortIcon = <ArrowDownward />;
const Demo = () => {
  const [orders, setOrders] = useState([]);
  const [search , setSearch] = useState("");
  const [filter , setFilter] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const columns = [
    {
      name: 'Order ID',
      cell: row => row.orderID,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Payment ID',
      selector: row => row.paymentID,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: row => row.address.fullName,
      sortable: true,
      wrap: true,
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
    },
    {
      name: 'Products',
      cell: row => (
        <div>
          {row.products.length === 0 ? (
            <span>No products</span>
          ) : (
            row.products.map((product , index) => (
              <div key={index}>
                <div>Product: <Link to={`/products/${product._id}`}>Product</Link></div>
                <div>Price: ${product.price}</div>
                <div>Quantity: {product.quantity}</div>
                <div>Size: {getsize(product.size)}</div>
                <hr />
              </div>
            ))
          )}
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Order Time',
      selector: row => new Date(row.time).toLocaleString(),
      sortable: true,
    },
    {
      name: 'Completed',
      selector: row => row.completed ? 'Yes' : 'No',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {row.completed ? (
            <Check style={{fontSize : "2rem" , color : "green"}} />
          ) : (
            !isSubmitting ? (
              <input
                type="checkbox"
                onChange={() => handleCheckboxClick(row.orderID)}
              />) : (<Spinner animation="border" />)
          )}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/orders', {
        headers: {
          'authorization': "bearer " + getAuthToken()
        }
      });
      const data = await res.json();
      setOrders(data);
      setFilter(data);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    const result = orders.filter(order => {
      const query = search.toLowerCase();
      return order.orderID.toLowerCase().match(query) || order.paymentID.toLowerCase().match(query) || 
      order.address.fullName.toLowerCase().match(query) ||
      order.address.phone.toLowerCase().match(query) ||
      order.address.firstLine.toLowerCase().match(query) ||
      order.address.secondLine.toLowerCase().match(query)
    });
    setFilter(result);
  } , [search]);

  const handleCheckboxClick = async (orderID) => {
    const userConfirmed = window.confirm("Are you sure you want to mark this order as completed?");
    if (userConfirmed) {
      setSubmitting(true);
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL + 'admin/complete-order', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + getAuthToken()
          },
          body: JSON.stringify({
            orderID: orderID
          })
        });
        const updatedOrders = orders.map(order =>
          order.orderID === orderID ? { ...order, completed: true } : order
        );
        setOrders(updatedOrders);
        setFilter(updatedOrders)
      } catch (error) {
        alert("Failed to update order status", error);
      }
      finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <DataTable
      columns={columns}
      data={filter}
      pagination
      dense
      sortIcon={sortIcon}
      responsive = {true}
      highlightOnHover = {true}
      title = {"Customer Orders"}
      subHeader 
      subHeaderComponent = {
        <input type="text"
          className="w-25 form-control"
          placeholder="search..."
          values = {search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
}

export default Demo;