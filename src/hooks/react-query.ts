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
export interface AddressType {
  /** The city where the person lives in */
  city: Scalars['String'];
  /** The country where the person is located */
  country: Scalars['String'];
  /** The post code of the person's state */
  postCode: Scalars['String'];
  /** The street where the person resides */
  street: Scalars['String'];
}

export interface AddressInputType {
  /** The city where the person lives in */
  city: Scalars['String'];
  /** The country where the person is located */
  country: Scalars['String'];
  /** The post code of the person's state */
  postCode: Scalars['String'];
  /** The street where the person resides */
  street: Scalars['String'];
}

export interface AuthPayloadType {
  accessToken: Scalars['String'];
  user: UserType;
}

export interface CreateInvoiceInputType {
  clientAddress: AddressInputType;
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  description: Scalars['String'];
  /** The exact date and time the invoice was issued in ISO8601 */
  issueDate: Scalars['DateTime'];
  items: Array<InvoiceItemInputType>;
  paymentDue: Scalars['String'];
  paymentTerms: Scalars['Int'];
  senderAddress: AddressInputType;
  status: Scalars['String'];
  tag: Scalars['String'];
  total: Scalars['Float'];
  userId?: InputMaybe<Scalars['ID']>;
}

/** The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera */
export interface InvoiceType {
  /** The address of the person receiving the invoice */
  clientAddress?: Maybe<AddressType>;
  /** The email of the person receiving the invoice */
  clientEmail?: Maybe<Scalars['String']>;
  /** The name of the person receiving the invoice */
  clientName?: Maybe<Scalars['String']>;
  /** The exact time the invoice was created */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** A high level description of the items listed in the invoice */
  description?: Maybe<Scalars['String']>;
  /** The GUID for the Invoice */
  id?: Maybe<Scalars['ID']>;
  /** The exact date and time the invoice was issued in ISO8601 */
  issueDate?: Maybe<Scalars['DateTime']>;
  /** The items listed in the invoice */
  items: Array<InvoiceItemType>;
  /** When the payment of the items listed in the invoice is due */
  paymentDue?: Maybe<Scalars['String']>;
  /** The number of days before an invoice's payment grace period expires. Can be 1, 7, 14 or 30 days */
  paymentTerms?: Maybe<Scalars['Int']>;
  /** The address of the person sending the invoice */
  senderAddress?: Maybe<AddressType>;
  /** The current status of the invoice */
  status?: Maybe<Scalars['String']>;
  /** Unique id sequence used to tag the invoice */
  tag?: Maybe<Scalars['String']>;
  /** The grand total of the price of the items listed in the invoice */
  total?: Maybe<Scalars['Float']>;
  /** The exact time the invoice was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The GUID of the invoice's issuer */
  userId?: Maybe<Scalars['ID']>;
}

/** An item listed in the invoice */
export interface InvoiceItemType {
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

export interface InvoiceItemInputType {
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  total: Scalars['Float'];
}

export interface LoginInputType {
  /** The email of the user */
  email: Scalars['String'];
  /** The password of the user */
  password: Scalars['String'];
}

export interface LogoutPayloadType {
  message: Scalars['String'];
}

export interface MutationType {
  createInvoice?: Maybe<InvoiceType>;
  deleteInvoice?: Maybe<InvoiceType>;
  login?: Maybe<AuthPayloadType>;
  logout: LogoutPayloadType;
  register?: Maybe<AuthPayloadType>;
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
  refreshAuth?: Maybe<RefreshPayloadType>;
  user?: Maybe<UserType>;
}

export interface QueryInvoiceArgsType {
  where: UniqueIdInputType;
}

export interface RefreshPayloadType {
  accessToken: Scalars['String'];
}

export interface RegisterInputType {
  /** The user's verification code */
  code?: InputMaybe<Scalars['String']>;
  /** The email of the user */
  email: Scalars['String'];
  /** The password of the user. Must match the countersign i.e the reentered password */
  password: Scalars['String'];
  /** The image url generated from the user's email address */
  photo?: InputMaybe<Scalars['String']>;
}

export interface UniqueIdInputType {
  id: Scalars['ID'];
}

export interface UniqueIdWithUserIdType {
  id: Scalars['ID'];
  userId: Scalars['ID'];
}

export interface UniqueUserIdType {
  userId: Scalars['ID'];
}

export interface UpdateInvoiceInputType {
  clientAddress: AddressInputType;
  clientEmail: Scalars['String'];
  clientName: Scalars['String'];
  description: Scalars['String'];
  items: Array<InvoiceItemInputType>;
  paymentDue: Scalars['String'];
  paymentTerms: Scalars['Int'];
  senderAddress: AddressInputType;
  status: Scalars['String'];
  total: Scalars['Float'];
}

export interface UserType {
  /** The user's verification code */
  code?: Maybe<Scalars['String']>;
  /** The exact time the user was created */
  createdAt: Scalars['DateTime'];
  /** The email of the user */
  email: Scalars['String'];
  /** The GUID for the User */
  id: Scalars['ID'];
  /** The password of the user */
  password?: Maybe<Scalars['String']>;
  /** The avatar of the user */
  photo?: Maybe<Scalars['String']>;
  /** The exact time the user was updated */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** Defines whether the user is verifed or not */
  verified?: Maybe<Scalars['Boolean']>;
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

export type GetUserQueryVariablesType = Exact<{ [key: string]: never }>;

export type GetUserQueryType = {
  user?: { id: string; photo?: string; email: string };
};

export type RegisterMutationVariablesType = Exact<{
  input: RegisterInputType;
}>;

export type RegisterMutationType = {
  register?: { accessToken: string; user: { id: string; photo?: string } };
};

export type LoginMutationVariablesType = Exact<{
  input: LoginInputType;
}>;

export type LoginMutationType = {
  login?: { accessToken: string; user: { id: string; photo?: string } };
};

export type RefreshAuthQueryVariablesType = Exact<{ [key: string]: never }>;

export type RefreshAuthQueryType = { refreshAuth?: { accessToken: string } };

export type LogoutMutationVariablesType = Exact<{ [key: string]: never }>;

export type LogoutMutationType = { logout: { message: string } };

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
export const GetUserDocumentType = /*#__PURE__*/ `
    query GetUser {
  user {
    id
    photo
    email
  }
}
    `;
export const useGetUserQuery = <TData = GetUserQueryType, TError = unknown>(
  client: GraphQLClient,
  variables?: GetUserQueryVariablesType,
  options?: UseQueryOptions<GetUserQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<GetUserQueryType, TError, TData>(
    variables === undefined ? ['GetUser'] : ['GetUser', variables],
    fetcher<GetUserQueryType, GetUserQueryVariablesType>(
      client,
      GetUserDocumentType,
      variables,
      headers
    ),
    options
  );

useGetUserQuery.getKey = (variables?: GetUserQueryVariablesType) =>
  variables === undefined ? ['GetUser'] : ['GetUser', variables];
useGetUserQuery.fetcher = (
  client: GraphQLClient,
  variables?: GetUserQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<GetUserQueryType, GetUserQueryVariablesType>(
    client,
    GetUserDocumentType,
    variables,
    headers
  );
export const RegisterDocumentType = /*#__PURE__*/ `
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    user {
      id
      photo
    }
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
    accessToken
    user {
      id
      photo
    }
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
export const RefreshAuthDocumentType = /*#__PURE__*/ `
    query RefreshAuth {
  refreshAuth {
    accessToken
  }
}
    `;
export const useRefreshAuthQuery = <
  TData = RefreshAuthQueryType,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: RefreshAuthQueryVariablesType,
  options?: UseQueryOptions<RefreshAuthQueryType, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<RefreshAuthQueryType, TError, TData>(
    variables === undefined ? ['RefreshAuth'] : ['RefreshAuth', variables],
    fetcher<RefreshAuthQueryType, RefreshAuthQueryVariablesType>(
      client,
      RefreshAuthDocumentType,
      variables,
      headers
    ),
    options
  );

useRefreshAuthQuery.getKey = (variables?: RefreshAuthQueryVariablesType) =>
  variables === undefined ? ['RefreshAuth'] : ['RefreshAuth', variables];
useRefreshAuthQuery.fetcher = (
  client: GraphQLClient,
  variables?: RefreshAuthQueryVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<RefreshAuthQueryType, RefreshAuthQueryVariablesType>(
    client,
    RefreshAuthDocumentType,
    variables,
    headers
  );
export const LogoutDocumentType = /*#__PURE__*/ `
    mutation Logout {
  logout {
    message
  }
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LogoutMutationType,
    TError,
    LogoutMutationVariablesType,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    LogoutMutationType,
    TError,
    LogoutMutationVariablesType,
    TContext
  >(
    ['Logout'],
    (variables?: LogoutMutationVariablesType) =>
      fetcher<LogoutMutationType, LogoutMutationVariablesType>(
        client,
        LogoutDocumentType,
        variables,
        headers
      )(),
    options
  );
useLogoutMutation.getKey = () => ['Logout'];

useLogoutMutation.fetcher = (
  client: GraphQLClient,
  variables?: LogoutMutationVariablesType,
  headers?: RequestInit['headers']
) =>
  fetcher<LogoutMutationType, LogoutMutationVariablesType>(
    client,
    LogoutDocumentType,
    variables,
    headers
  );
