import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto', borderTop: '1px solid #e0e0e0' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Online Bidding
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your trusted platform for secure and easy online auctions.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: support@onlinebidding.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +1 234 567 8900
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Facebook
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Twitter
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: 'block' }}>
                            Instagram
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="/">
                            Online Bidding System
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
