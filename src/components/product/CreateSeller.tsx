import { Button } from 'antd';
import CreateSellerModal from '../modal/CreateSellerModal';
import { useState } from 'react';

const CreateSeller = () => {
  const [createSellerModalOpen, setCreateSellerModalOpen] = useState(false);

  return (
    <>
      <div style={styles.container}>
        <h3 style={styles.title}>Create New Seller</h3>
        <Button
          htmlType="submit"
          type="primary"
          style={styles.createButton}
          onClick={() => setCreateSellerModalOpen(true)}
        >
          Create Seller
        </Button>
      </div>

      <CreateSellerModal
        openModal={createSellerModalOpen}
        setOpenModal={setCreateSellerModalOpen}
      />
    </>
  );
};

export default CreateSeller;


const styles = {
  container: {
    padding: '1rem 2rem',
    border: '1px solid #D6CDEB',
    borderRadius: '.6rem',
    backgroundColor: '#F5F3FA',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '1rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '.6rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#6A4E9C',
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
