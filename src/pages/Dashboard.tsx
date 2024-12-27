import { Col, Row } from 'antd';
import MonthlyChart from '../components/Charts/MonthlyChart';
import Loader from '../components/Loader';
import { useCountProductsQuery } from '../redux/features/management/productApi';
import { useYearlySaleQuery } from '../redux/features/management/saleApi';
import DailyChart from '../components/Charts/DailyChart';

const Dashboard = () => {
  const { data: products, isLoading } = useCountProductsQuery(undefined);
  const { data: yearlyData, isLoading: isLoading1 } = useYearlySaleQuery(undefined);

  if (isLoading && isLoading1) return <Loader />;
  
  const totalItemsSold = yearlyData?.data.reduce(
    (acc: number, cur: { totalQuantity: number }) => (acc += cur.totalQuantity),
    0
  );

  const totalRevenue = yearlyData?.data.reduce(
    (acc: number, cur: { totalRevenue: number }) => (acc += cur.totalRevenue),
    0
  );

  return (
    <>
      <Row gutter={[16, 16]} style={styles.container}>
        {/* Total Stock */}
        <Col xs={24} lg={8}>
          <div style={styles.numberCard}>
            <h3 style={styles.cardTitle}>Total Stock</h3>
            <h1 style={styles.cardValue}>{products?.data?.totalQuantity || 0}</h1>
          </div>
        </Col>

        {/* Total Items Sold */}
        <Col xs={24} lg={8}>
          <div style={styles.numberCard}>
            <h3 style={styles.cardTitle}>Total Items Sold</h3>
            <h1 style={styles.cardValue}>{totalItemsSold || 0}</h1>
          </div>
        </Col>

        {/* Total Revenue */}
        <Col xs={24} lg={8}>
          <div style={styles.numberCard}>
            <h3 style={styles.cardTitle}>Total Revenue</h3>
            <h1 style={styles.cardValue}>${totalRevenue || 0}</h1>
          </div>
        </Col>
      </Row>

      {/* Daily Sale and Revenue Chart */}
      <div style={styles.chartContainer}>
        <h1 style={styles.chartTitle}>Daily Sale and Revenue</h1>
        <DailyChart />
      </div>

      {/* Monthly Revenue Chart */}
      <div style={styles.chartContainer}>
        <h1 style={styles.chartTitle}>Monthly Revenue</h1>
        <MonthlyChart />
      </div>
    </>
  );
};

export default Dashboard;

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#F8F3FF', 
  },
  numberCard: {
    backgroundColor: '#FFFFFF', 
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0px 4px 15px rgba(159, 136, 200, 0.2)', 
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#5A4B81', 
    marginBottom: '0.5rem',
  },
  cardValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#9F88C8', 
  },
  chartContainer: {
    backgroundColor: '#FFFFFF', 
    borderRadius: '12px',
    padding: '2rem',
    margin: '2rem',
    boxShadow: '0px 4px 15px rgba(159, 136, 200, 0.2)', 
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#5A4B81', 
    marginBottom: '1rem',
  },
};
