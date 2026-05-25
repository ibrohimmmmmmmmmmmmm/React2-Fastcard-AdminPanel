import { useEffect, useMemo, useState } from 'react'
import { Search, Mail, Phone, User as UserIcon } from 'lucide-react'

import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { getUsers, type User } from '../../lib/userApi'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await getUsers(1, 100, searchTerm || undefined)
      setUsers(response)
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to load users.' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (toast) {
      const timeout = window.setTimeout(() => setToast(null), 3000)
      return () => window.clearTimeout(timeout)
    }
  }, [toast])

  useEffect(() => {
    setSelectedRows((current) =>
      current.filter((id) => users.some((user) => user.userId === id))
    )
  }, [users])

  const visibleUsers = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()
    if (!normalizedTerm) {
      return users
    }

    return users.filter(
      (user) =>
        user.userName.toLowerCase().includes(normalizedTerm) ||
        user.email.toLowerCase().includes(normalizedTerm) ||
        (user.firstName?.toLowerCase().includes(normalizedTerm) ?? false) ||
        (user.lastName?.toLowerCase().includes(normalizedTerm) ?? false)
    )
  }, [users, searchTerm])

  const isAllSelected =
    visibleUsers.length > 0 &&
    visibleUsers.every((user) => selectedRows.includes(user.userId))

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    if (isAllSelected) {
      setSelectedRows([])
      return
    }

    setSelectedRows(visibleUsers.map((user) => user.userId))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {isLoading && (
        <div className="mb-4 text-sm text-slate-500">Loading users...</div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            disabled={isLoading}
          />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={isAllSelected} onCheckedChange={toggleAllRows} />
              </TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Roles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {isLoading ? 'Loading...' : 'No users found'}
                </TableCell>
              </TableRow>
            ) : (
              visibleUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(user.userId)}
                      onCheckedChange={() => toggleRow(user.userId)}
                    />
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-3">
                    {user.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}uploads/${user.image}`}
                        alt={user.userName}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center">
                        <UserIcon size={18} className="text-slate-400" />
                      </div>
                    )}
                    {user.userName}
                  </TableCell>
                  <TableCell>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.firstName || user.lastName || '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.phoneNumber ? (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-slate-400" />
                        {user.phoneNumber}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.userRoles.map((role) => (
                        <span
                          key={role.id}
                          className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                        >
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-4 py-3 text-sm shadow-xl ${
            toast.type === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}
