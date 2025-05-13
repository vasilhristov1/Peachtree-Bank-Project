import { useState } from 'react';

import { apiCalls } from '../shared/apiCalls';

// COMPONENTS
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';

// ICONS
import CachedIcon from '@mui/icons-material/Cached';

export const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    await apiCalls.submitNewTransaction({
      contractorTo: toAccount,
      contractorFrom: fromAccount,
      amount: parseFloat(amount),
    });
    onSuccess();
  };

  return (
    <Box maxWidth={400}>
      <Header icon={CachedIcon} text='Make a Transfer'/>
      <TextField
        fullWidth
        label="From Account"
        value={fromAccount}
        onChange={(e) => setFromAccount(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="To Account"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};
