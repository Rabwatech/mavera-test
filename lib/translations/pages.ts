/**
 * Page-specific translations for Mavera Hall website
 * Provides comprehensive translations for all pages
 * Following Rabwa's clean code standards with organized structure
 */

// Booking page translations
export const BOOKING_TRANSLATIONS = {
  ar: {
    title: 'احجز قاعة مافيرا',
    subtitle: 'Book Mavera Hall',
    description: 'احجز قاعة مافيرا لمناسبتك القادمة. اختر التاريخ والخدمات المطلوبة.',
    form: {
      eventType: 'نوع المناسبة',
      eventDate: 'تاريخ المناسبة',
      startTime: 'وقت البداية',
      endTime: 'وقت الانتهاء',
      guestCount: 'عدد الضيوف',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      specialRequests: 'طلبات خاصة',
      submit: 'إرسال طلب الحجز',
      eventTypes: {
        wedding: 'حفل زفاف',
        corporate: 'فعالية مؤسسية',
        party: 'حفلة خاصة',
        seminar: 'ندوة أو مؤتمر'
      }
    },
    steps: {
      step1: 'اختر التاريخ',
      step2: 'حدد الخدمات',
      step3: 'أدخل المعلومات',
      step4: 'تأكيد الحجز'
    },
    successMessage: 'تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.',
    errorMessage: 'حدث خطأ أثناء إرسال طلب الحجز. يرجى المحاولة مرة أخرى.'
  },
  en: {
    title: 'Book Mavera Hall',
    subtitle: 'احجز قاعة مافيرا',
    description: 'Book Mavera Hall for your next event. Choose the date and required services.',
    form: {
      eventType: 'Event Type',
      eventDate: 'Event Date',
      startTime: 'Start Time',
      endTime: 'End Time',
      guestCount: 'Number of Guests',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      specialRequests: 'Special Requests',
      submit: 'Submit Booking Request',
      eventTypes: {
        wedding: 'Wedding',
        corporate: 'Corporate Event',
        party: 'Private Party',
        seminar: 'Seminar or Conference'
      }
    },
    steps: {
      step1: 'Choose Date',
      step2: 'Select Services',
      step3: 'Enter Information',
      step4: 'Confirm Booking'
    },
    successMessage: 'Your booking request has been sent successfully! We will contact you soon.',
    errorMessage: 'An error occurred while sending the booking request. Please try again.'
  }
} as const

// Login page translations
export const LOGIN_TRANSLATIONS = {
  ar: {
    title: 'تسجيل الدخول',
    subtitle: 'Login',
    description: 'سجل دخولك للوصول إلى لوحة التحكم الخاصة بك',
    form: {
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      submit: 'تسجيل الدخول',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور'
    },
    links: {
      register: 'ليس لديك حساب؟ سجل الآن',
      backToHome: 'العودة للرئيسية'
    },
    errorMessage: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    successMessage: 'تم تسجيل الدخول بنجاح!'
  },
  en: {
    title: 'Login',
    subtitle: 'تسجيل الدخول',
    description: 'Sign in to access your dashboard',
    form: {
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot Password?',
      submit: 'Sign In',
      emailPlaceholder: 'Enter your email address',
      passwordPlaceholder: 'Enter your password'
    },
    links: {
      register: "Don't have an account? Sign up now",
      backToHome: 'Back to Home'
    },
    errorMessage: 'Invalid email or password.',
    successMessage: 'Successfully signed in!'
  }
} as const

// Dashboard page translations
export const DASHBOARD_TRANSLATIONS = {
  ar: {
    title: 'لوحة التحكم',
    subtitle: 'Dashboard',
    welcome: 'مرحباً بك في لوحة التحكم',
    stats: {
      totalBookings: 'إجمالي الحجوزات',
      upcomingEvents: 'الأحداث القادمة',
      totalRevenue: 'إجمالي الإيرادات',
      activeBookings: 'الحجوزات النشطة'
    },
    sections: {
      recentBookings: 'الحجوزات الحديثة',
      upcomingEvents: 'الأحداث القادمة',
      notifications: 'الإشعارات',
      quickActions: 'إجراءات سريعة'
    },
    actions: {
      viewAll: 'عرض الكل',
      edit: 'تعديل',
      cancel: 'إلغاء',
      confirm: 'تأكيد'
    }
  },
  en: {
    title: 'Dashboard',
    subtitle: 'لوحة التحكم',
    welcome: 'Welcome to your dashboard',
    stats: {
      totalBookings: 'Total Bookings',
      upcomingEvents: 'Upcoming Events',
      totalRevenue: 'Total Revenue',
      activeBookings: 'Active Bookings'
    },
    sections: {
      recentBookings: 'Recent Bookings',
      upcomingEvents: 'Upcoming Events',
      notifications: 'Notifications',
      quickActions: 'Quick Actions'
    },
    actions: {
      viewAll: 'View All',
      edit: 'Edit',
      cancel: 'Cancel',
      confirm: 'Confirm'
    }
  }
} as const

// FAQ page translations
export const FAQ_TRANSLATIONS = {
  ar: {
    title: 'الأسئلة الشائعة',
    subtitle: 'Frequently Asked Questions',
    description: 'إجابات على أكثر الأسئلة شيوعاً حول قاعة مافيرا',
    categories: {
      booking: 'الحجز',
      services: 'الخدمات',
      pricing: 'الأسعار',
      policies: 'السياسات'
    },
    questions: [
      {
        question: 'كيف يمكنني حجز قاعة مافيرا؟',
        answer: 'يمكنك حجز قاعة مافيرا من خلال موقعنا الإلكتروني أو الاتصال بنا مباشرة على الهاتف.'
      },
      {
        question: 'ما هي الخدمات المقدمة؟',
        answer: 'نقدم مجموعة شاملة من الخدمات تشمل التنسيق، التصوير، الموسيقى، والطعام.'
      },
      {
        question: 'هل يمكن إلغاء الحجز؟',
        answer: 'نعم، يمكن إلغاء الحجز وفقاً لسياسة الإلغاء المطبقة.'
      },
      {
        question: 'ما هي سعة القاعة؟',
        answer: 'تستوعب قاعة مافيرا ما يصل إلى 500 ضيف في التنسيق التقليدي.'
      }
    ]
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'الأسئلة الشائعة',
    description: 'Answers to the most common questions about Mavera Hall',
    categories: {
      booking: 'Booking',
      services: 'Services',
      pricing: 'Pricing',
      policies: 'Policies'
    },
    questions: [
      {
        question: 'How can I book Mavera Hall?',
        answer: 'You can book Mavera Hall through our website or by calling us directly.'
      },
      {
        question: 'What services are provided?',
        answer: 'We provide a comprehensive range of services including decoration, photography, music, and catering.'
      },
      {
        question: 'Can I cancel my booking?',
        answer: 'Yes, bookings can be cancelled according to our cancellation policy.'
      },
      {
        question: 'What is the hall capacity?',
        answer: 'Mavera Hall can accommodate up to 500 guests in traditional seating.'
      }
    ]
  }
} as const

// Privacy Policy page translations
export const PRIVACY_TRANSLATIONS = {
  ar: {
    title: 'سياسة الخصوصية',
    subtitle: 'Privacy Policy',
    lastUpdated: 'آخر تحديث: يناير 2024',
    sections: {
      introduction: 'مقدمة',
      informationCollection: 'جمع المعلومات',
      informationUsage: 'استخدام المعلومات',
      informationSharing: 'مشاركة المعلومات',
      dataSecurity: 'أمان البيانات',
      cookies: 'ملفات تعريف الارتباط',
      yourRights: 'حقوقك',
      contactUs: 'اتصل بنا'
    },
    content: {
      introduction: 'نحن في قاعة مافيرا نلتزم بحماية خصوصيتك وبياناتك الشخصية.',
      informationCollection: 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند استخدام خدماتنا.',
      informationUsage: 'نستخدم معلوماتك لتقديم خدماتنا وتحسين تجربتك.',
      informationSharing: 'لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.',
      dataSecurity: 'نطبق إجراءات أمان صارمة لحماية بياناتك.',
      cookies: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا.',
      yourRights: 'لديك الحق في الوصول إلى بياناتك وتعديلها وحذفها.',
      contactUs: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى الاتصال بنا.'
    }
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'سياسة الخصوصية',
    lastUpdated: 'Last Updated: January 2024',
    sections: {
      introduction: 'Introduction',
      informationCollection: 'Information Collection',
      informationUsage: 'Information Usage',
      informationSharing: 'Information Sharing',
      dataSecurity: 'Data Security',
      cookies: 'Cookies',
      yourRights: 'Your Rights',
      contactUs: 'Contact Us'
    },
    content: {
      introduction: 'At Mavera Hall, we are committed to protecting your privacy and personal data.',
      informationCollection: 'We collect information you provide directly to us when using our services.',
      informationUsage: 'We use your information to provide our services and improve your experience.',
      informationSharing: 'We do not share your information with third parties without your consent.',
      dataSecurity: 'We implement strict security measures to protect your data.',
      cookies: 'We use cookies to improve your experience on our website.',
      yourRights: 'You have the right to access, modify, and delete your data.',
      contactUs: 'If you have any questions about our privacy policy, please contact us.'
    }
  }
} as const

// Terms of Service page translations
export const TERMS_TRANSLATIONS = {
  ar: {
    title: 'شروط الخدمة',
    subtitle: 'Terms of Service',
    lastUpdated: 'آخر تحديث: يناير 2024',
    sections: {
      acceptance: 'قبول الشروط',
      services: 'الخدمات',
      booking: 'الحجز',
      cancellation: 'الإلغاء',
      liability: 'المسؤولية',
      intellectualProperty: 'الملكية الفكرية',
      governingLaw: 'القانون المطبق',
      changes: 'التغييرات'
    },
    content: {
      acceptance: 'باستخدام خدماتنا، فإنك توافق على هذه الشروط والأحكام.',
      services: 'نقدم خدمات حجز القاعات والمناسبات وفقاً للشروط المحددة.',
      booking: 'يجب تأكيد جميع الحجوزات بالدفع المطلوب.',
      cancellation: 'تخضع الإلغاءات لسياسة الإلغاء المطبقة.',
      liability: 'نحد من مسؤوليتنا وفقاً للقانون المطبق.',
      intellectualProperty: 'جميع المحتويات محمية بموجب حقوق الملكية الفكرية.',
      governingLaw: 'تخضع هذه الشروط لقوانين المملكة العربية السعودية.',
      changes: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت.'
    }
  },
  en: {
    title: 'Terms of Service',
    subtitle: 'شروط الخدمة',
    lastUpdated: 'Last Updated: January 2024',
    sections: {
      acceptance: 'Acceptance of Terms',
      services: 'Services',
      booking: 'Booking',
      cancellation: 'Cancellation',
      liability: 'Liability',
      intellectualProperty: 'Intellectual Property',
      governingLaw: 'Governing Law',
      changes: 'Changes'
    },
    content: {
      acceptance: 'By using our services, you agree to these terms and conditions.',
      services: 'We provide hall booking and event services according to specified terms.',
      booking: 'All bookings must be confirmed with the required payment.',
      cancellation: 'Cancellations are subject to our cancellation policy.',
      liability: 'We limit our liability according to applicable law.',
      intellectualProperty: 'All content is protected by intellectual property rights.',
      governingLaw: 'These terms are governed by the laws of Saudi Arabia.',
      changes: 'We reserve the right to modify these terms at any time.'
    }
  }
} as const

// Export all page translations
export const PAGE_SPECIFIC_TRANSLATIONS = {
  booking: BOOKING_TRANSLATIONS,
  login: LOGIN_TRANSLATIONS,
  dashboard: DASHBOARD_TRANSLATIONS,
  faq: FAQ_TRANSLATIONS,
  privacy: PRIVACY_TRANSLATIONS,
  terms: TERMS_TRANSLATIONS
} as const 