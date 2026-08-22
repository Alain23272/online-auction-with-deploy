import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const MockPaymentForm = ({ onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'expiry') {
      // Remove any non-digit characters
      const cleaned = value.replace(/\D/g, '');

      // Format as MM/YY
      if (cleaned.length >= 2) {
        value = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      } else {
        value = cleaned;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.cardNumber ||
      !formData.cardHolder ||
      !formData.expiry ||
      !formData.cvv ||
      !formData.amount
    ) {
      setError('All fields are required');
      return false;
    }
    if (formData.cardNumber.length < 16) {
      setError('Invalid card number');
      return false;
    }
    if (formData.cvv.length < 3) {
      setError('Invalid CVV');
      return false;
    }
    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        // In a real app, we would send card details to a payment gateway here.
        // For this mock, we just assume success if validation passes.
        await onPaymentSuccess(parseFloat(formData.amount));
        setFormData({
          cardNumber: '',
          cardHolder: '',
          expiry: '',
          cvv: '',
          amount: '',
        });
      } catch (err) {
        setError('Payment failed. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCardIcon color="primary" /> Payment Details
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount to Add"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                inputProps={{ step: "0.01", min: "0" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                inputProps={{ maxLength: 19 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Holder Name"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={formData.cvv}
                onChange={handleChange}
                inputProps={{ maxLength: 3 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : `Pay $${formData.amount || '0.00'}`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MockPaymentForm;
