import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiCalls } from '../shared/apiCalls';

// COMPONENTS
import TransactionItem from './TransactionItem';
import Filters from './Filters';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Header from './Header';

// TYPES
import type { TransactionResponse } from '../shared/types';

// ICONS
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const fetchTransactions = async (currentPage: number) => {
    const data = await apiCalls.getTransactionsPaginated({
      page: currentPage,
      pageSize,
      searchTerm,
      sortBy,
      sortDirection,
    });

    setTransactions(data.items);
    setTotalPages(Math.ceil(data.metadata.count / pageSize));
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page, searchTerm, sortBy, sortDirection]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box width="100%">
      <Header icon={BusinessCenterIcon} text='Recent Transactions' />
      <Filters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(field) => {
          if (sortBy === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setSortBy(field);
            setSortDirection('asc');
          }
          setPage(1);
        }}
      />

      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onClick={() => navigate(`/transactions/${t.id}`)} />
      ))}

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};
