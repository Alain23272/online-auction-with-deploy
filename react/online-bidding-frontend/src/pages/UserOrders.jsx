import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from '@mui/material';
import UserNavbar from '../components/UserNavbar';
import { getOrdersByUser, getAllDeliveries } from '../api';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState('');
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchUserOrders();
    fetchDeliveries();
    // eslint-disable-next-line
  }, [email]);

  const fetchUserOrders = async () => {
    try {
      const response = await getOrdersByUser(email);
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch your orders');
    }
  };

  const fetchDeliveries = async () => {
    try {
      const response = await getAllDeliveries();
      setDeliveries(response.data);
    } catch (error) {
      console.error('Failed to fetch deliveries', error);
    }
  };

  const getDeliveryStatus = (orderId) => {
    const delivery = deliveries.find(d => d.orderId === orderId);
    return delivery ? delivery.deliveryStatus : 'Pending';
  };

  return (
    <>
      <UserNavbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={3}>
          {orders.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                You have no orders yet.
              </Typography>
            </Grid>
          )}
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order #{order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Product ID: {order.productId}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                    Amount: ${order.amount.toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: getDeliveryStatus(order.id) === 'Delivered' ? 'green' : 'orange' }}>
                    Status: {getDeliveryStatus(order.id)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(order.orderDate).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default UserOrders; 