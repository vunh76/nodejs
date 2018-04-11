
exports.consts = {
    USER_TYPES: {
        CLIENT: 16,
        DRIVER: 32,
        PARTNER: 64,
        BO: 128,
        PROMOTION_OWNER: 256,
        BANK: 512,
        PAYMENT_GATEWAY: 1024,
        STATION: 2048,
        ZALOPAY_CASHOUT: 4096,
        CASHOUT: 8192
    },
    TRANSACTION_TYPES: {
        DEPOSIT: 100,
        CASHIN: 101,        
        CAPTURE_ADD: 211,
        BLOCK: 200,
        UNBLOCK: 201,
        UNBLOCK_APART: 202,
        TRANSFER: 300,
        PROMOTION: 400,
        PROMOTION_RETURN: 410,
        COMMISION: 500,
        TIP: 700,
        DISCOUNT: 600,
        PENALTY: 990,
        CAPTURED: 1000,
        DEBT: 1001,
        REFUND: 2000,
        ROLLBACK: 3000,
        CASHOUT: 4000,
        CASHOUT_AGENCY: 10000,
        COD: 20000
    },
    TRANSACTION_STATUES: {
        PENDING: 0,
        CANCELED: 4,
        COMPLETED: 65536
    },
    INITIAL_AMOUNT: 100000,
    CARTYPE: {
        MOTO: 2,
        CAR: 1
    },
    ORDER_STATUSES: {
        NEW: 2,
        PAID: 1,
        CANCELED: 4,
        DELETE: 8,
        REFUNDED: 16,
        PROCESSING: 32,
        ERROR_IN_DEPOSIT: 256,
        ERROR_IN_VALIDATION: 1024,
        ERROR_IN_CASHOUT: 2048,
        ERROR_IN_SYNC_STATUS: 4096
    },
    ORDER_TYPE: {
        SALE: 1,
        DEPOSIT: 64,
        PROMOTION_RETURN: 40,
        CASHOUT: 1000,
        POINTOUT: 2000
    },
    PAYMENT_RESPONSE: {
        SUSCCESS: 1,
        DULICATED_TRANSACTION: 2,
        REFUND: 3,
        GENERAL: 65000,
        ORDER_TYPE_NOT_MATCH: 55001
    },
    BOOKING_STATUSES: {
        BOOK_NEW: 0,
        DRIVER_REIVEW_BOOK: 10,
        DRIVER_CANCEL_IN_BOOK: 70,
        DRIVER_CANCEL_IN_TRIP: 71,
        DRIVER_MISS_BOOK: 72,
        DRIVER_CANNOT_RECEIVE_BOOK: 73,
        DRIVER_TIMEOUT_BY_CLIENT: 74,
        DRIVER_CAPTURE: 20,
        CLIENT_ACCEPTED: 21,
        DRIVER_ACCEPTED: 30,
        CLIENT_CANCEL_IN_BOOK: 60,
        CLIENT_CANCEL_IN_TRIP: 61,
        CLIENT_CANCEL_IN_TRIP_REASON_DRIVER: 62,
        CLIENT_INGNORE_TRIP: 63,
        CLIENT_TIMEOUT: 69,
        TRIP_STARTED: 40,
        WAIT_FOR_PAYMENT: 49,
        TRIP_FINISHED: 50,
        ADMIN_CANCEL: 64,
        ADMIN_ROLLBACK: 65536,
        ADMIN_GOING_FINISH: 10000
    },
    BOOKING_TYPES: {
        SPECIFIC: 10,
        UNSPECIFIC: 20,
        COUNTER: 30
    },
    BOOKING_SERVICES: {
        COD: 122
    },
    PARTNER_GROUP_FEE_ID: 1,
    PARTNER_DEFAULT_ID: 1,
    PARTNER_STATUSES: {
        ACTIVATED: 1
    },
    PARTNER_DRIVER_STATUES: {
        NEW: 0,
        REJECTED: 16,
        JOINED: 2,
        LEFT: 8
    },
    DRIVER_STATUES: {
        UNREADY: 0,
        AVAILABLE: 1,
        BUSY: 8
    },
    QUEUE_NAMES: {
        ELASTICSEARCH: 'elasticsearch',
        FIREBASE: 'firebase',
        FIREBASE_BOOKING: 'firebasebooking',
        REFERRAL_PROMOTION: 'referralpromotion',
        MISS_USER: 'missuser',
        NEW_CUSTOMER_PROMOTION: 'newcustomerpromotion',
        TRACK_TIME_ONLINE: 'tracktimeonline',
        DRIVER_STATISTICAL: 'driverstatistical',
        BOOKING_PROMOTION: 'bookingdiscountpromotion',
        STATION_TIP: 'stationtipprocess',
        STATION_BOOKING_PROMOTION: 'stationbookingpromotion',
        REFUND_FEE_FOR_COUNTER_BOOKING: 'refundfeeforcounterbookingpromotion',
        DRIVER_GUARANTEE_BOOKING_PROMOTION:'driverguaranteebookingpromotion',
        USER_ACTIVITY: 'useractivity',
        RECONCILE_BOOKING_HISTORY: 'reconcilebookinghistory',
        DEBT_COLLECTOR: 'debtcollector',
        SYNC_ZALOPAY: 'synczalopay',
        COLLECT_COD: 'collectcod'
    },
    CALC_UNITS: {
        PERCENT: 1,
        AMOUNT: 2
    },
    REFER_TYPES: {
        CLIENT: 500,
        DRIVER: 600,
        BOOKING: 100,
        ORDER: 200,
        ORDER_CASHIN: 201,
        PROMOTION_CODE: 300,
        PROMOTION_EVENT: 310,
        TRANSACTION: 400,
        PROMOTION_AND_BOOKING: 500,
        ZALOPAY_TRANSACTION: 10000,
        ZALOPAY_CASHOUT_TRANSACTION: 11000,
        BANKPLUS_TRANSACTION: 20000
    },
    PROMOTION_RETURN_STATUES: {
        PENDING: 1,
        CONFIRMED: 4,
        REJECTED: 256,
        COMPLETED: 65536
    },
    NOTIFICATION_TYPES: {
        DEFAULT: 1,
        REFERAL: 2,
        LINK: 3,
        EVENT: 4,
        PROFILE: 5,
        BALANCE: 6
    },
    NOTIFICATION_STATUES: {
        NEW: 0,
        READ: 2
    },
    ACTIVITY_TYPES: {
        BLOCK_DRIVER: 10000,
        UNBLOCK_DRIVER: 10001,
        BLOCK_CLIENT: 20000,
        UNBLOCK_CLIENT: 20001,
        CANCEL_BOOKING: 30000,
        ROLLBACK_BOOKING: 30001,
        PROFILE: 50000,
        NOTICED: 100000
    },
    PROMOTION_ACTORS: {
        CLIENT: 1,
        DRIVER: 2
    },
    PROMOTION_EVENT_STATUES: {
        NEW: 0,
        FINISHED: 65536
    },
    PROMOTION_STRATEGIES: {
        REFERAL: 1,
        DISCOUNT_ON_BUDGET: 2,
        ADVERTISE: 4,
        NEW_USER: 8,
        STATION: 16
    },
    PROMOTION_RESTRICTS: {
        CLIENT: 1,
        DRIVER: 2,
        SALE_PERSON: 4,
        ENROLL: 8,
        NEW_CLIENT: 16
    },
    ORDER_CASHIN_STATUES: {
        NEW: 1,
        APPROVED: 2,
        REJECTED: 4,
        COMPLETED: 8
    },
    USER_VALIDATIONS: {
        EMAIL: 1,
        PHONE: 2,
        CARD: 16,
        DRIVER_LICENSE: 32,
        VEHICLE_INSPECTION_CERTIFICATE: 64
    },
    USER_PAYMENT_GATEWAY_STATUSES: {
        NEW: 1,
        CONFIRMED: 2
    },
    APPROVE_STATUSES: {
        WAIT_FOR_APPROVAL: 2,
        REJECTED: 8,
        APPROVED: 128,
        CANCELED: 256
    },
    USER_CONFIRMATION_TYPES: {
        RESET_PIN: 1
    },
    FIREBAE_CMD: {
        DELETE: 'delete',
        INDEX: 'index',
        UPDATE: 'update'
    }
};


exports.permissions = {
    LISTING: 1,
    READ: 2,
    UPDATE: 4,
    CREATE: 8,
    APPROVE: 32,
    DELETE: 65536
};

exports.actions = {
    sys: 'sys',
    
    user_list: 'user_list',
    customer_list: 'customer_list',
    
    driver_list: 'driver_list',
    driver_transaction_list: 'driver_transaction_list',
    driver_car_listing: 'driver_car_list',
    driver_booking_list: 'driver_booking_list',
    
    deposit: 'deposit',

    booking_list: 'booking_list',

    promotion_event_list: 'promotion_event_list',
    promotion_event_sale: 'promotion_event_sale',
    promotion_event_enroll: 'promotion_event_enroll',
    promotion_event_onlines: 'promotion_event_onlines',

    promotion_code_list: 'promotion_code_list',
    promotion_return_list: 'promotion_return_list',

    client_booking_list: 'client_booking_list',

    order_deposit_list: 'order_deposit_list',

    cashin_list: 'cashin_list',

    user_approval_list: 'user_approval_list',

    report_zone_booking: 'report_zone_booking',

    partner_listing: 'partner_listing',
    partner_driver_listing: 'partner_driver_listing',

    god: 'god',
    category: 'category'
};

exports.USER_SYS_GROUPS = {
    BANK: 'bank',
    FEE: 'fee'
}

exports.SEARCH_OPTIONS = {
    SHORT_BOOKING: {
        MIN_PRICE: 0,
        MAX_PRICE: 50000
    }
}

exports.RATING_SCORES = [ 1, 2, 3, 4, 5 ];
exports.MIN_BALANCE_TO_RECEIVE_BOOKING = 10000;
