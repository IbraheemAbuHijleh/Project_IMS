import { Button } from 'antd';
import { useState } from 'react';
import { useCreateBrandMutation } from '../../redux/features/management/brandApi';
import toastMessage from '../../lib/toastMessage';

const CreateBrand = () => {
  const [createCategory] = useCreateBrandMutation();
  const [brand, setBrand] = useState('');

  const handleClick = async () => {
    if (!brand.trim()) {
      toastMessage({ icon: 'warning', text: 'Brand name is required!' });
      return;
    }

    try {
      const res = await createCategory({ name: brand }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        setBrand('');
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Create New Brand</h3>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="input-field"
        placeholder="Brand Name"
        style={styles.input}
      />
      <Button
        htmlType="button"
        onClick={handleClick}
        type="primary"
        style={styles.createButton}
      >
        Create Brand
      </Button>
    </div>
  );
};

export default CreateBrand;


const styles = {
  container: {
    padding: '1rem 2rem',
    border: '1px solid #D6CDEB',
    borderRadius: '.6rem',
    backgroundColor: '#F5F3FA',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '0.6rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#6A4E9C',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #D0D0D0',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: '#FFFFFF',
  },
  createButton: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#BDAFD6',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
