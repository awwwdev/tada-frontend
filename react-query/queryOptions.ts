import { queryOptions } from '@tanstack/react-query'

const API = process.env.NEXT_PUBLIC_API_URL;

export const allTasksQueryOptions = queryOptions({
  queryKey: ['list'],
  queryFn: async () => {
    const response = await fetch(API + '/v0/list/all');
    return response.json()
  },
})