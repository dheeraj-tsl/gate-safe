"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define user roles
export type UserRole = "admin" | "owner" | "tenant" | "security"

// Define permissions for each role
const rolePermissions = {
  admin: [
    "manage_users",
    "manage_buildings",
    "manage_notices",
    "manage_complaints",
    "manage_payments",
    "manage_amenities",
    "manage_security",
    "chat_with_all",
    "view_reports",
    "approve_visitors",
  ],
  owner: [
    "view_notices",
    "create_complaints",
    "view_payments",
    "make_payments",
    "book_amenities",
    "approve_visitors",
    "chat_with_admin",
  ],
  tenant: [
    "view_notices",
    "create_complaints",
    "view_payments",
    "make_payments",
    "book_amenities",
    "approve_visitors",
    "chat_with_admin",
  ],
  security: ["verify_visitors", "view_visitor_list", "chat_with_admin"],
}

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  flat?: string
  building?: string
  role: UserRole
  avatarUrl?: string
  permissions?: string[]
}

interface UserContextType {
  user: UserData | null
  updateUser: (data: Partial<UserData>) => void
  isLoggedIn: boolean
  login: (data: UserData) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
}

// Sample users for different roles
const sampleUsers = {
  admin: {
    id: "admin-001",
    name: "Admin User",
    email: "admin@gatesafe.com",
    phone: "+91 98765 43210",
    role: "admin" as UserRole,
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AU",
    permissions: rolePermissions.admin,
  },
  owner: {
    id: "owner-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    phone: "+91 98765 43210",
    flat: "B-404",
    building: "Sunshine Apartments",
    role: "owner" as UserRole,
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RK",
    permissions: rolePermissions.owner,
  },
  tenant: {
    id: "tenant-001",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 87654 32109",
    flat: "A-202",
    building: "Sunshine Apartments",
    role: "tenant" as UserRole,
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
    permissions: rolePermissions.tenant,
  },
  security: {
    id: "security-001",
    name: "Suresh Guard",
    email: "security@gatesafe.com",
    phone: "+91 76543 21098",
    role: "security" as UserRole,
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SG",
    permissions: rolePermissions.security,
  },
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("gatesafe_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const updateUser = (data: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("gatesafe_user", JSON.stringify(updatedUser))
    }
  }

  const login = (data: UserData) => {
    // Add permissions based on role
    const userWithPermissions = {
      ...data,
      permissions: rolePermissions[data.role] || [],
    }

    setUser(userWithPermissions)
    setIsLoggedIn(true)
    localStorage.setItem("gatesafe_user", JSON.stringify(userWithPermissions))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("gatesafe_user")
  }

  const hasPermission = (permission: string) => {
    if (!user || !user.permissions) return false
    return user.permissions.includes(permission)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, isLoggedIn, login, logout, hasPermission }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Helper function to get sample user data
export const getSampleUser = (role: UserRole) => {
  return sampleUsers[role]
}

