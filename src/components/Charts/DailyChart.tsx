import { Flex } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDailySaleQuery } from '../../redux/features/management/saleApi';
import Loader from '../Loader';
import { months } from '../../utils/generateDate';

export default function DailyChart() {
  const { data: dailyData, isLoading } = useDailySaleQuery(undefined);

  if (isLoading)
    return (
      <Flex>
        <Loader />
      </Flex>
    );

  const data = dailyData?.data.map(
    (item: {
      day: number;
      month: number;
      year: number;
      totalRevenue: number;
      totalQuantity: number;
    }) => ({
      name: `${item.day} ${months[item.month - 1]}, ${item.year}`,
      revenue: item.totalRevenue,
      quantity: item.totalQuantity,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
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
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#BDAFD6"
          fill="rgba(189, 175, 214, 0.5)"
        />
        <Area
          type="monotone"
          dataKey="quantity"
          stroke="#6A4E9C"
          fill="rgba(106, 78, 156, 0.5)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
