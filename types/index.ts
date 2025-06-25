/**
 * Type definitions following clean code principles
 * Organized by domain with comprehensive interfaces and clear naming
 */

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

/**
 * Navigation item structure for menu items
 * Used in navbar and footer navigation
 */
export interface NavigationItem {
  href: string;
  label: string;
  ariaLabel: string;
}

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

/**
 * User role hierarchy with clear permission levels
 * Used throughout the application for access control
 */
export type UserRole = 'visitor' | 'client' | 'support' | 'admin' | 'superadmin';

/**
 * User role information with permission level
 * Enables role-based access control throughout the application
 */
export interface UserRoleInfo {
  level: number;
  label: string;
  permissions: string[];
}

/**
 * Complete user profile information
 * Central interface for all user-related data
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: UserAddress;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
}

/**
 * User address information
 * Structured address data for billing and contact purposes
 */
export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

/**
 * User preferences and settings
 * Customizable user experience settings
 */
export interface UserPreferences {
  language: string;
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'auto';
}

/**
 * User authentication credentials
 * Used for login and registration processes
 */
export interface UserCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * User registration data
 * Complete information required for new user registration
 */
export interface UserRegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

// ============================================================================
// VENUE AND HALL TYPES
// ============================================================================

/**
 * Hall amenity categories for better organization
 * Helps in filtering and displaying hall features
 */
export type HallAmenityCategory = 
  | 'audio_visual'
  | 'catering'
  | 'decoration'
  | 'accessibility'
  | 'parking'
  | 'security'
  | 'comfort';

/**
 * Individual hall amenity with detailed information
 * Provides comprehensive amenity descriptions
 */
export interface HallAmenity {
  id: string;
  name: string;
  description: string;
  category: HallAmenityCategory;
  isIncluded: boolean;
  additionalCost?: number;
  icon?: string;
}

/**
 * Hall pricing structure with flexible options
 * Supports various pricing models and packages
 */
export interface HallPricing {
  basePrice: number;
  currency: string;
  pricingType: 'per_event' | 'per_hour' | 'per_guest';
  minimumBookingHours?: number;
  weekendSurcharge?: number;
  holidaySurcharge?: number;
  seasonalPricing?: SeasonalPricing[];
  packageDeals?: PricingPackage[];
}

/**
 * Seasonal pricing variations
 * Allows for dynamic pricing based on demand
 */
export interface SeasonalPricing {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  priceMultiplier: number;
  description: string;
}

/**
 * Pricing package options
 * Pre-configured packages for common event types
 */
export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  includedServices: string[];
  maxGuests: number;
  durationHours: number;
  isPopular: boolean;
}

/**
 * Complete hall information
 * Comprehensive venue details for booking decisions
 */
export interface HallDetails {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  capacity: HallCapacity;
  pricing: HallPricing;
  images: HallImage[];
  amenities: HallAmenity[];
  location: VenueLocation;
  availability: HallAvailability;
  policies: VenuePolicies;
  contactInfo: VenueContactInfo;
  ratings: VenueRatings;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isFeatured: boolean;
}

/**
 * Hall capacity information with flexible configurations
 * Supports different seating arrangements and layouts
 */
export interface HallCapacity {
  maximum: number;
  minimum: number;
  recommended: number;
  seatingArrangements: SeatingArrangement[];
}

/**
 * Different seating arrangement options
 * Provides flexibility for various event types
 */
export interface SeatingArrangement {
  id: string;
  name: string;
  description: string;
  capacity: number;
  layout: string; // URL to layout diagram
  isDefault: boolean;
}

/**
 * Hall image with metadata
 * Organized image gallery for better presentation
 */
export interface HallImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  category: 'interior' | 'exterior' | 'setup' | 'event' | 'amenity';
  altText: string;
  sortOrder: number;
  createdAt: Date;
}

/**
 * Venue location with comprehensive address information
 * Includes geographic data for mapping and directions
 */
export interface VenueLocation {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  landmarks: string[];
  parkingInstructions: string;
  publicTransportInfo: string;
}

/**
 * Hall availability and scheduling information
 * Manages booking calendar and time slots
 */
export interface HallAvailability {
  isAvailable: boolean;
  operatingHours: OperatingHours;
  blackoutDates: Date[];
  maintenanceDates: Date[];
  specialAvailability: SpecialAvailability[];
}

/**
 * Operating hours for different days
 * Flexible scheduling for various business models
 */
export interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

/**
 * Daily schedule with multiple time slots
 * Supports complex scheduling requirements
 */
export interface DaySchedule {
  isOpen: boolean;
  timeSlots: TimeSlot[];
}

/**
 * Individual time slot for bookings
 * Granular time management for precise scheduling
 */
export interface TimeSlot {
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
  priceMultiplier?: number;
}

/**
 * Special availability for holidays or events
 * Handles exceptional scheduling scenarios
 */
export interface SpecialAvailability {
  date: Date;
  isAvailable: boolean;
  specialHours?: TimeSlot[];
  reason: string;
  priceMultiplier?: number;
}

/**
 * Venue policies and terms
 * Clear guidelines for bookings and events
 */
export interface VenuePolicies {
  cancellationPolicy: string;
  refundPolicy: string;
  securityDeposit: number;
  cleaningFee: number;
  overtimeFee: number;
  damagePolicy: string;
  alcoholPolicy: string;
  smokingPolicy: string;
  decorationGuidelines: string;
  soundLimitations: string;
}

/**
 * Venue contact information
 * Multiple contact methods for customer support
 */
export interface VenueContactInfo {
  primaryPhone: string;
  secondaryPhone?: string;
  email: string;
  website?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  emergencyContact: string;
}

/**
 * Venue ratings and reviews summary
 * Aggregated feedback for decision making
 */
export interface VenueRatings {
  overall: number;
  totalReviews: number;
  breakdown: {
    service: number;
    cleanliness: number;
    value: number;
    location: number;
    amenities: number;
  };
  recentReviews: CustomerReview[];
}

// ============================================================================
// BOOKING AND EVENT TYPES
// ============================================================================

/**
 * Event type categories for better organization
 * Helps in pricing and service customization
 */
export type EventType = 
  | 'wedding'
  | 'engagement'
  | 'birthday'
  | 'anniversary'
  | 'corporate'
  | 'conference'
  | 'graduation'
  | 'baby_shower'
  | 'retirement'
  | 'holiday_party'
  | 'fundraiser'
  | 'other';

/**
 * Booking status with clear progression
 * Tracks booking lifecycle from inquiry to completion
 */
export type BookingStatus = 
  | 'inquiry'
  | 'pending'
  | 'confirmed'
  | 'deposit_paid'
  | 'fully_paid'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

/**
 * Payment status for financial tracking
 * Comprehensive payment state management
 */
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed';

/**
 * Complete booking information
 * Central interface for all booking-related data
 */
export interface EventBooking {
  id: string;
  userId: string;
  hallId: string;
  eventDetails: EventDetails;
  bookingDetails: BookingDetails;
  paymentInfo: PaymentInformation;
  additionalServices: AdditionalService[];
  specialRequests: string;
  internalNotes: string;
  timeline: BookingTimeline[];
  documents: BookingDocument[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Event-specific details
 * Comprehensive event information for planning
 */
export interface EventDetails {
  name: string;
  type: EventType;
  date: Date;
  startTime: string;
  endTime: string;
  guestCount: number;
  ageGroup: 'children' | 'adults' | 'mixed';
  dresscode?: string;
  theme?: string;
  specialOccasions: string[];
}

/**
 * Booking administrative details
 * Internal tracking and management information
 */
export interface BookingDetails {
  status: BookingStatus;
  confirmationNumber: string;
  totalPrice: number;
  depositAmount: number;
  balanceAmount: number;
  discountApplied?: Discount;
  taxAmount: number;
  finalAmount: number;
  currency: string;
  bookingSource: 'website' | 'phone' | 'email' | 'walk_in' | 'referral';
  assignedStaff?: string;
}

/**
 * Payment information and transaction details
 * Comprehensive financial tracking
 */
export interface PaymentInformation {
  status: PaymentStatus;
  method: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'check' | 'digital_wallet';
  transactions: PaymentTransaction[];
  billingAddress: UserAddress;
  invoiceNumber: string;
  receiptUrls: string[];
}

/**
 * Individual payment transaction
 * Detailed transaction tracking
 */
export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'balance' | 'refund' | 'fee';
  status: PaymentStatus;
  paymentMethod: string;
  transactionId: string;
  processedAt: Date;
  notes?: string;
}

/**
 * Additional services and add-ons
 * Flexible service offerings for events
 */
export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  category: 'catering' | 'decoration' | 'entertainment' | 'photography' | 'transportation' | 'other';
  price: number;
  quantity: number;
  totalPrice: number;
  provider: string;
  isRequired: boolean;
  notes?: string;
}

/**
 * Discount information
 * Promotional and discount tracking
 */
export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  description: string;
  minimumAmount?: number;
  maximumDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usageCount: number;
}

/**
 * Booking timeline events
 * Audit trail for booking changes
 */
export interface BookingTimeline {
  id: string;
  timestamp: Date;
  event: string;
  description: string;
  performedBy: string;
  oldValue?: string;
  newValue?: string;
}

/**
 * Booking-related documents
 * File management for contracts and agreements
 */
export interface BookingDocument {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'receipt' | 'permit' | 'insurance' | 'other';
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
  isRequired: boolean;
  expiresAt?: Date;
}

// ============================================================================
// GALLERY AND MEDIA TYPES
// ============================================================================

/**
 * Gallery image categories for organization
 * Helps in filtering and displaying images
 */
export type GalleryImageCategory = 
  | 'weddings'
  | 'corporate_events'
  | 'birthday_parties'
  | 'anniversaries'
  | 'graduations'
  | 'holiday_parties'
  | 'venue_interior'
  | 'venue_exterior'
  | 'catering'
  | 'decorations';

/**
 * Gallery image with comprehensive metadata
 * Rich media information for better presentation
 */
export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  category: GalleryImageCategory;
  tags: readonly string[];
  altText: string;
  photographer?: string;
  eventDate?: Date;
  isPublic: boolean;
  isFeatured: boolean;
  sortOrder: number;
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: number;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Media upload information
 * Tracking for file uploads and processing
 */
export interface MediaUpload {
  id: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: Date;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  thumbnailGenerated: boolean;
  metadata: Record<string, any>;
}

// ============================================================================
// REVIEW AND FEEDBACK TYPES
// ============================================================================

/**
 * Customer review with detailed feedback
 * Comprehensive review system for quality improvement
 */
export interface CustomerReview {
  id: string;
  userId: string;
  bookingId: string;
  ratings: {
    overall: number;
    service: number;
    cleanliness: number;
    value: number;
    location: number;
    amenities: number;
  };
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  isVerified: boolean;
  isPublic: boolean;
  helpfulVotes: number;
  reportCount: number;
  response?: VenueResponse;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Venue response to customer reviews
 * Professional response management
 */
export interface VenueResponse {
  id: string;
  message: string;
  respondedBy: string;
  respondedAt: Date;
  isPublic: boolean;
}

// ============================================================================
// NOTIFICATION AND COMMUNICATION TYPES
// ============================================================================

/**
 * Notification types for different communication channels
 * Organized notification system
 */
export type NotificationType = 
  | 'booking_confirmation'
  | 'payment_reminder'
  | 'event_reminder'
  | 'cancellation'
  | 'refund_processed'
  | 'review_request'
  | 'promotional'
  | 'system_update'
  | 'security_alert';

/**
 * Notification priority levels
 * Helps in organizing and displaying notifications
 */
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * User notification with comprehensive information
 * Complete notification management system
 */
export interface UserNotification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  isRead: boolean;
  isArchived: boolean;
  expiresAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  readAt?: Date;
}

// ============================================================================
// API AND RESPONSE TYPES
// ============================================================================

/**
 * Standardized API response structure
 * Consistent response format across all endpoints
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
  metadata?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

/**
 * API error information
 * Detailed error reporting for debugging
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, any>;
}

/**
 * Pagination information for list responses
 * Standardized pagination across all list endpoints
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated list response
 * Combines data with pagination information
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// ============================================================================
// FORM AND VALIDATION TYPES
// ============================================================================

/**
 * Form field validation state
 * Comprehensive form validation tracking
 */
export interface FieldValidation {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  errorMessage?: string;
  warningMessage?: string;
}

/**
 * Form validation state
 * Overall form validation management
 */
export interface FormValidation {
  isValid: boolean;
  isSubmitting: boolean;
  hasErrors: boolean;
  fieldValidations: Record<string, FieldValidation>;
  generalErrors: string[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic ID type for type safety
 * Ensures proper ID handling throughout the application
 */
export type EntityId = string;

/**
 * Timestamp type for consistent date handling
 * Standardized timestamp format
 */
export type Timestamp = Date | string;

/**
 * Optional fields utility type
 * Makes specified fields optional in an interface
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required fields utility type
 * Makes specified fields required in an interface
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Audit fields for database entities
 * Common fields for tracking entity changes
 */
export interface AuditFields {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version: number;
}

/**
 * Soft delete fields for entities
 * Enables soft deletion functionality
 */
export interface SoftDeleteFields {
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
}