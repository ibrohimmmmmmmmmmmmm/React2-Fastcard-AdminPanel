import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface UserRole {
  id: number
  name: string
}

export interface User {
  userId: number
  userName: string
  firstName: string | null
  lastName: string | null
  email: string
  phoneNumber: string | null
  dob: string | null
  image: string | null
  userRoles: UserRole[]
}

export interface UserListResponse {
  data: {
    userProfiles: User[]
    totalRecords: number
    totalPages: number
    currentPage: number
  }
  statusCode: number
  message: string
}

export const getUsers = async (
  pageNumber: number = 1,
  pageSize: number = 100,
  userName?: string
): Promise<User[]> => {
  const response = await api.get<UserListResponse>('/api/UserProfile/get-user-profiles', {
    params: {
      PageNumber: pageNumber,
      PageSize: pageSize,
      ...(userName && { UserName: userName }),
    },
  })

  return response.data?.data?.userProfiles ?? []
}
