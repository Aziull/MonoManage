import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const { authToken } = (getState() as RootState).authToken
    if (authToken) {
      headers.set('X-Token', `${authToken}`)
    }

    return headers
  },
})
