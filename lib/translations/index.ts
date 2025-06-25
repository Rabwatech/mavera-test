/**
 * Translation system for Mavera Hall website
 * Provides comprehensive multilingual content support
 * Following Rabwa's clean code standards with organized structure
 */

// Common translations used across multiple components
export const COMMON_TRANSLATIONS = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    gallery: 'المعرض',
    contact: 'اتصل بنا',
    booking: 'الحجز',
    login: 'تسجيل الدخول',
    dashboard: 'لوحة التحكم',
    
    // Actions
    bookNow: 'احجز الآن',
    exploreGallery: 'استكشف المعرض',
    learnMore: 'اعرف المزيد',
    contactUs: 'اتصل بنا',
    sendMessage: 'إرسال رسالة',
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    
    // Status
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'تم بنجاح',
    warning: 'تحذير',
    
    // Time
    today: 'اليوم',
    tomorrow: 'غداً',
    yesterday: 'أمس',
    
    // Contact
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    message: 'الرسالة',
    subject: 'الموضوع',
    
    // Accessibility
    close: 'إغلاق',
    open: 'فتح',
    menu: 'القائمة',
    search: 'البحث',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact',
    booking: 'Booking',
    login: 'Login',
    dashboard: 'Dashboard',
    
    // Actions
    bookNow: 'Book Now',
    exploreGallery: 'Explore Gallery',
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    sendMessage: 'Send Message',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    
    // Status
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    
    // Time
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    
    // Contact
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    subject: 'Subject',
    
    // Accessibility
    close: 'Close',
    open: 'Open',
    menu: 'Menu',
    search: 'Search',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
  }
} as const

// Hero Section translations
export const HERO_TRANSLATIONS = {
  ar: {
    title: 'قاعة مافيرا',
    subtitle: 'Mavera Hall',
    tagline: 'حيث تتحقق الأحلام وتُصنع الذكريات',
    description: 'اكتشف قاعة الأحداث الأكثر أناقة وفخامة في المدينة. مساحات واسعة، تصميم عصري، وخدمة استثنائية لجعل مناسبتك لا تُنسى.',
    bookNowButton: 'احجز الآن',
    exploreGalleryButton: 'استكشف المعرض',
    bookNowAriaLabel: 'احجز قاعة مافيرا الآن',
    exploreGalleryAriaLabel: 'استكشف معرض صور قاعة مافيرا',
    imageAlt: 'صورة قاعة مافيرا'
  },
  en: {
    title: 'Mavera Hall',
    subtitle: 'قاعة مافيرا',
    tagline: 'Where Dreams Come True and Memories Are Made',
    description: 'Discover the most elegant and luxurious event hall in the city. Spacious areas, modern design, and exceptional service to make your event unforgettable.',
    bookNowButton: 'Book Now',
    exploreGalleryButton: 'Explore Gallery',
    bookNowAriaLabel: 'Book Mavera Hall now',
    exploreGalleryAriaLabel: 'Explore Mavera Hall photo gallery',
    imageAlt: 'Mavera Hall image'
  }
} as const

// About Section translations
export const ABOUT_TRANSLATIONS = {
  ar: {
    title: 'عن قاعة مافيرا',
    subtitle: 'About Mavera Hall',
    description1: 'تقع قاعة مافيرا في قلب الأناقة، وتقف كشاهد على الجمال الخالد والتصميم المتطور. كانت قاعتنا خلفية لعدد لا يحصى من اللحظات السحرية، من التجمعات الحميمة إلى الاحتفالات الكبرى.',
    description2: 'مع أكثر من عقد من الخبرة في إنشاء الأحداث التي لا تُنسى، يضمن فريقنا المتفاني أن كل التفاصيل مثالية، من الاستشارة الأولى إلى الوداع الأخير. نحن نؤمن أن كل حدث يستحق أن يكون استثنائياً.',
    statistics: {
      events: {
        value: '1000+',
        label: 'حدث ناجح',
        description: 'مناسبات متنوعة'
      },
      guests: {
        value: '50,000+',
        label: 'ضيف سعيد',
        description: 'تجارب لا تُنسى'
      },
      years: {
        value: '15+',
        label: 'سنة خبرة',
        description: 'خبرة موثوقة'
      },
      satisfaction: {
        value: '98%',
        label: 'رضا العملاء',
        description: 'تقييمات ممتازة'
      }
    },
    imageAlt: 'صورة قاعة مافيرا'
  },
  en: {
    title: 'About Mavera Hall',
    subtitle: 'عن قاعة مافيرا',
    description1: 'Located in the heart of elegance, Mavera Hall stands as a testament to timeless beauty and sophisticated design. Our hall has been the backdrop for countless magical moments, from intimate gatherings to grand celebrations.',
    description2: 'With over a decade of experience in creating unforgettable events, our dedicated team ensures that every detail is perfect, from the first consultation to the final farewell. We believe every event deserves to be extraordinary.',
    statistics: {
      events: {
        value: '1000+',
        label: 'Successful Events',
        description: 'Diverse occasions'
      },
      guests: {
        value: '50,000+',
        label: 'Happy Guests',
        description: 'Unforgettable experiences'
      },
      years: {
        value: '15+',
        label: 'Years Experience',
        description: 'Trusted expertise'
      },
      satisfaction: {
        value: '98%',
        label: 'Customer Satisfaction',
        description: 'Excellent ratings'
      }
    },
    imageAlt: 'Mavera Hall image'
  }
} as const

// Services Section translations
export const SERVICES_TRANSLATIONS = {
  ar: {
    title: 'خدماتنا',
    subtitle: 'Our Services',
    description: 'نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجات مناسبتك، من التخطيط إلى التنفيذ.',
    services: {
      weddings: {
        title: 'حفلات الزفاف',
        description: 'حفلات زفاف فريدة من نوعها مع كل التفاصيل المثالية',
        features: ['تصميم مخصص', 'تنسيق الأزهار', 'خدمة الطعام', 'التصوير الاحترافي']
      },
      corporate: {
        title: 'الفعاليات المؤسسية',
        description: 'فعاليات احترافية للمؤسسات والشركات',
        features: ['قاعات مؤتمرات', 'عروض تقديمية', 'شبكات', 'خدمة متميزة']
      },
      parties: {
        title: 'الحفلات الخاصة',
        description: 'احتفالات خاصة لا تُنسى مع أصدقائك وعائلتك',
        features: ['تنسيق مخصص', 'موسيقى حية', 'خدمة شاملة', 'أجواء احتفالية']
      },
      seminars: {
        title: 'الندوات والمؤتمرات',
        description: 'فعاليات تعليمية ومهنية في بيئة احترافية',
        features: ['معدات متطورة', 'خدمة تقنية', 'تنسيق احترافي', 'دعم متكامل']
      }
    }
  },
  en: {
    title: 'Our Services',
    subtitle: 'خدماتنا',
    description: 'We provide a comprehensive range of services to meet all your event needs, from planning to execution.',
    services: {
      weddings: {
        title: 'Weddings',
        description: 'Unique wedding celebrations with every perfect detail',
        features: ['Custom Design', 'Floral Arrangements', 'Catering Service', 'Professional Photography']
      },
      corporate: {
        title: 'Corporate Events',
        description: 'Professional events for institutions and companies',
        features: ['Conference Halls', 'Presentations', 'Networking', 'Premium Service']
      },
      parties: {
        title: 'Private Parties',
        description: 'Unforgettable private celebrations with friends and family',
        features: ['Custom Decorations', 'Live Music', 'Full Service', 'Celebratory Atmosphere']
      },
      seminars: {
        title: 'Seminars & Conferences',
        description: 'Educational and professional events in a professional environment',
        features: ['Advanced Equipment', 'Technical Support', 'Professional Setup', 'Integrated Support']
      }
    }
  }
} as const

// Gallery Section translations
export const GALLERY_TRANSLATIONS = {
  ar: {
    title: 'معرض الصور',
    subtitle: 'Photo Gallery',
    description: 'استكشف مجموعة من أجمل اللحظات والأحداث التي أقيمت في قاعة مافيرا',
    categories: {
      all: 'الكل',
      weddings: 'حفلات الزفاف',
      corporate: 'فعاليات مؤسسية',
      parties: 'حفلات خاصة',
      seminars: 'ندوات ومؤتمرات'
    },
    loadMore: 'عرض المزيد',
    noImages: 'لا توجد صور متاحة حالياً',
    imageAlt: 'صورة من معرض قاعة مافيرا'
  },
  en: {
    title: 'Photo Gallery',
    subtitle: 'معرض الصور',
    description: 'Explore a collection of the most beautiful moments and events held at Mavera Hall',
    categories: {
      all: 'All',
      weddings: 'Weddings',
      corporate: 'Corporate Events',
      parties: 'Private Parties',
      seminars: 'Seminars & Conferences'
    },
    loadMore: 'Load More',
    noImages: 'No images available at the moment',
    imageAlt: 'Image from Mavera Hall gallery'
  }
} as const

// Testimonials Section translations
export const TESTIMONIALS_TRANSLATIONS = {
  ar: {
    title: 'آراء العملاء',
    subtitle: 'Customer Testimonials',
    description: 'استمع إلى ما يقوله عملاؤنا عن تجربتهم مع قاعة مافيرا',
    testimonials: [
      {
        name: 'أحمد محمد',
        role: 'عريس',
        content: 'كانت حفلتنا في قاعة مافيرا تجربة لا تُنسى. الفريق كان محترفاً جداً وكل التفاصيل كانت مثالية.',
        rating: 5
      },
      {
        name: 'فاطمة علي',
        role: 'مديرة شركة',
        content: 'نظمنا مؤتمرنا السنوي في قاعة مافيرا وكانت النتيجة مذهلة. المرافق ممتازة والخدمة احترافية.',
        rating: 5
      },
      {
        name: 'محمد حسن',
        role: 'منظم فعاليات',
        content: 'قاعة مافيرا هي الخيار الأفضل للفعاليات المهمة. الجودة والخدمة لا مثيل لهما.',
        rating: 5
      }
    ]
  },
  en: {
    title: 'Customer Testimonials',
    subtitle: 'آراء العملاء',
    description: 'Hear what our customers say about their experience with Mavera Hall',
    testimonials: [
      {
        name: 'Ahmed Mohamed',
        role: 'Groom',
        content: 'Our wedding at Mavera Hall was an unforgettable experience. The team was very professional and every detail was perfect.',
        rating: 5
      },
      {
        name: 'Fatima Ali',
        role: 'Company Director',
        content: 'We organized our annual conference at Mavera Hall and the result was amazing. The facilities are excellent and the service is professional.',
        rating: 5
      },
      {
        name: 'Mohamed Hassan',
        role: 'Event Organizer',
        content: 'Mavera Hall is the best choice for important events. The quality and service are unmatched.',
        rating: 5
      }
    ]
  }
} as const

// Contact Section translations
export const CONTACT_TRANSLATIONS = {
  ar: {
    title: 'اتصل بنا',
    subtitle: 'Contact Us',
    description: 'نحن هنا لمساعدتك في تخطيط مناسبتك المثالية. اتصل بنا اليوم!',
    form: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      subject: 'الموضوع',
      message: 'رسالتك',
      submit: 'إرسال الرسالة',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phonePlaceholder: 'أدخل رقم هاتفك',
      subjectPlaceholder: 'أدخل موضوع الرسالة',
      messagePlaceholder: 'اكتب رسالتك هنا...'
    },
    info: {
      address: {
        title: 'العنوان',
        value: 'شارع الملك فهد، الرياض، المملكة العربية السعودية'
      },
      phone: {
        title: 'الهاتف',
        value: '+966 11 123 4567'
      },
      email: {
        title: 'البريد الإلكتروني',
        value: 'info@maverahall.com'
      },
      hours: {
        title: 'ساعات العمل',
        value: 'الأحد - الخميس: 8:00 ص - 10:00 م'
      }
    },
    successMessage: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    errorMessage: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
  },
  en: {
    title: 'Contact Us',
    subtitle: 'اتصل بنا',
    description: 'We are here to help you plan your perfect event. Contact us today!',
    form: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Your Message',
      submit: 'Send Message',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email address',
      phonePlaceholder: 'Enter your phone number',
      subjectPlaceholder: 'Enter message subject',
      messagePlaceholder: 'Write your message here...'
    },
    info: {
      address: {
        title: 'Address',
        value: 'King Fahd Street, Riyadh, Saudi Arabia'
      },
      phone: {
        title: 'Phone',
        value: '+966 11 123 4567'
      },
      email: {
        title: 'Email',
        value: 'info@maverahall.com'
      },
      hours: {
        title: 'Working Hours',
        value: 'Sunday - Thursday: 8:00 AM - 10:00 PM'
      }
    },
    successMessage: 'Your message has been sent successfully! We will contact you soon.',
    errorMessage: 'An error occurred while sending the message. Please try again.'
  }
} as const

// Footer translations
export const FOOTER_TRANSLATIONS = {
  ar: {
    description: 'قاعة مافيرا - حيث تتحقق الأحلام وتُصنع الذكريات. نقدم أفضل الخدمات لجميع أنواع المناسبات.',
    quickLinks: 'روابط سريعة',
    services: 'الخدمات',
    contact: 'اتصل بنا',
    socialMedia: 'وسائل التواصل الاجتماعي',
    copyright: '© 2024 قاعة مافيرا. جميع الحقوق محفوظة.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة'
  },
  en: {
    description: 'Mavera Hall - Where dreams come true and memories are made. We provide the best services for all types of events.',
    quickLinks: 'Quick Links',
    services: 'Services',
    contact: 'Contact',
    socialMedia: 'Social Media',
    copyright: '© 2024 Mavera Hall. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service'
  }
} as const

// Page-specific translations
export const PAGE_TRANSLATIONS = {
  home: {
    ar: {
      title: 'قاعة مافيرا - الرئيسية',
      description: 'اكتشف قاعة الأحداث الأكثر أناقة وفخامة في المدينة. مساحات واسعة، تصميم عصري، وخدمة استثنائية.',
      keywords: 'قاعة مافيرا, حفلات زفاف, فعاليات, مناسبات, الرياض'
    },
    en: {
      title: 'Mavera Hall - Home',
      description: 'Discover the most elegant and luxurious event hall in the city. Spacious areas, modern design, and exceptional service.',
      keywords: 'Mavera Hall, weddings, events, occasions, Riyadh'
    }
  },
  about: {
    ar: {
      title: 'عن قاعة مافيرا',
      description: 'تعرف على قصة قاعة مافيرا وإنجازاتنا على مدى أكثر من 15 عاماً من الخبرة في مجال الأحداث.',
      keywords: 'عن قاعة مافيرا, تاريخ, إنجازات, خبرة'
    },
    en: {
      title: 'About Mavera Hall',
      description: 'Learn about Mavera Hall\'s story and achievements over more than 15 years of experience in the events industry.',
      keywords: 'about Mavera Hall, history, achievements, experience'
    }
  },
  services: {
    ar: {
      title: 'خدمات قاعة مافيرا',
      description: 'نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجات مناسبتك، من التخطيط إلى التنفيذ.',
      keywords: 'خدمات قاعة مافيرا, حفلات زفاف, فعاليات مؤسسية, حفلات خاصة'
    },
    en: {
      title: 'Mavera Hall Services',
      description: 'We provide a comprehensive range of services to meet all your event needs, from planning to execution.',
      keywords: 'Mavera Hall services, weddings, corporate events, private parties'
    }
  },
  gallery: {
    ar: {
      title: 'معرض قاعة مافيرا',
      description: 'استكشف مجموعة من أجمل اللحظات والأحداث التي أقيمت في قاعة مافيرا.',
      keywords: 'معرض قاعة مافيرا, صور, أحداث, مناسبات'
    },
    en: {
      title: 'Mavera Hall Gallery',
      description: 'Explore a collection of the most beautiful moments and events held at Mavera Hall.',
      keywords: 'Mavera Hall gallery, photos, events, occasions'
    }
  },
  contact: {
    ar: {
      title: 'اتصل بقاعة مافيرا',
      description: 'تواصل معنا لمساعدتك في تخطيط مناسبتك المثالية. نحن هنا للإجابة على جميع استفساراتك.',
      keywords: 'اتصل بقاعة مافيرا, معلومات الاتصال, العنوان, الهاتف'
    },
    en: {
      title: 'Contact Mavera Hall',
      description: 'Contact us to help you plan your perfect event. We are here to answer all your inquiries.',
      keywords: 'contact Mavera Hall, contact information, address, phone'
    }
  },
  booking: {
    ar: {
      title: 'احجز قاعة مافيرا',
      description: 'احجز قاعة مافيرا لمناسبتك القادمة. نقدم أفضل الخدمات وأجمل المساحات.',
      keywords: 'احجز قاعة مافيرا, حجز, مناسبات, تواريخ متاحة'
    },
    en: {
      title: 'Book Mavera Hall',
      description: 'Book Mavera Hall for your next event. We offer the best services and most beautiful spaces.',
      keywords: 'book Mavera Hall, booking, events, available dates'
    }
  }
} as const

// Export all translations
export const TRANSLATIONS = {
  common: COMMON_TRANSLATIONS,
  hero: HERO_TRANSLATIONS,
  about: ABOUT_TRANSLATIONS,
  services: SERVICES_TRANSLATIONS,
  gallery: GALLERY_TRANSLATIONS,
  testimonials: TESTIMONIALS_TRANSLATIONS,
  contact: CONTACT_TRANSLATIONS,
  footer: FOOTER_TRANSLATIONS,
  pages: PAGE_TRANSLATIONS
} as const

// Type definitions for translations
export type LanguageCode = keyof typeof COMMON_TRANSLATIONS
export type TranslationKey = keyof typeof TRANSLATIONS
export type CommonTranslationKey = keyof typeof COMMON_TRANSLATIONS.ar
export type HeroTranslationKey = keyof typeof HERO_TRANSLATIONS.ar
export type AboutTranslationKey = keyof typeof ABOUT_TRANSLATIONS.ar
export type ServicesTranslationKey = keyof typeof SERVICES_TRANSLATIONS.ar
export type GalleryTranslationKey = keyof typeof GALLERY_TRANSLATIONS.ar
export type TestimonialsTranslationKey = keyof typeof TESTIMONIALS_TRANSLATIONS.ar
export type ContactTranslationKey = keyof typeof CONTACT_TRANSLATIONS.ar
export type FooterTranslationKey = keyof typeof FOOTER_TRANSLATIONS.ar
export type PageTranslationKey = keyof typeof PAGE_TRANSLATIONS.home.ar 