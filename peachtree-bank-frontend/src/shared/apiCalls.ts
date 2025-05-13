// UTILS
import { call } from "../apiCalls/axiosConfig"
import { createQueryString } from "./apiCallsUtils"

// TYPES
import type { 
    LoginRequest, 
    PaginatedResponse, 
    TransactionModel, 
    TransactionPaginationMetadata, 
    TransactionResponse, 
    TransactionsFilterRequest, 
    TransactionStatus 
} from "./types"

const login = (credentials: LoginRequest): Promise<{ token: string }> =>
    call<{ token: string }>({
        url: `/Auth/login`,
        method: 'POST',
        data: credentials,
    }).then(response => response.data);

const getTransactionsPaginated = (queryParams: TransactionsFilterRequest) =>
    call<PaginatedResponse<TransactionResponse, TransactionPaginationMetadata>>({
        url: `/transactions${createQueryString(queryParams)}`,
        method: 'GET',
    }).then((response) => response.data)

const getTransaction = (transactionId: number) =>
    call<TransactionResponse>({
        url: `/transactions/${transactionId}`,
        method: 'GET',
    }).then((response) => response.data)

const updateTransaction = (transactionId: number, status: TransactionStatus) =>
    call<void>({
        url: `transactions/${transactionId}`,
        method: 'PUT',
        data: JSON.stringify(status),
        headers: {
            'Content-Type': 'application/json',
        },
    })

const deleteTransaction = (transactionId: number) =>
    call<void>({
        url: `transactions/${transactionId}`,
        method: 'DELETE',
    })

const submitNewTransaction = (
    data: TransactionModel
) =>
    call<void>({
        url: `/transactions`,
        method: 'POST',
        data,
    })

export const apiCalls = {
    login,
    getTransactionsPaginated,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    submitNewTransaction,
}