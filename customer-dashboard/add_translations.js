const fs = require('fs');

const keysToAdd = {
  // Orders section
  orders_section: {
    myOrders: {
      en: 'My Orders',
      th: 'คำสั่งซื้อของฉัน',
      zh: '我的订单',
      ko: '내 주문',
      vi: 'Đơn hàng của tôi'
    },
    trackManageOrders: {
      en: 'Track and manage all your orders in one place',
      th: 'ติดตามและจัดการคำสั่งซื้อของคุณได้ในที่เดียว',
      zh: '在一个地方跟踪和管理您的所有订单',
      ko: '한곳에서 모든 주문을 추적하고 관리하세요',
      vi: 'Theo dõi và quản lý tất cả đơn hàng của bạn ở một nơi'
    },
    allOrders: {
      en: 'All Orders',
      th: 'คำสั่งซื้อทั้งหมด',
      zh: '所有订单',
      ko: '모든 주문',
      vi: 'Tất cả đơn hàng'
    },
    searchOrdersPlaceholder: {
      en: 'Search orders by ID or product...',
      th: 'ค้นหาคำสั่งซื้อด้วยรหัสหรือชื่อสินค้า...',
      zh: '按订单号或产品搜索...',
      ko: 'ID 또는 제품으로 주문 검색...',
      vi: 'Tìm kiếm đơn hàng theo ID hoặc sản phẩm...'
    },
    allStatus: {
      en: 'All Status',
      th: 'สถานะทั้งหมด',
      zh: '所有状态',
      ko: '모든 상태',
      vi: 'Tất cả trạng thái'
    }
  },
  // Profile section
  profile_section: {
    myProfile: {
      en: 'My Profile',
      th: 'โปรไฟล์ของฉัน',
      zh: '我的个人资料',
      ko: '내 프로필',
      vi: 'Hồ sơ của tôi'
    },
    profileDescription: {
      en: 'Manage your personal information and preferences',
      th: 'จัดการข้อมูลส่วนตัวและค่ากำหนดต่างๆ',
      zh: '管理您的个人信息和偏好',
      ko: '개인 정보 및 기본 설정 관리',
      vi: 'Quản lý thông tin cá nhân và tùy chọn của bạn'
    }
  },
  // Support section
  support_section: {
    customerSupport: {
      en: 'Customer Support',
      th: 'ฝ่ายสนับสนุนลูกค้า',
      zh: '客户支持',
      ko: '고객 지원',
      vi: 'Hỗ trợ khách hàng'
    },
    supportDescription: {
      en: "We're here to help! Get in touch with us.",
      th: 'เรามาช่วยคุณ! ติดต่อเราได้เลย',
      zh: '我们在这里为您提供帮助！请联系我们',
      ko: '도와드리겠습니다! 문의하세요',
      vi: 'Chúng tôi ở đây để giúp đỡ! Liên hệ với chúng tôi'
    }
  },
  // Notifications section
  notifications_section: {
    notificationDescription: {
      en: 'Stay updated with your orders and account activity',
      th: 'ติดตามสถานะคำสั่งซื้อและกิจกรรมในบัญชี',
      zh: '随时了解您的订单和账户活动',
      ko: '주문 및 계정 활동을 최신 상태로 유지하세요',
      vi: 'Cập nhật đơn hàng và hoạt động tài khoản của bạn'
    }
  },
  // Settings section
  settings_section: {
    settingsDescription: {
      en: 'Manage your account preferences and settings',
      th: 'จัดการค่ากำหนดและการตั้งค่าบัญชีของคุณ',
      zh: '管理您的账户偏好和设置',
      ko: '계정 기본 설정 및 설정 관리',
      vi: 'Quản lý tùy chọn và cài đặt tài khoản của bạn'
    }
  }
};

console.log('Keys to add:', JSON.stringify(keysToAdd, null, 2));
