// COMPONENTS
import { TransactionDetail } from '../components/TransactionDetail';
import { TransactionForm } from '../components/TransactionForm';
import { Layout } from '../components/Layout';

export const TransactionPage = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TransactionForm onSuccess={() => window.location.reload()} />
        <TransactionDetail />
      </div>
    </Layout>
  );
};
