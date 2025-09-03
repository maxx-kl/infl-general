import {ObjMap} from "./general-types";

export interface CheckListItem {
    $key?: string;
    checked: boolean;
    order: number;
    text: string;
    creatorKey: string;
    creatorName: string;
    dateCreated: number | any;
    deleted?: boolean;
    lastUpdated?: number | any;
    updatedByKey?: string;
    updatedByName?: string;
    checkedDate?: number | any;
    checkedByKey?: string;
    checkedByName?: string;
    checkListKey?: string;
    due?: number | any;
    dueSetByKey?: string;
    records?: ObjMap<boolean>;
    dueSetByName?: string;
    responsible?: ResponsibleUser;
    responsibleSetByKey?: string;
    responsibleSetByName?: string;
    facilityKey: string;
}

export interface CheckListInfo {
    totalCounter: number;
    checkedCounter: number;
}


/**
 * User information for checklist item responsibility assignment
 */
export interface ResponsibleUser {
    /** User unique key */
    key: string;
    /** User display name */
    displayName: string;
    /** Short user identifier (initials) */
    short: string;
    /** User workgroup key for color coding and organization */
    workgroup?: string;
    /** Original Firebase key (temporary during processing) */
    $key?: string;
    /** Email (removed during processing for privacy) */
    email?: never;
    /** Graph data (removed during processing) */
    graphData?: never;
}

/**
 * Notification request payload for checklist item due dates
 */
export interface ChecklistDueNotificationPayload {
    due: number;
    dueSetByKey: string;
    facilityKey: string;
    recordKey: string;
    itemId: string;
    date: number;
}

/**
 * Notification request payload for checklist item responsibility assignment
 */
export interface ChecklistResponsibilityNotificationPayload {
    responsibleKey?: string;
    responsibleSetByKey: string;
    facilityKey: string;
    recordKey: string;
    itemId: string;
    date: number;
}

/**
 * Notification request structure for checklist operations
 */
export interface ChecklistNotificationRequest {
    type: 'notificationRequest-checklistItem-due' | 'notificationRequest-checklistItem-responsible';
    payload: ChecklistDueNotificationPayload | ChecklistResponsibilityNotificationPayload;
}