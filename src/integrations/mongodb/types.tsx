// MongoDB Types for the application

export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  profession?: string;
  course: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingLink {
  _id: string;
  course: string;
  link: string;
  date?: string | Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  registrationId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  razorpayOrderId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface CreateOrderRequest {
  name: string;
  email: string;
  phone_number: string;
  course: string;
}

export interface CreateOrderResponse {
  orderId: string;
  registrationId: string;
  razorpayKeyId: string;
  amount: number;
  courseName: string;
}

export interface VerifyPaymentRequest {
  order_id: string;
  payment_id: string;
  signature: string;
  registration_id: string;
  course_id: string;
}

export interface VerifyPaymentResponse {
  verified: boolean;
  registration: Registration;
} 