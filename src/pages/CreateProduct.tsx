import { Button, Col, Row } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import toastMessage from '../lib/toastMessage';
import { useGetAllBrandsQuery } from '../redux/features/management/brandApi';
import { useGetAllCategoriesQuery } from '../redux/features/management/categoryApi';
import { useCreateNewProductMutation } from '../redux/features/management/productApi';
import { useGetAllSellerQuery } from '../redux/features/management/sellerApi';
import { ICategory } from '../types/product.types';
import CreateSeller from '../components/product/CreateSeller';
import CreateCategory from '../components/product/CreateCategory';
import CreateBrand from '../components/product/CreateBrand';

const CreateProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation();
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const { data: sellers } = useGetAllSellerQuery(undefined);
  const { data: brands } = useGetAllBrandsQuery(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data, price: Number(data.price), stock: Number(data.stock) };

    if (payload.size === '') {
      delete payload.size;
    }

    try {
      const res = await createNewProduct(payload).unwrap();
      if (res.statusCode === 201) {
        toastMessage({ icon: 'success', text: res.message });
        reset();
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Row style={styles.container} gutter={30}>
      {/* Form Section */}
      <Col xs={24} lg={14} style={styles.leftColumn}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Add New Product</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput name="name" errors={errors} label="Name" register={register} required />
            <CustomInput
              name="price"
              type="number"
              errors={errors}
              label="Price"
              register={register}
              required
            />
            <CustomInput
              name="stock"
              type="number"
              errors={errors}
              label="Stock"
              register={register}
              required
            />

            {/* Seller Selection */}
            <Row style={styles.row}>
              <Col xs={24} lg={6}>
                <label htmlFor="seller" style={styles.label}>
                  Seller
                </label>
              </Col>
              <Col xs={24} lg={18}>
                <select
                  {...register('seller', { required: true })}
                  className={`input-field ${errors['seller'] ? 'input-field-error' : ''}`}
                  style={styles.select}
                >
                  <option value="">Select Seller*</option>
                  {sellers?.data.map((item: ICategory) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            {/* Category Selection */}
            <Row style={styles.row}>
              <Col xs={24} lg={6}>
                <label htmlFor="category" style={styles.label}>
                  Category
                </label>
              </Col>
              <Col xs={24} lg={18}>
                <select
                  {...register('category', { required: true })}
                  className={`input-field ${errors['category'] ? 'input-field-error' : ''}`}
                  style={styles.select}
                >
                  <option value="">Select Category*</option>
                  {categories?.data.map((item: ICategory) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            {/* Brand Selection */}
            <Row style={styles.row}>
              <Col xs={24} lg={6}>
                <label htmlFor="brand" style={styles.label}>
                  Brand
                </label>
              </Col>
              <Col xs={24} lg={18}>
                <select
                  {...register('brand')}
                  className={`input-field ${errors['brand'] ? 'input-field-error' : ''}`}
                  style={styles.select}
                >
                  <option value="">Select Brand</option>
                  {brands?.data.map((item: ICategory) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            <CustomInput label="Description" name="description" register={register} />

            {/* Size Selection */}
            <Row style={styles.row}>
              <Col xs={24} lg={6}>
                <label htmlFor="size" style={styles.label}>
                  Size
                </label>
              </Col>
              <Col xs={24} lg={18}>
                <select {...register('size')} className="input-field" style={styles.select}>
                  <option value="">Select Product Size</option>
                  <option value="SMALL">Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                </select>
              </Col>
            </Row>

            {/* Submit Button */}
            <div style={styles.submitWrapper}>
              <Button
                htmlType="submit"
                type="primary"
                style={styles.submitButton}
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </Col>

      {/* Right Section */}
      <Col xs={24} lg={10}>
        <div style={styles.actionContainer}>
          <CreateSeller />
          <CreateCategory />
          <CreateBrand />
        </div>
      </Col>
    </Row>
  );
};

export default CreateProduct;

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#F8F3FF', 
    height: '100vh',
    overflow: 'auto',
  },
  leftColumn: {
    display: 'flex',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', 
    border: '1px solid #9F88C8', 
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.2)', 
  },
  title: {
    marginBottom: '1rem',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#5A4B81', 
  },
  row: {
    marginBottom: '1rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#5A4B81', 
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #C3AED6', 
  },
  submitWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  submitButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #9F88C8, #C3AED6)', 
    color: '#FFF',
    borderRadius: '8px',
  },
  actionContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    border: '1px solid #9F88C8',
    borderRadius: '12px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.2)',
  },
};
