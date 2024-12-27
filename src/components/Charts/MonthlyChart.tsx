import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMonthlySaleQuery } from '../../redux/features/management/saleApi';
import { months } from '../../utils/generateDate';
import { Flex } from 'antd';
import Loader from '../Loader';

const MonthlyChart = () => {
  const { data: monthlyData, isLoading } = useMonthlySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = monthlyData?.data.map(
    (item: { month: number; year: number; totalRevenue: number }) => ({
      name: `${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#D6CDEB" />
        <XAxis dataKey="name" tick={{ fill: '#6A4E9C' }} />
        <YAxis tick={{ fill: '#6A4E9C' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#F5F3FA',
            borderRadius: '8px',
            border: '1px solid #D6CDEB',
          }}
          labelStyle={{ color: '#6A4E9C' }}
        />
        <Legend
          wrapperStyle={{
            bottom: 0,
            textAlign: 'center',
            color: '#6A4E9C',
          }}
        />
        <Bar
          dataKey="revenue"
          fill="#BDAFD6"
          radius={[10, 10, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
