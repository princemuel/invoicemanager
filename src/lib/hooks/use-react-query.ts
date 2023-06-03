import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { GraphQLClient } from 'graphql-request';
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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
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
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
}

/** The address object used for both the client and sender's address information. It contains the person's street, city, post code and country data */
export interface AddressType {
  /** The city where the person lives in */
  city: Scalars['String']['output'];
  /** The country where the person is located */
  country: Scalars['String']['output'];
  /** The post code of the person's state */
  postCode: Scalars['String']['output'];
  /** The street where the person resides */
  street: Scalars['String']['output'];
}

export interface AddressInputType {
  /** The city where the person lives in */
  city: Scalars['String']['input'];
  /** The country where the person is located */
  country: Scalars['String']['input'];
  /** The post code of the person's state */
  postCode: Scalars['String']['input'];
  /** The street where the person resides */
  street: Scalars['String']['input'];
}

export interface AuthPayloadType {
  token: Scalars['String']['output'];
}

export interface CreateInvoiceInputType {
  clientAddress: AddressInputType;
  clientEmail: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  /** The exact date and time the invoice was issued in ISO8601 */
  issueDate: Scalars['DateTime']['input'];
  items: Array<InvoiceItemInputType>;
  paymentDue: Scalars['String']['input'];
  paymentTerms: Scalars['Int']['input'];
  senderAddress: AddressInputType;
  status: Scalars['String']['input'];
  tag: Scalars['String']['input'];
  total: Scalars['Float']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}

/** The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera */
export interface InvoiceType {
  /** The address of the person receiving the invoice */
  clientAddress?: Maybe<AddressType>;
  /** The email of the person receiving the invoice */
  clientEmail?: Maybe<Scalars['String']['output']>;
  /** The name of the person receiving the invoice */
  clientName?: Maybe<Scalars['String']['output']>;
  /** The exact time the invoice was created */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** A high level description of the items listed in the invoice */
  description?: Maybe<Scalars['String']['output']>;
  /** The GUID for the Invoice */
  id?: Maybe<Scalars['ID']['output']>;
  /** The exact date and time the invoice was issued in ISO8601 */
  issueDate?: Maybe<Scalars['DateTime']['output']>;
  /** The items listed in the invoice */
  items: Array<InvoiceItemType>;
  /** When the payment of the items listed in the invoice is due */
  paymentDue?: Maybe<Scalars['String']['output']>;
  /** The number of days before an invoice's payment grace period expires. Can be 1, 7, 14 or 30 days */
  paymentTerms?: Maybe<Scalars['Int']['output']>;
  /** The address of the person sending the invoice */
  senderAddress?: Maybe<AddressType>;
  /** The current status of the invoice */
  status?: Maybe<Scalars['String']['output']>;
  /** Unique id sequence used to tag the invoice */
  tag?: Maybe<Scalars['String']['output']>;
  /** The grand total of the price of the items listed in the invoice */
  total?: Maybe<Scalars['Float']['output']>;
  /** The exact time the invoice was updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The GUID of the invoice's issuer */
  userId?: Maybe<Scalars['ID']['output']>;
}

/** An item listed in the invoice */
export interface InvoiceItemType {
  /** The id of this item */
  id?: Maybe<Scalars['ID']['output']>;
  /** The name of this item */
  name?: Maybe<Scalars['String']['output']>;
  /** The price of this item */
  price?: Maybe<Scalars['Float']['output']>;
  /** The amount of this item purchased */
  quantity?: Maybe<Scalars['Int']['output']>;
  /** The price of this item multiplied by the total number of this item purchased */
  total?: Maybe<Scalars['Float']['output']>;
}

export interface InvoiceItemInputType {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
}

export interface LoginInputType {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
}

export interface MessagePayloadType {
  message: Scalars['String']['output'];
}

export interface MutationType {
  createInvoice?: Maybe<InvoiceType>;
  deleteInvoice?: Maybe<InvoiceType>;
  login?: Maybe<AuthPayloadType>;
  register?: Maybe<MessagePayloadType>;
  updateInvoice?: Maybe<InvoiceType>;
}

export interface MutationCreateInvoiceArgsType {
  input: CreateInvoiceInputType;
}

export interface MutationDeleteInvoiceArgsType {
  where: UniqueIdInputType;
}

export interface MutationLoginArgsType {
  input: LoginInputType;
}

export interface MutationRegisterArgsType {
  input: RegisterInputType;
}

export interface MutationUpdateInvoiceArgsType {
  input: UpdateInvoiceInputType;
  where: UniqueIdInputType;
}

export interface QueryType {
  invoice?: Maybe<InvoiceType>;
  invoices: Array<Maybe<InvoiceType>>;
  logout: MessagePayloadType;
  refresh?: Maybe<AuthPayloadType>;
}

export interface QueryInvoiceArgsType {
  where: UniqueIdInputType;
}

export interface RegisterInputType {
  /** The user's verification code */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user. Must match the countersign i.e the reentered password */
  password: Scalars['String']['input'];
  /** The image url generated from the user's email address */
  photo?: InputMaybe<Scalars['String']['input']>;
}

export interface UniqueIdInputType {
  id: Scalars['ID']['input'];
}

export interface UniqueIdWithUserIdType {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}

export interface UniqueUserIdType {
  userId: Scalars['ID']['input'];
}

export interface UpdateInvoiceInputType {
  clientAddress: AddressInputType;
  clientEmail: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  items: Array<InvoiceItemInputType>;
  paymentDue: Scalars['String']['input'];
  paymentTerms: Scalars['Int']['input'];
  senderAddress: AddressInputType;
  status: Scalars['String']['input'];
  total: Scalars['Float']['input'];
}

export interface UserType {
  /** The user's verification code */
  code?: Maybe<Scalars['String']['output']>;
  /** The exact time the user was created */
  createdAt: Scalars['DateTime']['output'];
  /** The email of the user */
  email: Scalars['String']['output'];
  /** The GUID for the User */
  id: Scalars['ID']['output'];
  /** The password of the user */
  password?: Maybe<Scalars['String']['output']>;
  /** The avatar of the user */
  photo?: Maybe<Scalars['String']['output']>;
  /** The exact time the user was updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Defines whether the user is verifed or not */
  verified?: Maybe<Scalars['Boolean']['output']>;
}

export type GetInvoicesQueryVariablesType = Exact<{ [key: string]: never }>;

export type GetInvoicesQueryType = {
  invoices: Array<{
    id?: string;
    tag?: string;
    paymentDue?: string;
    clientName?: string;
    status?: string;
    total?: number;
  }>;
};

export type GetInvoiceQueryVariablesType = Exact<{
  where: UniqueIdInputType;
}>;

export type GetInvoiceQueryType = {
  invoice?: {
    userId?: string;
    createdAt?: any;
    issueDate?: any;
    paymentDue?: string;
    tag?: string;
    description?: string;
    paymentTerms?: number;
    clientName?: string;
    clientEmail?: string;
    status?: string;
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

export type CreateInvoiceMutationVariablesType = Exact<{
  input: CreateInvoiceInputType;
}>;

export type CreateInvoiceMutationType = {
  createInvoice?: {
    id?: string;
    tag?: string;
    paymentDue?: string;
    clientName?: string;
    status?: string;
    total?: number;
  };
};

export type UpdateInvoiceMutationVariablesType = Exact<{
  input: UpdateInvoiceInputType;
  where: UniqueIdInputType;
}>;

export type UpdateInvoiceMutationType = {
  updateInvoice?: {
    issueDate?: any;
    paymentDue?: string;
    tag?: string;
    description?: string;
    paymentTerms?: number;
    clientName?: string;
    clientEmail?: string;
    status?: string;
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

export type DeleteInvoiceMutationVariablesType = Exact<{
  where: UniqueIdInputType;
}>;

export type DeleteInvoiceMutationType = { deleteInvoice?: { id?: string } };

export type RegisterMutationVariablesType = Exact<{
  input: RegisterInputType;
}>;

export type RegisterMutationType = { register?: { message: string } };

export type LoginMutationVariablesType = Exact<{
  input: LoginInputType;
}>;

export type LoginMutationType = { login?: { token: string } };

export type RefreshQueryVariablesType = Exact<{ [key: string]: never }>;

export type RefreshQueryType = { refresh?: { token: string } };

export type LogoutQueryVariablesType = Exact<{ [key: string]: never }>;

export type LogoutQueryType = { logout: { message: string } };

export const GetInvoicesDocumentType = /*#__PURE__*/ `
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
export const useGetInvoicesQuery = <
  TData = GetInvoicesQueryType,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetInvoicesQueryVariablesType,
  options?: UseQueryOptions<GetInvoicesQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetInvoicesQueryType, TError, TData>(
    variables === undefined ? ['GetInvoices'] : ['GetInvoices', variables],
    fetcher<GetInvoicesQueryType, GetInvoicesQueryVariablesType>(
      client,
      GetInvoicesDocumentType,
      variables,
      headers
    ),
    options
  );

useGetInvoicesQuery.getKey = (variables?: GetInvoicesQueryVariablesType) =>
  variables === undefined ? ['GetInvoices'] : ['GetInvoices', variables];
useGetInvoicesQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetInvoicesQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<GetInvoicesQueryType, GetInvoicesQueryVariablesType>(
    client,
    GetInvoicesDocumentType,
    variables,
    headers
  );
export const GetInvoiceDocumentType = /*#__PURE__*/ `
    query GetInvoice($where: UniqueIdInput!) {
  invoice(where: $where) {
    userId
    createdAt
    issueDate
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
export const useGetInvoiceQuery = <
  TData = GetInvoiceQueryType,
  TError = unknown
>(
  client: GraphQLClient,
  variables: GetInvoiceQueryVariablesType,
  options?: UseQueryOptions<GetInvoiceQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetInvoiceQueryType, TError, TData>(
    ['GetInvoice', variables],
    fetcher<GetInvoiceQueryType, GetInvoiceQueryVariablesType>(
      client,
      GetInvoiceDocumentType,
      variables,
      headers
    ),
    options
  );

useGetInvoiceQuery.getKey = (variables: GetInvoiceQueryVariablesType) => [
  'GetInvoice',
  variables,
];
useGetInvoiceQuery.fetcher = (
  client: GraphQLClient,
  variables: GetInvoiceQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<GetInvoiceQueryType, GetInvoiceQueryVariablesType>(
    client,
    GetInvoiceDocumentType,
    variables,
    headers
  );
export const CreateInvoiceDocumentType = /*#__PURE__*/ `
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
    CreateInvoiceMutationType,
    TError,
    CreateInvoiceMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    CreateInvoiceMutationType,
    TError,
    CreateInvoiceMutationVariablesType,
    TContext
  >(
    ['CreateInvoice'],
    (variables?: CreateInvoiceMutationVariablesType) =>
      fetcher<CreateInvoiceMutationType, CreateInvoiceMutationVariablesType>(
        client,
        CreateInvoiceDocumentType,
        variables,
        headers
      )(),
    options
  );
useCreateInvoiceMutation.getKey = () => ['CreateInvoice'];

useCreateInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: CreateInvoiceMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<CreateInvoiceMutationType, CreateInvoiceMutationVariablesType>(
    client,
    CreateInvoiceDocumentType,
    variables,
    headers
  );
export const UpdateInvoiceDocumentType = /*#__PURE__*/ `
    mutation UpdateInvoice($input: UpdateInvoiceInput!, $where: UniqueIdInput!) {
  updateInvoice(input: $input, where: $where) {
    issueDate
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
    UpdateInvoiceMutationType,
    TError,
    UpdateInvoiceMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateInvoiceMutationType,
    TError,
    UpdateInvoiceMutationVariablesType,
    TContext
  >(
    ['UpdateInvoice'],
    (variables?: UpdateInvoiceMutationVariablesType) =>
      fetcher<UpdateInvoiceMutationType, UpdateInvoiceMutationVariablesType>(
        client,
        UpdateInvoiceDocumentType,
        variables,
        headers
      )(),
    options
  );
useUpdateInvoiceMutation.getKey = () => ['UpdateInvoice'];

useUpdateInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: UpdateInvoiceMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<UpdateInvoiceMutationType, UpdateInvoiceMutationVariablesType>(
    client,
    UpdateInvoiceDocumentType,
    variables,
    headers
  );
export const DeleteInvoiceDocumentType = /*#__PURE__*/ `
    mutation DeleteInvoice($where: UniqueIdInput!) {
  deleteInvoice(where: $where) {
    id
  }
}
    `;
export const useDeleteInvoiceMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteInvoiceMutationType,
    TError,
    DeleteInvoiceMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    DeleteInvoiceMutationType,
    TError,
    DeleteInvoiceMutationVariablesType,
    TContext
  >(
    ['DeleteInvoice'],
    (variables?: DeleteInvoiceMutationVariablesType) =>
      fetcher<DeleteInvoiceMutationType, DeleteInvoiceMutationVariablesType>(
        client,
        DeleteInvoiceDocumentType,
        variables,
        headers
      )(),
    options
  );
useDeleteInvoiceMutation.getKey = () => ['DeleteInvoice'];

useDeleteInvoiceMutation.fetcher = (
  client: GraphQLClient,
  variables: DeleteInvoiceMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<DeleteInvoiceMutationType, DeleteInvoiceMutationVariablesType>(
    client,
    DeleteInvoiceDocumentType,
    variables,
    headers
  );
export const RegisterDocumentType = /*#__PURE__*/ `
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    message
  }
}
    `;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RegisterMutationType,
    TError,
    RegisterMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    RegisterMutationType,
    TError,
    RegisterMutationVariablesType,
    TContext
  >(
    ['Register'],
    (variables?: RegisterMutationVariablesType) =>
      fetcher<RegisterMutationType, RegisterMutationVariablesType>(
        client,
        RegisterDocumentType,
        variables,
        headers
      )(),
    options
  );
useRegisterMutation.getKey = () => ['Register'];

useRegisterMutation.fetcher = (
  client: GraphQLClient,
  variables: RegisterMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<RegisterMutationType, RegisterMutationVariablesType>(
    client,
    RegisterDocumentType,
    variables,
    headers
  );
export const LoginDocumentType = /*#__PURE__*/ `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginMutationType,
    TError,
    LoginMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<LoginMutationType, TError, LoginMutationVariablesType, TContext>(
    ['Login'],
    (variables?: LoginMutationVariablesType) =>
      fetcher<LoginMutationType, LoginMutationVariablesType>(
        client,
        LoginDocumentType,
        variables,
        headers
      )(),
    options
  );
useLoginMutation.getKey = () => ['Login'];

useLoginMutation.fetcher = (
  client: GraphQLClient,
  variables: LoginMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<LoginMutationType, LoginMutationVariablesType>(
    client,
    LoginDocumentType,
    variables,
    headers
  );
export const RefreshDocumentType = /*#__PURE__*/ `
    query Refresh {
  refresh {
    token
  }
}
    `;
export const useRefreshQuery = <TData = RefreshQueryType, TError = unknown>(
  client: GraphQLClient,
  variables?: RefreshQueryVariablesType,
  options?: UseQueryOptions<RefreshQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<RefreshQueryType, TError, TData>(
    variables === undefined ? ['Refresh'] : ['Refresh', variables],
    fetcher<RefreshQueryType, RefreshQueryVariablesType>(
      client,
      RefreshDocumentType,
      variables,
      headers
    ),
    options
  );

useRefreshQuery.getKey = (variables?: RefreshQueryVariablesType) =>
  variables === undefined ? ['Refresh'] : ['Refresh', variables];
useRefreshQuery.fetcher = (
  client: GraphQLClient,
  variables?: RefreshQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<RefreshQueryType, RefreshQueryVariablesType>(
    client,
    RefreshDocumentType,
    variables,
    headers
  );
export const LogoutDocumentType = /*#__PURE__*/ `
    query Logout {
  logout {
    message
  }
}
    `;
export const useLogoutQuery = <TData = LogoutQueryType, TError = unknown>(
  client: GraphQLClient,
  variables?: LogoutQueryVariablesType,
  options?: UseQueryOptions<LogoutQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<LogoutQueryType, TError, TData>(
    variables === undefined ? ['Logout'] : ['Logout', variables],
    fetcher<LogoutQueryType, LogoutQueryVariablesType>(
      client,
      LogoutDocumentType,
      variables,
      headers
    ),
    options
  );

useLogoutQuery.getKey = (variables?: LogoutQueryVariablesType) =>
  variables === undefined ? ['Logout'] : ['Logout', variables];
useLogoutQuery.fetcher = (
  client: GraphQLClient,
  variables?: LogoutQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<LogoutQueryType, LogoutQueryVariablesType>(
    client,
    LogoutDocumentType,
    variables,
    headers
  );
