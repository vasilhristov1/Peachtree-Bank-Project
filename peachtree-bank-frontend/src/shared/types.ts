export interface PaginationMetadata {
    page: number
    count: number
    pageSize: number
}

export interface PaginationRequest {
    page: number
    pageSize: number
}

export interface PaginatedResponse<T, U> {
    items: T[]
    metadata: U
}

export type SortDirection = 'asc' | 'desc'

export interface TransactionsFilterRequest extends PaginationRequest {
    sortBy?: string
    sortDirection?: SortDirection
    searchTerm?: string
}

export const TransactionStatus = {
    Sent: 'Sent',
    Received: 'Received',
    Payed: 'Payed',
} as const

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]


export interface TransactionPaginationMetadata extends PaginationMetadata {
    transactionStatuses: TransactionStatus[]
}

export interface TransactionModel {
    contractorTo: string
    contractorFrom: string
    amount: number
}

export interface TransactionResponse {
    id: number
    contractorTo: string
    contractorFrom: string
    amount: number
    status: TransactionStatus
    createdDateTime: Date | null
}

export interface LoginRequest {
    username: string
    password: string
}