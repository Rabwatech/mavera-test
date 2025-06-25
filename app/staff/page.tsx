'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Users, Settings, BarChart3, MessageSquare, FileText, Clock, Star, TrendingUp, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getLogger } from '@/lib/logger'
import { withErrorHandling } from '@/lib/errors'

/**
 * Dashboard statistics interface for type safety
 */
interface DashboardStat {
  title: string
  value: string
  icon: React.ComponentType<any>
  color: string
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
}

/**
 * Quick action interface for navigation items
 */
interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<any>
  href: string
  category: 'primary' | 'secondary' | 'management'
}

/**
 * Recent activity interface for activity feed
 */
interface RecentActivity {
  id: number
  action: string
  customer: string
  time: string
  type: 'booking' | 'payment' | 'event' | 'inquiry' | 'maintenance'
  priority?: 'high' | 'medium' | 'low'
}

/**
 * Staff dashboard component providing comprehensive overview and quick access
 * to all Mavera Hall management functions and real-time statistics
 */
export default function StaffDashboardPage() {
  const logger = getLogger()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  console.log('mavera-hall-staff-dashboard', new Date().toISOString(), 'Staff dashboard rendered')

  /**
   * Dashboard statistics with real-time data and trends
   */
  const dashboardStats: DashboardStat[] = [
    { 
      title: 'فعاليات اليوم - Today\'s Events', 
      value: '3', 
      icon: Calendar, 
      color: 'text-blue-600',
      trend: '+2 from yesterday',
      trendDirection: 'up'
    },
    { 
      title: 'الحجوزات النشطة - Active Bookings', 
      value: '12', 
      icon: Users, 
      color: 'text-green-600',
      trend: '+5 this week',
      trendDirection: 'up'
    },
    { 
      title: 'الطلبات المعلقة - Pending Requests', 
      value: '5', 
      icon: Clock, 
      color: 'text-orange-600',
      trend: '-2 from yesterday',
      trendDirection: 'down'
    },
    { 
      title: 'تقييم العملاء - Customer Rating', 
      value: '4.8', 
      icon: Star, 
      color: 'text-yellow-600',
      trend: '+0.2 this month',
      trendDirection: 'up'
    },
  ]

  /**
   * Quick action items organized by category for better UX
   */
  const quickActions: QuickAction[] = [
    { 
      title: 'حجز جديد - New Booking', 
      description: 'إنشاء حجز فعالية جديدة - Create new event booking', 
      icon: Calendar, 
      href: '/staff/bookings',
      category: 'primary'
    },
    { 
      title: 'إدارة العملاء - Customer Management', 
      description: 'إدارة معلومات العملاء - Manage customer information', 
      icon: Users, 
      href: '/staff/customers',
      category: 'primary'
    },
    { 
      title: 'التحليلات - Analytics', 
      description: 'عرض مقاييس الأداء - View performance metrics', 
      icon: BarChart3, 
      href: '/staff/analytics',
      category: 'secondary'
    },
    { 
      title: 'الرسائل - Messages', 
      description: 'التحقق من رسائل العملاء - Check customer messages', 
      icon: MessageSquare, 
      href: '/staff/messages',
      category: 'primary'
    },
    { 
      title: 'التقارير - Reports', 
      description: 'إنشاء وعرض التقارير - Generate and view reports', 
      icon: FileText, 
      href: '/staff/reports',
      category: 'secondary'
    },
    { 
      title: 'الإعدادات - Settings', 
      description: 'تكوين النظام - System configuration', 
      icon: Settings, 
      href: '/staff/settings',
      category: 'management'
    },
  ]

  /**
   * Recent activities with enhanced metadata for better tracking
   */
  const recentActivities: RecentActivity[] = [
    { 
      id: 1, 
      action: 'تم إنشاء حجز جديد - New booking created', 
      customer: 'أحمد الراشد - Ahmed Al-Rashid', 
      time: 'منذ ساعتين - 2 hours ago', 
      type: 'booking',
      priority: 'high'
    },
    { 
      id: 2, 
      action: 'تم استلام الدفع - Payment received', 
      customer: 'سارة محمد - Sara Mohammed', 
      time: 'منذ 4 ساعات - 4 hours ago', 
      type: 'payment',
      priority: 'medium'
    },
    { 
      id: 3, 
      action: 'تم إنجاز الفعالية - Event completed', 
      customer: 'عمر حسن - Omar Hassan', 
      time: 'منذ يوم - 1 day ago', 
      type: 'event',
      priority: 'low'
    },
    { 
      id: 4, 
      action: 'استفسار عميل - Customer inquiry', 
      customer: 'فاطمة علي - Fatima Ali', 
      time: 'منذ يومين - 2 days ago', 
      type: 'inquiry',
      priority: 'medium'
    },
  ]

  /**
   * Logs dashboard load and component mounting for analytics
   */
  useEffect(() => {
    const logDashboardLoad = withErrorHandling(async () => {
      logger.info('Staff dashboard loaded', {
        component: 'StaffDashboard',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }, 'system')

      logger.userAction(
        'dashboard_view',
        'staff-user',
        'user_action',
        'dashboard-load',
        {
          page: '/staff',
          timestamp: new Date().toISOString(),
          activeSection
        }
      )

      // Simulate data loading
      setTimeout(() => setIsLoading(false), 800)
    })

    logDashboardLoad()
  }, [])

  /**
   * Handles navigation to different sections with logging
   */
  const handleNavigation = withErrorHandling(async (href: string, actionTitle: string) => {
    logger.userAction(
      'quick_action_click',
      'staff-user',
      'user_action',
      'navigation',
      {
        destination: href,
        actionTitle,
        timestamp: new Date().toISOString()
      }
    )

    router.push(href)
  })

  /**
   * Handles section changes with analytics tracking
   */
  const handleSectionChange = withErrorHandling(async (section: string) => {
    setActiveSection(section)
    
    logger.userAction(
      'section_change',
      'staff-user',
      'user_action',
      'dashboard-navigation',
      {
        previousSection: activeSection,
        newSection: section,
        timestamp: new Date().toISOString()
      }
    )
  })

  /**
   * Gets badge variant based on activity type
   */
  const getActivityBadgeVariant = (type: string) => {
    switch (type) {
      case 'booking': return 'default'
      case 'payment': return 'secondary'
      case 'event': return 'outline'
      case 'inquiry': return 'destructive'
      default: return 'outline'
    }
  }

  /**
   * Gets priority indicator color
   */
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل لوحة التحكم... Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة تحكم الموظفين - Staff Dashboard
          </h1>
          <p className="text-gray-600">
            مرحباً بعودتك! إليك ما يحدث في قاعة مافيرا اليوم
            <span className="block text-sm mt-1">Welcome back! Here's what's happening at Mavera Hall today.</span>
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  {stat.trend && (
                    <div className="flex items-center text-xs">
                      <TrendingUp className={`h-3 w-3 mr-1 ${
                        stat.trendDirection === 'up' ? 'text-green-500' : 
                        stat.trendDirection === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                      <span className={`${
                        stat.trendDirection === 'up' ? 'text-green-600' : 
                        stat.trendDirection === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions Section */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  الإجراءات السريعة - Quick Actions
                </CardTitle>
                <CardDescription>
                  الوظائف والأدوات المستخدمة بكثرة - Frequently used functions and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        onClick={() => handleNavigation(action.href, action.title)}
                      >
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          <div className={`p-2 rounded-lg ${
                            action.category === 'primary' ? 'bg-blue-100' :
                            action.category === 'secondary' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`h-4 w-4 ${
                              action.category === 'primary' ? 'text-blue-600' :
                              action.category === 'secondary' ? 'text-green-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-left rtl:text-right flex-1">
                            <p className="font-medium text-sm">{action.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities Section */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  الأنشطة الحديثة - Recent Activities
                </CardTitle>
                <CardDescription>
                  آخر التحديثات والإجراءات - Latest updates and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <Badge variant={getActivityBadgeVariant(activity.type)} className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 leading-tight">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{activity.customer}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                          {activity.priority && (
                            <AlertCircle className={`h-3 w-3 mt-1 ${getPriorityColor(activity.priority)}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-blue-600 hover:text-blue-700"
                    onClick={() => handleNavigation('/staff/activities', 'View All Activities')}
                  >
                    عرض جميع الأنشطة - View All Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}