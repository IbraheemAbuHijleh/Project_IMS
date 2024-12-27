import { Button } from 'antd';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../../redux/features/management/categoryApi';
import toastMessage from '../../lib/toastMessage';

const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation();
  const [category, setCategory] = useState('');

  const handleClick = async () => {
    if (!category.trim()) {
      toastMessage({ icon: 'warning', text: 'Category name is required!' });
      return;
    }

    try {
      const res = await createCategory({ name: category }).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        setCategory('');
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Create New Category</h3>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field"
        placeholder="Category Name"
        style={styles.input}
      />
      <Button
        htmlType="button"
        onClick={handleClick}
        type="primary"
        style={styles.createButton}
      >
        Create Category
      </Button>
    </div>
  );
};

export default CreateCategory;

const styles = {
  container: {
    padding: '1rem 2rem',
    border: '1px solid #D6CDEB',
    borderRadius: '.6rem',
    backgroundColor: '#F5F3FA',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '1rem',
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
