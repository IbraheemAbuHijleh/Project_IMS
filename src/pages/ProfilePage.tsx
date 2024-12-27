import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import userProPic from '../assets/User.png';
import Loader from '../components/Loader';
import { useGetSelfProfileQuery } from '../redux/features/authApi';
import { profileKeys } from '../constant/profile';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { data, isLoading } = useGetSelfProfileQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <div style={styles.pageContainer}>
      {/* Profile Picture Section */}
      <div style={styles.profilePictureSection}>
        <div style={styles.profilePictureContainer}>
          <img
            src={data?.data?.avatar || userProPic}
            alt="user"
            style={styles.profilePicture}
          />
        </div>
        <h1 style={styles.userName}>{data?.data?.name || "User Name"}</h1>
        <p style={styles.userEmail}>{data?.data?.email || "user@example.com"}</p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtonContainer}>
        <Link to="/edit-profile">
          <Button style={styles.actionButton}>
            <EditOutlined />
            Edit Profile
          </Button>
        </Link>
        <Link to="/change-password">
          <Button style={styles.actionButton}>
            <EditFilled />
            Change Password
          </Button>
        </Link>
      </div>

      {/* Profile Information */}
      <Row justify="center">
        <Col
          xs={{ span: 24 }}
          lg={{ span: 20 }} // Wider card
          style={styles.profileInfoContainer}
        >
          {profileKeys.map((key) => (
            <ProfileInfoItems keyName={key.keyName} value={data?.data[key.keyName]} />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

const ProfileInfoItems = ({ keyName, value }: { keyName: string; value: string }) => {
  return (
    <div style={styles.infoItemContainer}>
      <h2 style={styles.infoKey}>{keyName}</h2>
      <h3 style={styles.infoValue}>{value}</h3>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#F8F3FF', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    
  },
  profilePictureSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  profilePictureContainer: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '3px solid #C9A9E0',
    background: 'linear-gradient(135deg, #C9A9E0, #EAE6F6)', 
    padding: '5px',
    boxShadow: '0px 8px 15px rgba(128, 90, 213, 0.3)',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#5A4B81',
  },
  userEmail: {
    fontSize: '1rem',
    color: '#7E6DA3',
  },
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  actionButton: {
    background: 'linear-gradient(135deg, #9F88C8, #C3AED6)', 
    color: '#FFF',
    border: 'none',
    fontWeight: '600',
    padding: '0.5rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(159, 136, 200, 0.5)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  profileInfoContainer: {
    width: '1000px',
    maxWidth: '6000px', 
    background: '#FFFFFF', 
    borderRadius: '1rem',
    padding: '2.5rem', 
    boxShadow: '0px 4px 15px rgba(178, 157, 217, 0.3)',
  },
  infoItemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px dashed #D9CFF3',
  },
  infoKey: {
    fontSize: '1.2rem', 
    fontWeight: '600',
    color: '#5A4B81',
  },
  infoValue: {
    fontSize: '1.1rem', 
    fontWeight: '400',
    color: '#7E6DA3',
    textAlign: 'right',
  },
};
