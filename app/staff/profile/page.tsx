'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

/**
 * Staff profile data interface for type safety
 */
interface StaffProfile {
  name: string
  email: string
  phone: string
  role: string
  department: string
  joinDate: string
  employeeId: string
  status: 'Active' | 'Inactive' | 'On Leave'
  avatar?: string
}

/**
 * Activity metrics interface for performance tracking
 */
interface ActivityMetrics {
  bookingsManaged: number
  eventsCompleted: number
  supportTickets: number
  customerRating: number
  monthlyPerformance: number
}

/**
 * Form validation state interface
 */
interface ValidationState {
  isValid: boolean
  errors: Record<string, string>
}

/**
 * Staff profile management component
 * Allows staff members to view and edit their personal information
 * with comprehensive validation and activity tracking
 */
export default function StaffProfilePage() {
  const logger = getLogger()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  /**
   * Current staff profile data
   */
  const [profile, setProfile] = useState<StaffProfile>({
    name: 'أحمد الراشد - Ahmed Al-Rashid',
    email: 'ahmed@mavera.com',
    phone: '+966 50 123 4567',
    role: 'مدير الفعاليات - Event Manager',
    department: 'العمليات - Operations',
    joinDate: '2023-01-15',
    employeeId: 'EMP-2023-001',
    status: 'Active'
  })

  /**
   * Edited profile data for form management
   */
  const [editedProfile, setEditedProfile] = useState<StaffProfile>(profile)

  /**
   * Activity metrics for performance display
   */
  const [activityMetrics, setActivityMetrics] = useState<ActivityMetrics>({
    bookingsManaged: 24,
    eventsCompleted: 18,
    supportTickets: 6,
    customerRating: 4.8,
    monthlyPerformance: 95
  })

  /**
   * Form validation state
   */
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    errors: {}
  })

  /**
   * Logs page load and component mounting for analytics
   */
  useEffect(() => {
    const logProfileLoad = withErrorHandling(async () => {
      logger.info('Staff profile page loaded', {
        component: 'StaffProfilePage',
        employeeId: profile.employeeId,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }, 'system')

      logger.userAction(
        'profile_view',
        profile.email,
        'user_action',
        'profile-access',
        {
          page: '/staff/profile',
          employeeId: profile.employeeId,
          timestamp: new Date().toISOString()
        }
      )

      // Simulate data loading
      setTimeout(() => setIsLoading(false), 600)
    })

    logProfileLoad()
  }, [])

  /**
   * Validates profile form data
   */
  const validateProfile = (profileData: StaffProfile): ValidationState => {
    const errors: Record<string, string> = {}

    // Name validation
    if (!profileData.name.trim()) {
      errors.name = 'الاسم مطلوب - Name is required'
    } else if (profileData.name.trim().length < 2) {
      errors.name = 'الاسم قصير جداً - Name too short'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!profileData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب - Email is required'
    } else if (!emailRegex.test(profileData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح - Invalid email format'
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-()]+$/
    if (!profileData.phone.trim()) {
      errors.phone = 'رقم الهاتف مطلوب - Phone number is required'
    } else if (!phoneRegex.test(profileData.phone)) {
      errors.phone = 'رقم الهاتف غير صحيح - Invalid phone format'
    }

    // Role validation
    if (!profileData.role.trim()) {
      errors.role = 'المنصب مطلوب - Role is required'
    }

    // Department validation
    if (!profileData.department.trim()) {
      errors.department = 'القسم مطلوب - Department is required'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  /**
   * Handles entering edit mode with logging
   */
  const handleEditMode = withErrorHandling(async () => {
    logger.userAction(
      'profile_edit_start',
      profile.email,
      'user_action',
      'profile-edit',
      {
        employeeId: profile.employeeId,
        timestamp: new Date().toISOString()
      }
    )

    setIsEditing(true)
    setEditedProfile(profile)
    setValidation({ isValid: true, errors: {} })
    setSaveMessage('')
  })

  /**
   * Handles saving profile changes with validation and logging
   */
  const handleSaveProfile = withErrorHandling(async () => {
    const validationResult = validateProfile(editedProfile)
    setValidation(validationResult)

    if (!validationResult.isValid) {
      logger.warn('Profile validation failed', {
        employeeId: profile.employeeId,
        errors: validationResult.errors,
        timestamp: new Date().toISOString()
      }, 'system')
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const previousProfile = { ...profile }
      setProfile(editedProfile)
      setIsEditing(false)
      setSaveMessage('تم حفظ التغييرات بنجاح - Profile updated successfully')

      logger.info('Profile updated successfully', {
        employeeId: profile.employeeId,
        changes: {
          previous: previousProfile,
          updated: editedProfile
        },
        timestamp: new Date().toISOString()
      }, 'system')

      logger.userAction(
        'profile_update_success',
        editedProfile.email,
        'user_action',
        'profile-save',
        {
          employeeId: profile.employeeId,
          fieldsChanged: Object.keys(editedProfile).filter(
            key => editedProfile[key as keyof StaffProfile] !== previousProfile[key as keyof StaffProfile]
          ),
          timestamp: new Date().toISOString()
        }
      )

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      logger.error('Profile update failed', error instanceof Error ? error : new Error('Unknown error'), {
        employeeId: profile.employeeId,
        timestamp: new Date().toISOString()
      }, 'system')
      
      setSaveMessage('فشل في حفظ التغييرات - Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  })

  /**
   * Handles canceling edit mode with logging
   */
  const handleCancelEdit = withErrorHandling(async () => {
    logger.userAction(
      'profile_edit_cancel',
      profile.email,
      'user_action',
      'profile-edit',
      {
        employeeId: profile.employeeId,
        timestamp: new Date().toISOString()
      }
    )

    setIsEditing(false)
    setEditedProfile(profile)
    setValidation({ isValid: true, errors: {} })
    setSaveMessage('')
  })

  /**
   * Handles input changes with real-time validation
   */
  const handleInputChange = (field: keyof StaffProfile, value: string) => {
    const updatedProfile = { ...editedProfile, [field]: value }
    setEditedProfile(updatedProfile)
    
    // Clear field-specific error when user starts typing
    if (validation.errors[field]) {
      setValidation(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: '' }
      }))
    }
  }

  /**
   * Gets status badge variant based on employee status
   */
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'On Leave': return 'secondary'
      case 'Inactive': return 'destructive'
      default: return 'outline'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الملف الشخصي... Loading profile...</p>
        </div>
      </div>
    )
  }

  console.log('mavera-hall-staff-profile', new Date().toISOString(), 'Staff profile page rendered')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              الملف الشخصي - Staff Profile
            </h1>
            <p className="text-gray-600">
              إدارة معلوماتك الشخصية وإعدادات الحساب
              <span className="block text-sm mt-1">Manage your personal information and account settings</span>
            </p>
          </div>

          {/* Success/Error Messages */}
          {saveMessage && (
            <Alert className={`mb-6 ${saveMessage.includes('نجاح') || saveMessage.includes('successfully') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CheckCircle className={`h-4 w-4 ${saveMessage.includes('نجاح') || saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`} />
              <AlertDescription className={saveMessage.includes('نجاح') || saveMessage.includes('successfully') ? 'text-green-800' : 'text-red-800'}>
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview Card */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                    <p className="text-gray-600 mb-3">{profile.role}</p>
                    <Badge variant={getStatusBadgeVariant(profile.status)} className="mb-4">
                      {profile.status === 'Active' ? 'نشط - Active' : 
                       profile.status === 'On Leave' ? 'في إجازة - On Leave' : 
                       'غير نشط - Inactive'}
                    </Badge>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">رقم الموظف - Employee ID</p>
                        <p className="text-sm text-gray-600">{profile.employeeId}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">تاريخ الانضمام - Join Date</p>
                        <p className="text-sm text-gray-600">{new Date(profile.joinDate).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Award className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">الأداء الشهري - Monthly Performance</p>
                        <p className="text-sm text-gray-600">{activityMetrics.monthlyPerformance}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details Card */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      المعلومات الشخصية - Personal Information
                    </CardTitle>
                    <CardDescription>
                      تحديث بياناتك الشخصية ومعلومات الاتصال - Update your personal details and contact information
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={handleEditMode} variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      تعديل - Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button onClick={handleSaveProfile} size="sm" disabled={isSaving}>
                        {isSaving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {isSaving ? 'جاري الحفظ...' : 'حفظ - Save'}
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm" disabled={isSaving}>
                        <X className="w-4 h-4 mr-2" />
                        إلغاء - Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل - Full Name</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="name"
                            value={editedProfile.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={validation.errors.name ? 'border-red-500' : ''}
                            disabled={isSaving}
                          />
                          {validation.errors.name && (
                            <p className="text-sm text-red-600 mt-1">{validation.errors.name}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{profile.name}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني - Email Address</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="email"
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={validation.errors.email ? 'border-red-500' : ''}
                            disabled={isSaving}
                          />
                          {validation.errors.email && (
                            <p className="text-sm text-red-600 mt-1">{validation.errors.email}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{profile.email}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف - Phone Number</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="phone"
                            value={editedProfile.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={validation.errors.phone ? 'border-red-500' : ''}
                            disabled={isSaving}
                          />
                          {validation.errors.phone && (
                            <p className="text-sm text-red-600 mt-1">{validation.errors.phone}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{profile.phone}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Role Field */}
                    <div className="space-y-2">
                      <Label htmlFor="role">المنصب - Role</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="role"
                            value={editedProfile.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className={validation.errors.role ? 'border-red-500' : ''}
                            disabled={isSaving}
                          />
                          {validation.errors.role && (
                            <p className="text-sm text-red-600 mt-1">{validation.errors.role}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{profile.role}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Department Field */}
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="department">القسم - Department</Label>
                      {isEditing ? (
                        <div>
                          <Input
                            id="department"
                            value={editedProfile.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className={validation.errors.department ? 'border-red-500' : ''}
                            disabled={isSaving}
                          />
                          {validation.errors.department && (
                            <p className="text-sm text-red-600 mt-1">{validation.errors.department}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-gray-900">{profile.department}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Activity Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    ملخص النشاط - Activity Summary
                  </CardTitle>
                  <CardDescription>
                    نشاطك الحديث ومقاييس الأداء - Your recent activity and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{activityMetrics.bookingsManaged}</div>
                      <div className="text-sm text-gray-600">الحجوزات المُدارة</div>
                      <div className="text-xs text-gray-500 mt-1">Bookings Managed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">{activityMetrics.eventsCompleted}</div>
                      <div className="text-sm text-gray-600">الفعاليات المكتملة</div>
                      <div className="text-xs text-gray-500 mt-1">Events Completed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{activityMetrics.supportTickets}</div>
                      <div className="text-sm text-gray-600">تذاكر الدعم</div>
                      <div className="text-xs text-gray-500 mt-1">Support Tickets</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">{activityMetrics.customerRating}</div>
                      <div className="text-sm text-gray-600">تقييم العملاء</div>
                      <div className="text-xs text-gray-500 mt-1">Customer Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}