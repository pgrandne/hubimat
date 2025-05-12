


export enum URLSchema {
    http,
    https
}

export enum FieldType {
	TEXT = 1,
	TITLE,
	SUBTITLE,
	ICON,
	TAG,
	COLORTAG,
	DATETIME,
	INPUTTEXT,
	BUTTON,
	BOOLEAN_BUTTON,
	INPUT
}

export enum ApplicationVariable {
	HIERARCHY_ITEM_NAME_BY_TYPE,
	HIERARCHY_TYPE,
	PLAN,
	DEVICE_LABEL,
	DEVICE_TYPE_NAME,
	INTERFACE_NAME,
	INTERFACE_TYPE_NAME,
	EVENT_DATETIME,
	DEVICE_TYPE_STATE_LABEL,
	DEVICE_TYPE_STATE_REPRESENTATION_ICON,
	EVENT_ID,
	EVENT_DESCRIPTION,
	PRIORITY_GROUP,
	DEVICE_ID,
	HIERARCHY_ITEM_ID,
	HIERARCHY_PATH
}

export enum ApplicationValueType {
	INT,
	DOUBLE,
	FLOAT,
	STRING,
	BOOLEAN,
	DATETIME,
	EMAIL,
	PASSWORD,
	IP_HOSTAME,
	PORT,
	LIST,
	COLOR,
	DEVICE,
	DEVICE_TYPE,
	HIERARCHY_ITEM,
	HIERARCHY_TYPE,
	PLAN,
	PLAN_TYPE,
	INTERFACE,
	POSTALADDRESS,
	IMAGE,
	NONE,
	ACTION_CONFIRMATION,
	FILE,
	FILE_LIST,
	TELEPHONE_NUMBER,
	TELEPHONE_NUMBER_LIST,
	HEX,
	INT_PASSWORD
}

export enum ApplicationDefaultValue {
	UNDEFINED = 1,
	NULL = 2,
	CUSTOM_VALUE = 3
}


export enum FormPosition {
	HEADER = 1,
	HEADER_BUTTONS = 2,
	BODY = 3,
	LIFETIME_STATE = 4,
	FOOTER = 5,
	FOOTER_BOUTONS = 6
}

/** mouse buttons */
export enum MouseButtons {
	LEFT = 1,
	MIDDLE = 2,
	RIGHT = 3,
	SIDE = 4
}
/**Response code send by hubiquiti services*/
export enum ResponseCodeStatus {
	Success = 200,
	AddSucess = 201,
	UpdateSucess = 251,
	DeleteSucess = 252,
	GetSucess = 253,
	BadRequest = 400,
	AddError_BadRequest = 451,
	UpdateError_BadRequest = 452,
	DeleteError_BadRequest = 453,
	GetError_BadRequest = 454,
	Unauthorized = 401,
	ElementNotFound = 404,
	RequestTimeout = 408,
	InternalServerError = 500,
	InternalCoreError = 550,
	AddError_InternalCoreError = 551,
	UpdateError_InternalCoreError = 552,
	DeleteError_InternalCoreError = 553,
	GetError_InternalCoreError = 554,
	InternalInterfaceError = 560,
	AddError_InternalInterfaceError = 561,
	UpdateError_InternalInterfaceError = 562,
	DeleteError_InternalInterfaceError = 563,
	GetError_InternalInterfaceError = 564,
	NotImplemented = 501,
	InterfaceServiceUnavailable = 503,
	ServiceTimeout = 504,
	CoreServiceTimeout = 541,
	InterfaceServiceTimeout = 542,
    Error = 599,
    WrongUserName = 600,
    WrongPassword = 601,
    StartupInProgress = 602,
}

/**Status of a Service component*/
export enum HealthStatus {
	Unhealthy = 0,
	Degraded = 1,
	Healthy = 2
}
/**State of an application service*/
export enum ServiceState {
	ONLINE = 1,
	OFFLINE = 2,
	LOGIN_FAILED = 3,
	SERVICE_UNAVAILABLE = 4,
	RUNNING = 5,
	CONNECTING = 6,
	STARTING = 7
}

export enum HubiquitiDataSet {
    HistoricalDeviceAction = 1,
    HistoricalDeviceStateEvent = 2,
    HistoricalDeviceVariableValue = 3,
    HistoricalProcessEvent = 6
}

export enum DashboardFunctionType {
    SUM = 1,
    COUNT = 2,
    AVG = 3,
    MIN = 4,
    MAX = 5,
    DISTINCT = 6
}

export enum DashboardPageWidgetDataValueStep {
    MINUTE = 1,
    HOUR = 2,
    DAY = 3,
    MONTH = 4,
    YEAR = 5,
    SECOND = 6
}

export enum HubiquitiDataSetData {
    HistoricalDeviceAction_Id,
    HistoricalDeviceAction_FunctionName,
    HistoricalDeviceAction_Comment,
    HistoricalDeviceAction_EventDate,
    HistoricalDeviceAction_DeviceId,
    HistoricalDeviceAction_HierarchyParentId,
    HistoricalDeviceAction_DeviceLabel,
    HistoricalDeviceAction_DeviceTypeLabel,
    HistoricalDeviceAction_DeviceTypeActionId,
    HistoricalDeviceAction_DeviceTypeActionLabel,
    HistoricalDeviceAction_UserId,
    HistoricalDeviceAction_UserName,
    HistoricalDeviceAction_UserFirstName,
    HistoricalDeviceAction_UserLastName,
    HistoricalDeviceStateEvent_Id,
    HistoricalDeviceStateEvent_Value,
    HistoricalDeviceStateEvent_Comment,
    HistoricalDeviceStateEvent_ComplementaryInformation,
    HistoricalDeviceStateEvent_EventDate,
    HistoricalDeviceStateEvent_StorageDate,
    HistoricalDeviceStateEvent_DeviceId,
    HistoricalDeviceStateEvent_DeviceLabel,
    HistoricalDeviceStateEvent_DeviceTypeLabel,
    HistoricalDeviceStateEvent_DeviceTypeStateId,
    HistoricalDeviceStateEvent_DeviceTypeStateLabel,
    HistoricalDeviceStateEvent_DeviceTypeStatePriority,
    HistoricalDeviceStateEvent_ProcessEventId,
    HistoricalDeviceStateEvent_DeactivationDate,
    HistoricalDeviceStateEvent_ActivationDate,
    HistoricalDeviceStateEvent_HierarchyParentId,
    HistoricalDeviceVariableValue_Id,
    HistoricalDeviceVariableValue_Value,
    HistoricalDeviceVariableValue_Comment,
    HistoricalDeviceVariableValue_ComplementaryInformation,
    HistoricalDeviceVariableValue_EventDate,
    HistoricalDeviceVariableValue_DeviceId,
    HistoricalDeviceVariableValue_DeviceLabel,
    HistoricalDeviceVariableValue_DeviceTypeVariableId,
    HistoricalDeviceVariableValue_DeviceTypeVariableLabel,
    HistoricalDeviceVariableValue_DeviceVariableValueId,
    HistoricalDeviceVariableValue_HierarchyParentId,
    HistoricalProcessEvent_Id,
    HistoricalProcessEvent_ProcessEventId,
    HistoricalProcessEvent_Label,
    HistoricalProcessEvent_Description,
    HistoricalProcessEvent_ModificationDateTime,
    HistoricalProcessEvent_CreationDateTime,
    HistoricalProcessEvent_ActualStateDateTime,
    HistoricalProcessEvent_IsDeviceStateEventActive,
    HistoricalProcessEvent_ProcessTypeId,
    HistoricalProcessEvent_ProcessTypeLabel,
    HistoricalProcessEvent_ActualLifeTimeStateId,
    HistoricalProcessEvent_ParentProcessEventId,
    HistoricalProcessEvent_ManualEventId,
    HistoricalProcessEvent_DeviceStateEventId,
    HistoricalProcessEvent_DeviceLabel,
    HistoricalProcessEvent_DeviceTypeStateLabel,
    HistoricalProcessEvent_HistoricalDeviceStateEventId,
    HistoricalProcessEvent_OwnerUserId,
    HistoricalProcessEvent_OwnerUserName,
    HistoricalProcessEvent_OwnerUserLastName,
    HistoricalProcessEvent_OwnerUserFirstName,
    HistoricalProcessEvent_HierarchyParentId,
    HistoricalProcessEvent_DeviceTypeLabel
}

export enum OperatorType {
    EqualTo,
    NotEqualTo,
    Greaterthan,
    GreaterThanOrEqualTo,
    LessThan,
    LessThanOrEqualTo,
    And,
    Or,
    Not,
    IN
}

export enum WidgetType {
    TABLE = "TABLE",
    LINE_CHART = 2,
    AREA_CHART = 3,
    COLUMN_CHART = 4,
    BAR_CHART = 5,
    PIE_CHART = 6,
    DONUT_CHART = 7,
    KPI = 8,
    GAUGE = 9,
    ARC_GAUGE = 10,
    LINEAR_GAUGE = 11
}
