import { Button, Col, Flex, Modal, Row } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import toastMessage from '../../lib/toastMessage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getCreateVariantModel,
  getCreateVariantModelData,
  toggleCreateVariantModel,
} from '../../redux/services/modal.Slice';
import { IProduct } from '../../types/product.types';
import ModalInput from './ModalInput';
import { useCreateNewProductMutation } from '../../redux/features/management/productApi';

const AddStockModal = () => {
  const modalOpen = useAppSelector(getCreateVariantModel);
  const data = useAppSelector(getCreateVariantModelData);
  const [createVariant] = useCreateNewProductMutation();
  const dispatch = useAppDispatch();
  const [updateDate, setUpdateDate] = useState<Partial<IProduct>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    const payload: any = { ...updateDate };
    payload.price = Number(updateDate?.price);
    payload.stock = Number(updateDate?.stock);
    delete payload?._id;
    delete payload.createdAt;
    delete payload?.updatedAt;
    delete payload?.__v;
    delete payload?.user;

    try {
      const res = await createVariant(payload).unwrap();
      console.log(res);

      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        dispatch(toggleCreateVariantModel({ open: false, data: null }));
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', title: error.data.message, text: error.data.errors[0] });
    }
  };

  useEffect(() => {
    setUpdateDate(data!);
  }, [data]);

  return (
    <>
      <Modal
        title={<span style={{ color: '#7D6B91' }}>Add Stock</span>}
        centered
        open={modalOpen}
        onOk={() => dispatch(toggleCreateVariantModel({ open: false, data: null }))}
        onCancel={() => dispatch(toggleCreateVariantModel({ open: false, data: null }))}
        footer={[
          <Button
            key='back'
            onClick={() => dispatch(toggleCreateVariantModel({ open: false, data: null }))}
            style={{ backgroundColor: '#CDB4DB', borderColor: '#7D6B91', color: '#FFF' }}
          >
            Close
          </Button>,
        ]}
      >
        <form>
          <ModalInput
            handleChange={handleChange}
            name='name'
            defaultValue={updateDate?.name}
            label='Name'
            style={{
              labelColor: '#7D6B91',
              inputBackground: '#EAD8EE',
              borderColor: '#7D6B91',
            }}
          />
          <ModalInput
            handleChange={handleChange}
            label='Price'
            type='number'
            defaultValue={updateDate?.price}
            name='price'
            style={{
              labelColor: '#7D6B91',
              inputBackground: '#EAD8EE',
              borderColor: '#7D6B91',
            }}
          />
          <ModalInput
            handleChange={handleChange}
            label='Quantity'
            type='number'
            name='quantity'
            defaultValue={updateDate?.stock}
            style={{
              labelColor: '#7D6B91',
              inputBackground: '#EAD8EE',
              borderColor: '#7D6B91',
            }}
          />
          <Row>
            <Col span={6}>
              <label
                htmlFor='Size'
                className='label'
                style={{ color: '#7D6B91', fontWeight: 'bold' }}
              >
                Size
              </label>
            </Col>
            <Col span={18}>
              <select
                defaultValue={updateDate?.size}
                value={updateDate?.size}
                onChange={handleChange}
                className={`input-field`}
                style={{
                  backgroundColor: '#EAD8EE',
                  borderColor: '#7D6B91',
                  color: '#4A3F63',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              >
                <option value='' style={{ color: '#7D6B91' }}>
                  Select Product Size*
                </option>
                <option value='SMALL'>Small</option>
                <option value='MEDIUM'>Medium</option>
                <option value='LARGE'>Large</option>
              </select>
            </Col>
          </Row>
          <Flex justify='center' style={{ margin: '1rem' }}>
            <Button
              key='submit'
              type='primary'
              onClick={onSubmit}
              style={{
                backgroundColor: '#CDB4DB',
                borderColor: '#7D6B91',
                color: '#FFF',
              }}
            >
              Create New Variant
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default AddStockModal;
