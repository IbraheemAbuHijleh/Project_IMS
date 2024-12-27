import { DeleteFilled, EditFilled } from '@ant-design/icons';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Flex, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import SearchInput from '../../components/SearchInput';
import toastMessage from '../../lib/toastMessage';
import { useDeleteSaleMutation, useGetAllSaleQuery } from '../../redux/features/management/saleApi';
import { IProduct } from '../../types/product.types';
import { ITableSale } from '../../types/sale.type';
import formatDate from '../../utils/formatDate';

const SaleManagementPage = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const { data, isFetching } = useGetAllSaleQuery(query);

  const onChange: PaginationProps['onChange'] = (page) => {
    setQuery((prev) => ({ ...prev, page: page }));
  };

  const tableData = data?.data?.map((sale: ITableSale) => ({
    key: sale._id,
    productName: sale.productName,
    productPrice: sale.productPrice,
    buyerName: sale.buyerName,
    quantity: sale.quantity,
    totalPrice: sale.totalPrice,
    date: formatDate(sale.date),
  }));

  const columns: TableColumnsType<any> = [
    {
      title: 'Product Name',
      key: 'productName',
      dataIndex: 'productName',
    },
    {
      title: 'Product Price',
      key: 'productPrice',
      dataIndex: 'productPrice',
      align: 'center',
    },
    {
      title: 'Buyer Name',
      key: 'buyerName',
      dataIndex: 'buyerName',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Total Price',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      align: 'center',
    },
    {
      title: 'Selling Date',
      key: 'date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'x',
      align: 'center',
      render: (item) => {
        return (
          <div style={{ display: 'flex' }}>
            <UpdateModal product={item} />
            <DeleteModal id={item.key} />
          </div>
        );
      },
      width: '1%',
    },
  ];

  // const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
  //   setDate(dateString as string);
  // };

  return (
    <>
      <Flex justify='end' style={{ margin: '5px', gap: 4 }}>
        {/* <DatePicker
          onChange={onDateChange}
          placeholder='Search by Selling date...'
          style={{ minWidth: '250px' }}
        /> */}
        <SearchInput setQuery={setQuery} placeholder='Search Sold Products...' />
      </Flex>
      <Table
        size="middle"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        style={styles.table}
      />
      <Flex justify='center' style={{ marginTop: '1rem' }}>
        <Pagination
          current={query.page}
          onChange={onChange}
          defaultPageSize={query.limit}
          total={data?.meta?.total}
        />
      </Flex>
    </>
  );
};

/**
 * Update Modal
 */
const UpdateModal = ({ product }: { product: IProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log({ product, data });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ! Remove the first return to work on this component
  return;

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'green' }}
      >
        <EditFilled />
      </Button>
      <Modal title='Update Product Info' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Working on it...!!!</h1>
          <Button htmlType='submit'>Submit</Button>
        </form>
      </Modal>
    </>
  );
};

/**
 * Delete Modal
 */
const DeleteModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSale] = useDeleteSaleMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSale(id).unwrap();
      if (res.statusCode === 200) {
        toastMessage({ icon: 'success', text: res.message });
        handleCancel();
      }
    } catch (error: any) {
      handleCancel();
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type='primary'
        className='table-btn-small'
        style={{ backgroundColor: 'red' }}
      >
        <DeleteFilled />
      </Button>
      <Modal title='Delete Product' open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Are you want to delete this product?</h2>
          <h4>You won't be able to revert it.</h4>
          <div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Button
              onClick={handleCancel}
              type='primary'
              style={{ backgroundColor: 'lightseagreen' }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              type='primary'
              style={{ backgroundColor: 'red' }}
            >
              Yes! Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SaleManagementPage;

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#F8F3FF', 
    minHeight: '100vh',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  },
  table: {
    backgroundColor: '#FFFFFF', 
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.6)', 
  },
  paginationContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#9F88C8',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
  },
  deleteButton: {
    backgroundColor: '#E63946',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
  },
  modal: {
    borderRadius: '12px',
  },
  submitButton: {
    backgroundColor: '#9F88C8',
    color: '#FFFFFF',
    border: 'none',
    marginTop: '1rem',
    width: '100%',
  },
  deleteModalContent: {
    textAlign: 'center',
    padding: '2rem',
  },
  deleteActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
  cancelButton: {
    backgroundColor: '#6C757D',
    color: '#FFFFFF',
    border: 'none',
  },
  confirmDeleteButton: {
    backgroundColor: '#E63946',
    color: '#FFFFFF',
    border: 'none',
  },
};

