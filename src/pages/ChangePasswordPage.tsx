import { Button, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { useChangePasswordMutation } from '../redux/features/authApi';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must have at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const toastId = toast.loading('Changing password...');
      const res = await changePassword(payload).unwrap();

      if (res.success) {
        toast.success('Password changed successfully', { id: toastId });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/profile');
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: error.data.statusCode });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Change Password</h1>
        <Input.Password
          size="large"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={styles.input}
        />
        <Input.Password
          size="large"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <Input.Password
          size="large"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <Button type="primary" onClick={handleSubmit} style={styles.primaryButton}>
          Change Password
        </Button>
        <Button type="default" onClick={() => navigate('/profile')} style={styles.backButton}>
          <ArrowLeftOutlined /> Go Back
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F3FF', 
    padding: '1rem',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#FFFFFF', 
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.2)', 
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#5A4B81', 
    marginBottom: '1.5rem',
  },
  input: {
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #C3AED6', 
  },
  primaryButton: {
    width: '100%',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #9F88C8, #C3AED6)', 
    border: 'none',
    color: '#FFFFFF',
    fontWeight: '600',
    borderRadius: '8px',
  },
  backButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    color: '#5A4B81', 
    border: '1px solid #C3AED6', 
    fontWeight: '600',
    borderRadius: '8px',
  },
};
