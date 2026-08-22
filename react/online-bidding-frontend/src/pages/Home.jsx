import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Chip, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import { getAllProducts } from '../api';
import '../CSS/home.css';
import SecurityIcon from '@mui/icons-material/Security';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';

const API_BASE = '/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getImageUrl = (product) => {
    if (!product.photoUrl) return 'https://via.placeholder.com/200';

    // Aggressively fix the URL by extracting the path
    let url = product.photoUrl;

    // If it contains the image path, extract it and rebuild
    if (url.includes('/products/image/')) {
      const parts = url.split('/products/image/');
      // parts[1] will be the ID
      return `${API_BASE}/products/image/${parts[1]}`;
    }

    if (url.startsWith('http')) {
      return url.replace('8080', '8082');
    }
    return `${API_BASE}${product.photoUrl}`;
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 6,
            mb: 6,
            textAlign: 'center',
            boxShadow: 1
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
            Welcome to Online Bidding
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Your trusted platform for online auctions and bidding
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom color="primary" fontWeight="bold">
            Why Choose Us?
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="bold">Secure Bidding</Typography>
                <Typography variant="body2" color="text.secondary">
                  Safe and secure bidding process with real-time updates and encrypted transactions
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <CategoryIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="bold">Wide Selection</Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through a diverse range of products and categories with detailed descriptions
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <PaymentIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom fontWeight="bold">Easy Payments</Typography>
                <Typography variant="body2" color="text.secondary">
                  Secure wallet system for hassle-free transactions and instant payment processing
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom color="primary" fontWeight="bold">
            Featured Products
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {products.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={getImageUrl(product)}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="div" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Chip label={product.category} size="small" color="primary" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden' }}>
                      {product.description}
                    </Typography>
                    <CountdownTimer expiryDate={product.expiryDate} />
                    <Typography variant="h6" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
