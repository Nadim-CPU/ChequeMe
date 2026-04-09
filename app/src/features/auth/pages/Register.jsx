import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Alert, Button, CircularProgress, Link, MenuItem, Paper, Stack, TextField, Typography, Box } from '@mui/material';
import { register } from '../services/auth.service';
import { useAuth } from '../../../store/hooks/useAuth';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Register = () => {
    const [form, setForm] = useState({
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_dob: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const { ok, data } = await register(form);
            if (ok) {
                signIn(data);
                navigate('/');
            } else {
                setError(data?.message || 'Registration failed.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{ p: 3, maxWidth: 480, minWidth: 450 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Register
                </Typography>

                <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        name="user_first_name"
                        value={form.user_first_name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="user_last_name"
                        value={form.user_last_name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="user_email"
                        type="email"
                        value={form.user_email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of Birth"
                            format="YYYY-MM-DD"
                            value={form.user_dob ? dayjs(form.user_dob) : null}
                            onChange={(newValue) =>
                                setForm({
                                    ...form,
                                    user_dob: newValue ? newValue.format("YYYY-MM-DD") : ""
                                })
                            }
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>

                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login">
                            Login
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Register;
