// COMPONENTS
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

// TYPES
import type { TransactionResponse } from '../shared/types';

type Props = {
  transaction: TransactionResponse;
  onClick: () => void;
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'sent':
      return '#FF4D4F';
    case 'received':
      return '#FAAD14';
    case 'payed':
      return '#52C41A';
    default:
      return '#D9D9D9';
  }
};

const TransactionItem = ({ transaction, onClick }: Props) => {
  const formattedDate = new Date(transaction.createdDateTime!).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const statusColor = getStatusColor(transaction.status);

  return (
    <Card
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: 'pointer',
        borderLeft: `10px solid ${statusColor}`,
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <CardContent sx={{ py: 1.5 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" sx={{ width: 40 }}>
              {formattedDate}
            </Typography>
            
            <Avatar
              variant="square"
              src="public/logo.png"
              alt='logo'
              sx={{ width: 32, height: 32 }}
            />
            
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {transaction.contractorTo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transaction.contractorFrom}
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle1" fontWeight={600}>
            ${(transaction.amount).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default TransactionItem;
