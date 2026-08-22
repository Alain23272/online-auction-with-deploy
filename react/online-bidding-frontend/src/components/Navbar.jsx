import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import GavelIcon from '@mui/icons-material/Gavel';

const Navbar = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const handleLoginSuccess = () => {
        setLoginOpen(false);
    };

    const handleSignupSuccess = () => {
        setSignupOpen(false);
        setLoginOpen(true);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <GavelIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Online Bidding
                    </Typography>
                    <Box>
                        <Button color="inherit" className="login-btn" onClick={() => setLoginOpen(true)}>
                            Login
                        </Button>
                        <Button color="inherit" className="signup-btn" onClick={() => setSignupOpen(true)}>
                            Sign Up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            <SignupModal
                open={signupOpen}
                onClose={() => setSignupOpen(false)}
                onSignupSuccess={handleSignupSuccess}
            />
        </>
    );
};

export default Navbar;
