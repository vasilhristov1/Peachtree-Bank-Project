// COMPONENTS
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

type Props = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortBy?: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: string) => void;
  };
  
  const Filters = ({
    searchTerm,
    onSearchChange,
    sortBy,
    sortDirection,
    onSortChange
  }: Props) => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={3}
        margin={3}
      >
        <InputBase
          placeholder="Search by typing…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            borderBottom: '1px solid #ccc',
            pb: 0.5,
            width: '100%',
            maxWidth: 400,
          }}
          fullWidth
        />
  
        <Box display="flex" alignItems="center" gap={1} mt={{ xs: 2, sm: 0 }}>
          <Typography variant="body2" fontWeight={600}>
            Sort by
          </Typography>
          {['date', 'beneficiary', 'amount'].map((field) => (
            <Button
              key={field}
              variant={sortBy === field ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onSortChange(field)}
              sx={{
                textTransform: 'uppercase',
                borderColor: '#ccc',
                fontWeight: 400,
              }}
            >
              {field} {sortBy === field ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </Button>
          ))}
        </Box>
      </Box>
    );
  };
  
  export default Filters;