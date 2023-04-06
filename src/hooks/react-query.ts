import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/build/esm/types.dom';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
}

/** The address object used for both the client and sender's address information. It contains the person's street, city, post code and country data */
export interface Address {
  /** The city where the person lives in */
  city: Scalars['String'];
  /** The country where the person is located */
  country: Scalars['String'];
  /** The post code of the person's state */
  postCode: Scalars['String'];
  /** The street where the person resides */
  street: Scalars['String'];
}

export interface AddressInput {
  /** The city where the person lives in */
  city: Scalars['String'];
  /** The country where the person is located */
  country: Scalars['String'];
  /** The post code of the person's state */
  postCode: Scalars['String'];
  /** The street where the person resides */
  street: Scalars['String'];
}

export interface AuthPayload {
  accessToken: Scalars['String'];
  user: User;
}

export interface CreateInvoiceInput {
  clientAddress: AddressInput;
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  description: Scalars['String'];
  items: Array<InvoiceItemInput>;
  paymentDue: Scalars['String'];
  paymentTerms: Scalars['Int'];
  senderAddress: AddressInput;
  status: Status;
  tag: Scalars['String'];
  total: Scalars['Float'];
  userId?: InputMaybe<Scalars['ID']>;
}

/** The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera */
export interface Invoice {
  /** The address of the person receiving the invoice */
  clientAddress?: Maybe<Address>;
  /** The email of the person receiving the invoice */
  clientEmail?: Maybe<Scalars['String']>;
  /** The name of the person receiving the invoice */
  clientName?: Maybe<Scalars['String']>;
  /** The exact time the invoice was created */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A high level description of the items listed in the invoice */
  description?: Maybe<Scalars['String']>;
  /** Id of the invoice */
  id?: Maybe<Scalars['ID']>;
  /** The items listed in the invoice */
  items: Array<InvoiceItem>;
  /** When the payment of the items listed in the invoice is due */
  paymentDue?: Maybe<Scalars['String']>;
  /** The number of days before an invoice's payment grace period expires. Can be 1, 7, 14 or 30 days */
  paymentTerms?: Maybe<Scalars['Int']>;
  /** The address of the person sending the invoice */
  senderAddress?: Maybe<Address>;
  /** Current payment status of the items listed in the invoice */
  status?: Maybe<Status>;
  /** Unique id sequence used to tag the invoice */
  tag?: Maybe<Scalars['String']>;
  /** The grand total of the price of the items listed in the invoice */
  total?: Maybe<Scalars['Float']>;
  /** The exact time the invoice was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The id of the invoice's owner */
  userId?: Maybe<Scalars['ID']>;
}

/** An item listed in the invoice */
export interface InvoiceItem {
  /** The id of this item */
  id?: Maybe<Scalars['ID']>;
  /** The name of this item */
  name?: Maybe<Scalars['String']>;
  /** The price of this item */
  price?: Maybe<Scalars['Float']>;
  /** The amount of this item purchased */
  quantity?: Maybe<Scalars['Int']>;
  /** The price of this item multiplied by the total number of this item purchased */
  total?: Maybe<Scalars['Float']>;
}

export interface InvoiceItemInput {
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  total: Scalars['Float'];
}

export interface LoginInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface LogoutPayload {
  message: Scalars['String'];
}

export interface Mutation {
  createInvoice?: Maybe<Invoice>;
  deleteInvoice?: Maybe<Invoice>;
  login?: Maybe<AuthPayload>;
  logout: LogoutPayload;
  register?: Maybe<AuthPayload>;
  updateInvoice?: Maybe<Invoice>;
}

export interface MutationCreateInvoiceArgs {
  input: CreateInvoiceInput;
}

export interface MutationDeleteInvoiceArgs {
  where: UniqueIdInput;
}

export interface MutationLoginArgs {
  input: LoginInput;
}

export interface MutationRegisterArgs {
  input: RegisterInput;
}

export interface MutationUpdateInvoiceArgs {
  input: UpdateInvoiceInput;
  where: UniqueIdInput;
}

export interface Query {
  invoice?: Maybe<Invoice>;
  invoices: Array<Maybe<Invoice>>;
  refreshAuth?: Maybe<RefreshPayload>;
  user?: Maybe<User>;
}

export interface QueryInvoiceArgs {
  where: UniqueIdInput;
}

export interface RefreshPayload {
  accessToken: Scalars['String'];
}

export interface RegisterInput {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  /** The password of the user. Must match the countersign i.e the reentered password */
  password: Scalars['String'];
  /** The image url generated from the user's email address */
  photo?: InputMaybe<Scalars['String']>;
}

/** The current role of the user */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

/** The current status of the invoice */
export enum Status {
  Draft = 'DRAFT',
  Paid = 'PAID',
  Pending = 'PENDING',
}

export interface UniqueIdInput {
  id: Scalars['ID'];
}

export interface UniqueIdWithUserId {
  id: Scalars['ID'];
  userId: Scalars['ID'];
}

export interface UniqueUserId {
  userId: Scalars['ID'];
}

export interface UpdateInvoiceInput {
  clientAddress: AddressInput;
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  description: Scalars['String'];
  items: Array<InvoiceItemInput>;
  paymentDue: Scalars['String'];
  paymentTerms: Scalars['Int'];
  senderAddress: AddressInput;
  status: Status;
  total: Scalars['Float'];
}

export interface User {
  /** The exact time the user was created */
  createdAt: Scalars['DateTime'];
  /** The password of the user */
  email: Scalars['String'];
  /** The first name of the user */
  firstName?: Maybe<Scalars['String']>;
  /** Id of the user */
  id: Scalars['ID'];
  /** The last name of the user */
  lastName?: Maybe<Scalars['String']>;
  /** The password of the user */
  password?: Maybe<Scalars['String']>;
  /** The avatar of the user */
  photo?: Maybe<Scalars['String']>;
  /** The exact time the user was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export type GetInvoicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvoicesQuery = {
  invoices: Array<{
    id?: string;
    tag?: string;
    paymentDue?: string;
    clientName?: string;
    status?: Status;
    total?: number;
  }>;
};

export type GetInvoiceQueryVariables = Exact<{
  where: UniqueIdInput;
}>;

export type GetInvoiceQuery = {
  invoice?: {
    userId?: string;
    createdAt?: any;
    updatedAt?: any;
    paymentDue?: string;
    tag?: string;
    description?: string;
    paymentTerms?: number;
    clientName?: string;
    clientEmail?: string;
    status?: Status;
    total?: number;
    senderAddress?: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientAddress?: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    items: Array<{
      id?: string;
      name?: string;
      price?: number;
      quantity?: number;
      total?: number;
    }>;
  };
};

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateInvoiceInput;
}>;

export type CreateInvoiceMutation = {
  createInvoice?: {
    id?: string;
    tag?: string;
    paymentDue?: string;
    clientName?: string;
    status?: Status;
    total?: number;
  };
};

export type UpdateInvoiceMutationVariables = Exact<{
  input: UpdateInvoiceInput;
  where: UniqueIdInput;
}>;

export type UpdateInvoiceMutation = {
  updateInvoice?: {
    updatedAt?: any;
    paymentDue?: string;
    tag?: string;
    description?: string;
    paymentTerms?: number;
    clientName?: string;
    clientEmail?: string;
    status?: Status;
    total?: number;
    senderAddress?: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    clientAddress?: {
      street: string;
      city: string;
      postCode: string;
      country: string;
    };
    items: Array<{
      id?: string;
      name?: string;
      quantity?: number;
      price?: number;
      total?: number;
    }>;
  };
};

export type DeleteInvoiceMutationVariables = Exact<{
  where: UniqueIdInput;
}>;

export type DeleteInvoiceMutation = { deleteInvoice?: { id?: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  user?: {
    id: string;
    photo?: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  register?: {
    accessToken: string;
    user: { id: string; photo?: string; firstName?: string; lastName?: string };
  };
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  login?: {
    accessToken: string;
    user: { id: string; photo?: string; firstName?: string; lastName?: string };
  };
};

export type RefreshAuthQueryVariables = Exact<{ [key: string]: never }>;

export type RefreshAuthQuery = { refreshAuth?: { accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: { message: string } };

export const GetInvoicesDocument = /*#__PURE__*/ `
    query GetInvoices {
  invoices {
    id
    tag
    paymentDue
    clientName
    status
    total
  }
}
    `;
export const useGetInvoicesQuery = <TData = GetInvoicesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetInvoicesQueryVariables,
  options?: UseQueryOptions<GetInvoicesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetInvoicesQuery, TError, TData>(
    variables === undefined ? ['GetInvoices'] : ['GetInvoices', variables],
    fetcher<GetInvoicesQuery, GetInvoicesQueryVariables>(
      client,
      GetInvoicesDocument,
      variables,
      headers
    ),
    options
  );

useGetInvoicesQuery.getKey = (variables?: GetInvoicesQueryVariables) =>
  variables === undefined ? ['GetInvoices'] : ['GetInvoices', variables];
useGetInvoicesQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetInvoicesQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetInvoicesQuery, GetInvoicesQueryVariables>(
    client,
    GetInvoicesDocument,
    variables,
    headers
  );
export const GetInvoiceDocument = /*#__PURE__*/ `
    query GetInvoice($where: UniqueIdInput!) {
  invoice(where: $where) {
    userId
    createdAt
    updatedAt
    paymentDue
    tag
    description
    paymentTerms
    clientName
    clientEmail
    status
    senderAddress {
      street
      city
      postCode
      country
    }
    clientAddress {
      street
      city
      postCode
      country
    }
    total
    items {
      id
      name
      price
      quantity
      total
    }
  }
}
    `;
export const useGetInvoiceQuery = <TData = GetInvoiceQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetInvoiceQueryVariables,
  options?: UseQueryOptions<GetInvoiceQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetInvoiceQuery, TError, TData>(
    ['GetInvoice', variables],
    fetcher<GetInvoiceQuery, GetInvoiceQueryVariables>(
      client,
      GetInvoiceDocument,
      variables,
      headers
    ),
    options
  );

useGetInvoiceQuery.getKey = (variables: GetInvoiceQueryVariables) => [
  'GetInvoice',
  variables,
];
useGetInvoiceQuery.fetcher = (
  client: GraphQLClient,
  variables: GetInvoiceQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetInvoiceQuery, GetInvoiceQueryVariables>(
    client,
    GetInvoiceDocument,
    variables,
    headers
  );
export const CreateInvoiceDocument = /*#__PURE__*/ `
    mutation CreateInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    id
    tag
    paymentDue
    clientName
    status
    total
  }
}
    `;
export const useCreateInvoiceMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateInvoiceMutation,
    TError,
    CreateInvoiceMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateInvoiceMutation,
    TError,
    CreateInvoiceMutationVariables,
    TContext
  >(
    ['CreateInvoice'],
    (variables?: CreateInvoiceMutationVariables) =>
      fetcher<CreateInvoiceMutation, CreateInvoiceMutationVariables>(
        client,
        CreateInvoiceDocument,
        variables,
        headers
      )(),
    options
  );
useCreateInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateInvoiceMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateInvoiceMutation, CreateInvoiceMutationVariables>(
    client,
    CreateInvoiceDocument,
    variables,
    headers
  );
export const UpdateInvoiceDocument = /*#__PURE__*/ `
    mutation UpdateInvoice($input: UpdateInvoiceInput!, $where: UniqueIdInput!) {
  updateInvoice(input: $input, where: $where) {
    updatedAt
    paymentDue
    tag
    description
    paymentTerms
    clientName
    clientEmail
    status
    senderAddress {
      street
      city
      postCode
      country
    }
    clientAddress {
      street
      city
      postCode
      country
    }
    total
    items {
      id
      name
      quantity
      price
      total
    }
  }
}
    `;
export const useUpdateInvoiceMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateInvoiceMutation,
    TError,
    UpdateInvoiceMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateInvoiceMutation,
    TError,
    UpdateInvoiceMutationVariables,
    TContext
  >(
    ['UpdateInvoice'],
    (variables?: UpdateInvoiceMutationVariables) =>
      fetcher<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(
        client,
        UpdateInvoiceDocument,
        variables,
        headers
      )(),
    options
  );
useUpdateInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateInvoiceMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(
    client,
    UpdateInvoiceDocument,
    variables,
    headers
  );
export const DeleteInvoiceDocument = /*#__PURE__*/ `
    mutation DeleteInvoice($where: UniqueIdInput!) {
  deleteInvoice(where: $where) {
    id
  }
}
    `;
export const useDeleteInvoiceMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteInvoiceMutation,
    TError,
    DeleteInvoiceMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteInvoiceMutation,
    TError,
    DeleteInvoiceMutationVariables,
    TContext
  >(
    ['DeleteInvoice'],
    (variables?: DeleteInvoiceMutationVariables) =>
      fetcher<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(
        client,
        DeleteInvoiceDocument,
        variables,
        headers
      )(),
    options
  );
useDeleteInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteInvoiceMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(
    client,
    DeleteInvoiceDocument,
    variables,
    headers
  );
export const GetUserDocument = /*#__PURE__*/ `
    query GetUser {
  user {
    id
    photo
    email
    firstName
    lastName
  }
}
    `;
export const useGetUserQuery = <TData = GetUserQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: GetUserQueryVariables,
  options?: UseQueryOptions<GetUserQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserQuery, TError, TData>(
    variables === undefined ? ['GetUser'] : ['GetUser', variables],
    fetcher<GetUserQuery, GetUserQueryVariables>(
      client,
      GetUserDocument,
      variables,
      headers
    ),
    options
  );

useGetUserQuery.getKey = (variables?: GetUserQueryVariables) =>
  variables === undefined ? ['GetUser'] : ['GetUser', variables];
useGetUserQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetUserQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserQuery, GetUserQueryVariables>(
    client,
    GetUserDocument,
    variables,
    headers
  );
export const RegisterDocument = /*#__PURE__*/ `
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    user {
      id
      photo
      firstName
      lastName
    }
  }
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ['Register'],
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        client,
        RegisterDocument,
        variables,
        headers
      )(),
    options
  );
useRegisterMutation.fetcher = (
  client: GraphQLClient,
  variables: RegisterMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<RegisterMutation, RegisterMutationVariables>(
    client,
    RegisterDocument,
    variables,
    headers
  );
export const LoginDocument = /*#__PURE__*/ `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      id
      photo
      firstName
      lastName
    }
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        client,
        LoginDocument,
        variables,
        headers
      )(),
    options
  );
useLoginMutation.fetcher = (
  client: GraphQLClient,
  variables: LoginMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LoginMutation, LoginMutationVariables>(
    client,
    LoginDocument,
    variables,
    headers
  );
export const RefreshAuthDocument = /*#__PURE__*/ `
    query RefreshAuth {
  refreshAuth {
    accessToken
  }
}
    `;
export const useRefreshAuthQuery = <TData = RefreshAuthQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: RefreshAuthQueryVariables,
  options?: UseQueryOptions<RefreshAuthQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<RefreshAuthQuery, TError, TData>(
    variables === undefined ? ['RefreshAuth'] : ['RefreshAuth', variables],
    fetcher<RefreshAuthQuery, RefreshAuthQueryVariables>(
      client,
      RefreshAuthDocument,
      variables,
      headers
    ),
    options
  );

useRefreshAuthQuery.getKey = (variables?: RefreshAuthQueryVariables) =>
  variables === undefined ? ['RefreshAuth'] : ['RefreshAuth', variables];
useRefreshAuthQuery.fetcher = (
  client: GraphQLClient,
  variables?: RefreshAuthQueryVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<RefreshAuthQuery, RefreshAuthQueryVariables>(
    client,
    RefreshAuthDocument,
    variables,
    headers
  );
export const LogoutDocument = /*#__PURE__*/ `
    mutation Logout {
  logout {
    message
  }
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    ['Logout'],
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        client,
        LogoutDocument,
        variables,
        headers
      )(),
    options
  );
useLogoutMutation.fetcher = (
  client: GraphQLClient,
  variables?: LogoutMutationVariables,
  headers?: RequestInit['headers']
) =>
  fetcher<LogoutMutation, LogoutMutationVariables>(
    client,
    LogoutDocument,
    variables,
    headers
  );
