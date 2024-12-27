import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import userProPic from '../assets/User.png';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { profileInputFields } from '../constant/profile';
import { useGetSelfProfileQuery, useUpdateProfileMutation } from '../redux/features/authApi';
import Loader from '../components/Loader';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { config } from '../utils/config';

const EditProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Uploading Image...');
    const image = e.target.files?.[0] as any;
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', config.VITE_CLOUDINARY_UPLOAD_PRESET as string);
    data.append('cloud_name', config.VITE_CLOUDINARY_CLOUD_NAME as string);
    data.append('folder', 'inventory');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const res = await response.json();

      if (res.secure_url) {
        const imgUploadRes = await updateProfile({ avatar: res.secure_url }).unwrap();

        if (imgUploadRes.success) {
          toast.success('Profile updated successfully', { id: toastId });
        }
        toast.success('Image Uploaded Successfully, now save the update!', { id: toastId });
      } else {
        toast.error('Failed to Upload Image', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to Upload Image', { id: toastId });
    }
  };

  return (
    <Row style={styles.container}>
      {/* Profile Picture Section */}
      <Col xs={24} lg={8} style={styles.profileSection}>
        <div style={styles.profilePictureWrapper}>
          <div style={styles.profilePictureContainer}>
            <img
              src={data?.data?.avatar || userProPic}
              alt="user"
              style={styles.profilePicture}
            />
          </div>
          <div style={styles.uploadButtonWrapper}>
            <input
              type="file"
              id="avatar"
              style={styles.fileInput}
              onChange={handleFileChange}
            />
            <label htmlFor="avatar" style={styles.uploadButton}>
              <UploadOutlined />
              Change Profile Picture
            </label>
          </div>
        </div>
      </Col>

      {/* Form Section */}
      <Col xs={24} lg={16} style={styles.formSection}>
        <div style={styles.backButtonWrapper}>
          <Button
            type="default"
            onClick={() => navigate('/profile')}
            style={styles.backButton}
          >
            <ArrowLeftOutlined /> Go Back
          </Button>
        </div>
        <EditProfileForm data={data?.data} />
      </Col>
    </Row>
  );
};

export default EditProfilePage;

const EditProfileForm = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const onSubmit = async (data: any) => {
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.__v;

    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }

    const toastId = toast.loading('Updating profile...');
    try {
      const res = await updateProfile(data).unwrap();

      if (res.success) {
        toast.success('Profile updated successfully', { id: toastId });
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Failed to update profile', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      {profileInputFields.map((input) => (
        <CustomInput
          key={input.id}
          name={input.name}
          errors={errors}
          label={input.label}
          register={register}
          required={false}
        />
      ))}
      <div style={styles.submitButtonWrapper}>
        <Button
          htmlType="submit"
          type="primary"
          style={styles.submitButton}
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#F8F3FF',
    minHeight: '100vh',
    gap: '2rem',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  profilePictureWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  profilePictureContainer: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '3px solid #C9A9E0',
    padding: '5px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.3)',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  uploadButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #9F88C8, #C3AED6)',
    color: '#FFFFFF',
    padding: '.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
  },
  fileInput: {
    display: 'none',
  },
  formSection: {
    padding: '2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '1rem',
    boxShadow: '0px 8px 20px rgba(159, 136, 200, 0.3)',
  },
  backButtonWrapper: {
    marginBottom: '1rem',
    textAlign: 'right',
  },
  backButton: {
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  submitButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #9F88C8, #C3AED6)',
    color: '#FFFFFF',
    padding: '.5rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
  },
};
