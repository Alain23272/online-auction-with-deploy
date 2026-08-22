import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        if (!expiryDate) return {};

        const difference = +new Date(expiryDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 1 }}>
            <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: timerComponents.length ? 'error.main' : 'text.disabled' }}>
                {timerComponents.length ? timerComponents : <span>Expired</span>}
            </Typography>
        </Box>
    );
};

export default CountdownTimer;
