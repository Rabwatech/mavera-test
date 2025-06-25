/**
 * Application-wide constants following clean code principles
 * Organized by domain and purpose for maximum readability
 */

import type { NavigationItem } from '@/types'

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

/**
 * Regular expressions for common validation patterns
 * Used across forms and input validation throughout the application
 */
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]+$/,
  arabicText: /^[\u0600-\u06FF\s]+$/,
  englishText: /^[a-zA-Z\s]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

/**
 * Password requirements for validation
 */
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialChars: '@$!%*?&',
} as const;

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

/**
 * Contact information for Mavera Hall
 * Centralized contact details used across the application
 */
export const CONTACT_INFO = [
  {
    type: 'phone' as const,
    label: 'الهاتف',
    value: '+966 50 123 4567',
    description: 'متاح 24/7 للاستفسارات العاجلة'
  },
  {
    type: 'email' as const,
    label: 'البريد الإلكتروني',
    value: 'info@maverahall.com',
    description: 'للاستفسارات العامة والحجوزات'
  },
  {
    type: 'address' as const,
    label: 'العنوان',
    value: 'شارع الأناقة 123، حي الفخامة، المدينة',
    description: 'موقع مميز في قلب المدينة'
  },
  {
    type: 'hours' as const,
    label: 'ساعات العمل',
    value: 'السبت - الخميس: 9:00 ص - 11:00 م',
    description: 'الجمعة: 2:00 م - 11:00 م'
  }
] as const

// ============================================================================
// USER INTERFACE CONSTANTS
// ============================================================================

/**
 * Navigation menu items with proper typing and organization
 * Centralized for consistency across navigation components
 */
export const NAVIGATION_MENU_ITEMS = [
  { href: '/', label: 'Home', isExternal: false },
  { href: '/gallery', label: 'Gallery', isExternal: false },
  { href: '/hall-details', label: 'Hall Details', isExternal: false },
  { href: '/faqs', label: 'FAQs', isExternal: false },
  { href: '/about', label: 'About', isExternal: false },
  { href: '/contact', label: 'Contact', isExternal: false },
  { href: '/booking', label: 'Book Now', isExternal: false },
] as const;

/**
 * Navigation menu items for the main navbar
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    href: '/', 
    label: 'الرئيسية',
    ariaLabel: 'الصفحة الرئيسية لقاعة مافيرا'
  },
  { 
    href: '/about', 
    label: 'من نحن',
    ariaLabel: 'معلومات عن قاعة مافيرا'
  },
  { 
    href: '/services', 
    label: 'خدماتنا',
    ariaLabel: 'خدمات قاعة مافيرا'
  },
  { 
    href: '/gallery', 
    label: 'المعرض',
    ariaLabel: 'معرض صور قاعة مافيرا'
  },
  { 
    href: '/contact', 
    label: 'اتصل بنا',
    ariaLabel: 'تواصل مع قاعة مافيرا'
  },
]

/**
 * Hall statistics for the about section
 */
export const HALL_STATISTICS = [
  {
    value: '500+',
    label: 'عملاء سعداء',
    description: 'Happy Clients'
  },
  {
    value: '10+',
    label: 'سنوات خبرة',
    description: 'Years Experience'
  },
  {
    value: '1000+',
    label: 'حفل ناجح',
    description: 'Successful Events'
  },
  {
    value: '24/7',
    label: 'دعم العملاء',
    description: 'Customer Support'
  },
] as const

/**
 * Hall services for the services section
 */
export const HALL_SERVICES = [
  {
    title: 'حفلات الزفاف',
    description: 'اجعل يوم زفافك مثالياً مع باقات الزفاف الشاملة ودعم التخطيط المتخصص.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>',
    features: [
      'تخطيط شامل للحفل',
      'تنسيق الزهور والديكور',
      'خدمة طعام فاخرة',
      'تصوير احترافي',
      'موسيقى وإضاءة'
    ]
  },
  {
    title: 'الفعاليات المؤسسية',
    description: 'بيئات مهنية للمؤتمرات والاجتماعات والاحتفالات المؤسسية مع وسائل راحة حديثة.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>',
    features: [
      'قاعات اجتماعات مجهزة',
      'أنظمة عرض حديثة',
      'خدمة ضيافة مهنية',
      'دعم تقني متكامل',
      'مواقف سيارات واسعة'
    ]
  },
  {
    title: 'الحفلات الخاصة',
    description: 'تجمعات حميمة واحتفالات بالمناسبات المهمة في جو أنيق ومخصص.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
    features: [
      'تخطيط مخصص للحدث',
      'قوائم طعام متنوعة',
      'ترفيه وأنشطة',
      'خدمة شخصية',
      'أجواء مريحة وأنيقة'
    ]
  },
  {
    title: 'المناسبات الثقافية',
    description: 'استضافة الفعاليات الثقافية والتراثية بأسلوب يحترم التقاليد ويضيف لمسة عصرية.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    features: [
      'ديكور تراثي أصيل',
      'برامج ثقافية متنوعة',
      'ضيافة تقليدية',
      'مساحات مرنة',
      'دعم للفعاليات التراثية'
    ]
  },
  {
    title: 'احتفالات التخرج',
    description: 'احتفل بإنجازاتك الأكاديمية في بيئة تليق بهذه المناسبة المهمة.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>',
    features: [
      'تنظيم حفلات التخرج',
      'تصوير الذكريات',
      'ضيافة للعائلات',
      'مساحة للعروض',
      'تنسيق مع الجامعات'
    ]
  },
  {
    title: 'المعارض والمؤتمرات',
    description: 'مساحات مثالية لاستضافة المعارض والمؤتمرات المهنية بأعلى المعايير.',
    icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>',
    features: [
      'مساحات عرض واسعة',
      'أنظمة صوتية متقدمة',
      'إضاءة احترافية',
      'دعم لوجستي',
      'خدمات الضيافة'
    ]
  },
] as const

/**
 * Client testimonials for Mavera Hall
 * Real customer feedback and reviews
 */
export const TESTIMONIALS = [
  {
    id: '1',
    clientName: 'سارة ومحمد الأحمد',
    eventType: 'حفل زفاف',
    eventDate: 'مارس 2024',
    rating: 5,
    text: 'قاعة مافيرا فاقت كل توقعاتنا. المكان كان رائعاً والخدمة كانت احترافية للغاية. فريق العمل اهتم بكل التفاصيل وجعل يوم زفافنا لا يُنسى.'
  },
  {
    id: '2',
    clientName: 'شركة التقنية المتقدمة',
    eventType: 'مؤتمر شركات',
    eventDate: 'فبراير 2024',
    rating: 5,
    text: 'أناقة وفخامة قاعة مافيرا جعلت مؤتمرنا السنوي حدثاً مميزاً ومهنياً. الإضاءة والصوتيات كانت مثالية، والضيافة راقية جداً.'
  },
  {
    id: '3',
    clientName: 'عائلة الخالدي',
    eventType: 'حفل تخرج',
    eventDate: 'يناير 2024',
    rating: 5,
    text: 'احتفلنا بتخرج ابنتنا في قاعة مافيرا وكانت تجربة رائعة. المكان أنيق والطعام لذيذ، وكل الضيوف أعجبوا بالمكان والتنظيم.'
  },
  {
    id: '4',
    clientName: 'أحمد وفاطمة العلي',
    eventType: 'حفل خطوبة',
    eventDate: 'ديسمبر 2023',
    rating: 5,
    text: 'قاعة مافيرا كانت الخيار الأمثل لحفل خطوبتنا. الديكور الراقي والإضاءة الرومانسية خلقت أجواءً ساحرة لن ننساها أبداً.'
  },
  {
    id: '5',
    clientName: 'نادي الأعمال الخيري',
    eventType: 'حفل خيري',
    eventDate: 'نوفمبر 2023',
    rating: 5,
    text: 'نظمنا حفلنا الخيري السنوي في قاعة مافيرا وحقق نجاحاً باهراً. المكان يليق بأهمية المناسبة والخدمة كانت على أعلى مستوى.'
  },
  {
    id: '6',
    clientName: 'عائلة المنصوري',
    eventType: 'عيد ميلاد',
    eventDate: 'أكتوبر 2023',
    rating: 5,
    text: 'احتفلنا بعيد ميلاد والدنا الثمانين في قاعة مافيرا. كان حفلاً عائلياً دافئاً في مكان فخم، وكل التفاصيل كانت مدروسة بعناية.'
  }
] as const

/**
 * Toast notification configuration
 */
export const TOAST_CONFIG = {
  duration: 4000,
  position: 'top-right' as const,
  style: {
    background: '#363636',
    color: '#fff',
  },
} as const

// ============================================================================
// BUSINESS LOGIC CONSTANTS
// ============================================================================

/**
 * Hall booking business rules and constraints
 * Centralized for easy maintenance and consistency
 */
export const BOOKING_CONSTRAINTS = {
  minimumGuestCount: 50,
  maximumGuestCount: 500,
  minimumAdvanceBookingDays: 30,
  maximumAdvanceBookingDays: 365,
  cancellationDeadlineDays: 14,
  depositPercentage: 0.3, // 30% deposit required
  lateCancellationFeePercentage: 0.1, // 10% fee for late cancellation
} as const;

/**
 * Event types supported by the venue
 * Used for categorization and pricing calculations
 */
export const EVENT_TYPES = [
  'wedding',
  'engagement',
  'birthday',
  'corporate',
  'graduation',
  'anniversary',
  'conference',
  'other',
] as const;

/**
 * User roles with proper hierarchy and permissions
 * Defines access levels throughout the application
 */
export const USER_ROLES = {
  visitor: { level: 0, label: 'Visitor' },
  client: { level: 1, label: 'Client' },
  support: { level: 2, label: 'Support Staff' },
  admin: { level: 3, label: 'Administrator' },
  superadmin: { level: 4, label: 'Super Administrator' },
} as const;

// ============================================================================
// API AND EXTERNAL SERVICE CONSTANTS
// ============================================================================

/**
 * API endpoint configurations with proper organization
 * Centralized for easy maintenance and environment management
 */
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    refreshToken: '/api/auth/refresh',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  users: {
    profile: '/api/users/profile',
    updateProfile: '/api/users/profile',
    changePassword: '/api/users/change-password',
  },
  bookings: {
    create: '/api/bookings',
    list: '/api/bookings',
    details: (id: string) => `/api/bookings/${id}`,
    update: (id: string) => `/api/bookings/${id}`,
    cancel: (id: string) => `/api/bookings/${id}/cancel`,
  },
  gallery: {
    images: '/api/gallery/images',
    upload: '/api/gallery/upload',
    delete: (id: string) => `/api/gallery/images/${id}`,
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

// Gallery Images Data
export const GALLERY_IMAGES = [
  {
    id: 'gallery-1',
    url: '/images/gallery/wedding-1.jpg',
    thumbnailUrl: '/images/gallery/thumbs/wedding-1.jpg',
    title: 'حفل زفاف أنيق',
    description: 'حفل زفاف راقي في قاعة مافيرا مع إضاءة رومانسية',
    category: 'weddings' as const,
    tags: ['زفاف', 'رومانسي', 'أنيق'],
    altText: 'حفل زفاف أنيق في قاعة مافيرا',
    eventDate: new Date('2024-01-15'),
    isPublic: true,
    isFeatured: true,
    sortOrder: 1,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 2048000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'gallery-2',
    url: '/images/gallery/corporate-1.jpg',
    thumbnailUrl: '/images/gallery/thumbs/corporate-1.jpg',
    title: 'مؤتمر الأعمال',
    description: 'مؤتمر شركات بتجهيزات احترافية ومتطورة',
    category: 'corporate_events' as const,
    tags: ['مؤتمر', 'أعمال', 'احترافي'],
    altText: 'مؤتمر الأعمال في قاعة مافيرا',
    eventDate: new Date('2024-02-10'),
    isPublic: true,
    isFeatured: false,
    sortOrder: 2,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 1856000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: 'gallery-3',
    url: '/images/gallery/party-1.jpg',
    thumbnailUrl: '/images/gallery/thumbs/party-1.jpg',
    title: 'حفلة تخرج',
    description: 'احتفال تخرج مميز مع ديكورات احتفالية',
    category: 'birthday_parties' as const,
    tags: ['تخرج', 'احتفال', 'ديكورات'],
    altText: 'حفلة تخرج في قاعة مافيرا',
    eventDate: new Date('2024-03-05'),
    isPublic: true,
    isFeatured: false,
    sortOrder: 3,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 1792000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: 'gallery-4',
    url: '/images/gallery/venue-1.jpg',
    thumbnailUrl: '/images/gallery/thumbs/venue-1.jpg',
    title: 'القاعة الرئيسية',
    description: 'إطلالة شاملة على القاعة الرئيسية وتصميمها الفاخر',
    category: 'venue_interior' as const,
    tags: ['قاعة', 'تصميم', 'فاخر'],
    altText: 'القاعة الرئيسية في مافيرا',
    eventDate: undefined,
    isPublic: true,
    isFeatured: true,
    sortOrder: 4,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 2304000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  },
  {
    id: 'gallery-5',
    url: '/images/gallery/wedding-2.jpg',
    thumbnailUrl: '/images/gallery/thumbs/wedding-2.jpg',
    title: 'حفل زفاف ملكي',
    description: 'حفل زفاف بطابع ملكي مع ديكورات ذهبية فاخرة',
    category: 'weddings' as const,
    tags: ['زفاف', 'ملكي', 'ذهبي'],
    altText: 'حفل زفاف ملكي في قاعة مافيرا',
    eventDate: new Date('2024-01-28'),
    isPublic: true,
    isFeatured: true,
    sortOrder: 5,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 2176000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 'gallery-6',
    url: '/images/gallery/corporate-2.jpg',
    thumbnailUrl: '/images/gallery/thumbs/corporate-2.jpg',
    title: 'ندوة تقنية',
    description: 'ندوة تقنية مع أحدث أجهزة العرض والصوت',
    category: 'corporate_events' as const,
    tags: ['ندوة', 'تقنية', 'عرض'],
    altText: 'ندوة تقنية في قاعة مافيرا',
    eventDate: new Date('2024-02-20'),
    isPublic: true,
    isFeatured: false,
    sortOrder: 6,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 1920000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06')
  },
  {
    id: 'gallery-7',
    url: '/images/gallery/party-2.jpg',
    thumbnailUrl: '/images/gallery/thumbs/party-2.jpg',
    title: 'حفلة عيد ميلاد',
    description: 'احتفال عيد ميلاد مميز مع ديكورات ملونة',
    category: 'birthday_parties' as const,
    tags: ['عيد ميلاد', 'احتفال', 'ملون'],
    altText: 'حفلة عيد ميلاد في قاعة مافيرا',
    eventDate: new Date('2024-03-12'),
    isPublic: true,
    isFeatured: false,
    sortOrder: 7,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 1664000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    id: 'gallery-8',
    url: '/images/gallery/venue-2.jpg',
    thumbnailUrl: '/images/gallery/thumbs/venue-2.jpg',
    title: 'منطقة الاستقبال',
    description: 'منطقة الاستقبال الأنيقة مع تصميم عصري',
    category: 'venue_interior' as const,
    tags: ['استقبال', 'أنيق', 'عصري'],
    altText: 'منطقة الاستقبال في قاعة مافيرا',
    eventDate: undefined,
    isPublic: true,
    isFeatured: false,
    sortOrder: 8,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 2240000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: 'gallery-9',
    url: '/images/gallery/wedding-3.jpg',
    thumbnailUrl: '/images/gallery/thumbs/wedding-3.jpg',
    title: 'حفل خطوبة رومانسي',
    description: 'حفل خطوبة رومانسي مع إضاءة دافئة وورود',
    category: 'weddings' as const,
    tags: ['خطوبة', 'رومانسي', 'ورود'],
    altText: 'حفل خطوبة رومانسي في قاعة مافيرا',
    eventDate: new Date('2024-02-14'),
    isPublic: true,
    isFeatured: false,
    sortOrder: 9,
    dimensions: { width: 1920, height: 1080 },
    fileSize: 1792000,
    mimeType: 'image/jpeg',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09')
  }
] as const

// All constants are exported individually above with 'export const'
// No need for a collective export block

/**
 * HTTP status codes with descriptive names
 * Improves code readability and error handling
 */
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================================================
// FORMATTING AND DISPLAY CONSTANTS
// ============================================================================

/**
 * Date and time formatting options
 * Ensures consistent date display across the application
 */
export const DATE_FORMATS = {
  shortDate: {
    year: 'numeric' as const,
    month: 'short' as const,
    day: 'numeric' as const,
  },
  longDate: {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  },
  dateTime: {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
  },
  timeOnly: {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
  },
} as const;

/**
 * Currency formatting configuration
 * Centralized for consistent price display
 */
export const CURRENCY_CONFIG = {
  locale: 'en-US',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

/**
 * Standardized error messages for consistent user experience
 * Organized by category for easy maintenance
 */
export const ERROR_MESSAGES = {
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    passwordTooWeak: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
    passwordMismatch: 'Passwords do not match',
  },
  authentication: {
    invalidCredentials: 'Invalid email or password',
    sessionExpired: 'Your session has expired. Please log in again',
    accessDenied: 'You do not have permission to access this resource',
  },
  booking: {
    dateUnavailable: 'The selected date is not available',
    guestCountExceeded: `Guest count must be between ${BOOKING_CONSTRAINTS.minimumGuestCount} and ${BOOKING_CONSTRAINTS.maximumGuestCount}`,
    advanceBookingRequired: `Bookings must be made at least ${BOOKING_CONSTRAINTS.minimumAdvanceBookingDays} days in advance`,
    cancellationDeadlinePassed: `Cancellations must be made at least ${BOOKING_CONSTRAINTS.cancellationDeadlineDays} days before the event`,
  },
  network: {
    connectionError: 'Unable to connect to the server. Please check your internet connection',
    serverError: 'An unexpected error occurred. Please try again later',
    timeoutError: 'Request timed out. Please try again',
  },
} as const;