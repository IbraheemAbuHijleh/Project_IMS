import { Button, Flex } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import toastMessage from '../../lib/toastMessage';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/services/authSlice';
import decodeToken from '../../utils/decodeToken';

const LoginPage = () => {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging...');
    try {
      const res = await userLogin(data).unwrap();

      if (res.statusCode === 200) {
        const user = decodeToken(res.data.token);
        dispatch(loginUser({ token: res.data.token, user }));
        navigate('/');
        toast.success('Successfully Login!', { id: toastId });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: '100vh',
        backgroundColor: '#f7f3fa', 
        background: 'linear-gradient(135deg, #f7f3fa 0%, #eae3f1 100%)',
      }}
    >
      <Flex
        vertical
        style={{
          width: '420px',
          padding: '3rem',
          border: '1px solid #b3a0d6', 
          borderRadius: '12px', 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', 
          backgroundColor: '#ffffff', 
        }}
      >
        <h1
          style={{
            marginBottom: '1rem',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#6d5b96', 
            fontWeight: '700', 
            fontSize: '1.8rem', 
            letterSpacing: '1px', 
          }}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Your Email*"
            className={`input-field ${errors['email'] ? 'input-field-error' : ''}`}
            style={{
              width: '100%',
              padding: '0.9rem',
              marginBottom: '1.2rem',
              border: '1px solid #cdbfe3', 
              borderRadius: '8px', 
              fontSize: '1rem',
              color: '#555',
              backgroundColor: '#faf9fc', 
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#a48dc6')} 
            onBlur={(e) => (e.target.style.borderColor = '#cdbfe3')}
          />
          <input
            type="password"
            placeholder="Your Password*"
            className={`input-field ${errors['password'] ? 'input-field-error' : ''}`}
            {...register('password', { required: true })}
            style={{
              width: '100%',
              padding: '0.9rem',
              marginBottom: '1.5rem',
              border: '1px solid #cdbfe3',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#555',
              backgroundColor: '#faf9fc',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#a48dc6')}
            onBlur={(e) => (e.target.style.borderColor = '#cdbfe3')}
          />
          <Flex justify="center" style={{ marginBottom: '1.2rem' }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                backgroundColor: '#b399c6', 
                border: 'none',
                color: '#fff',
                padding: '0.7rem 2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(179, 153, 198, 0.5)', 
                fontSize: '1rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(179, 153, 198, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(179, 153, 198, 0.5)';
              }}
            >
              Login
            </Button>
          </Flex>
        </form>
        <p
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            color: '#6d5b96',
            fontSize: '0.9rem',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#b399c6',
              textDecoration: 'underline',
              fontWeight: '500',
            }}
          >
            Register Here
          </Link>
        </p>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
