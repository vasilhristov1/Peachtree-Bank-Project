// COMPONENTS
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { Layout } from '../components/Layout';

export const Dashboard = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TransactionForm onSuccess={() => window.location.reload()} />
        <TransactionList />
      </div>
    </Layout>
  );
};
