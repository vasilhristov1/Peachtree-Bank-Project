import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { apiCalls } from '../shared/apiCalls';

// TYPES
import { TransactionStatus, type TransactionResponse } from '../shared/types';

// ICONS
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// COMPONENTS
import Header from './Header';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

export const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<TransactionResponse | null>(null);
  const [status, setStatus] = useState<TransactionStatus>('Sent');

  useEffect(() => {
    if (!id) return;
    apiCalls.getTransaction(Number(id)).then(data => {
      setTransaction(data);
      setStatus(data.status);
    });
  }, [id]);

  const updateStatus = async () => {
    await apiCalls.updateTransaction(Number(id), status);
    setTransaction(prev => prev ? { ...prev, status } : prev);
    alert('Status updated');
  };

  const deleteTransaction = async () => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await apiCalls.deleteTransaction(Number(id));
      alert('Transaction deleted');
      navigate('/');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <Box width="100%" maxWidth="600px" mx="auto" p={2}>
      <Header icon={ReceiptLongIcon} text={`Details for transaction ${transaction.id}`} />

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography fontWeight="bold">Amount:</Typography>
        <Typography>${transaction.amount.toFixed(2)}</Typography>

        <Typography fontWeight="bold">Date:</Typography>
        <Typography>{new Date(transaction.createdDateTime!).toLocaleDateString()}</Typography>

        <Typography fontWeight="bold">To contractor:</Typography>
        <Typography>{transaction.contractorTo}</Typography>

        <Typography fontWeight="bold">State:</Typography>
        <Typography>{transaction.status}</Typography>
      </Paper>

      <Box display="flex" alignItems="center" justifyContent="space-between" mt={3}>
        <Box display="flex" alignItems="center">
          <Select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value as TransactionStatus)}
            sx={{ minWidth: 120 }}
          >
            {Object.values(TransactionStatus).map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" sx={{ ml: 2 }} onClick={updateStatus} disabled={transaction.status === status}>
            Update
          </Button>
        </Box>

        <Button variant="outlined" color="error" onClick={deleteTransaction}>
          Delete
        </Button>
      </Box>

      <Box mt={4}>
        <Button variant="outlined" color="primary" onClick={goBack}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};
