/**
 * Equipment Schema for Firebase Realtime Database
 *
 * This file contains type definitions for equipment-related data structures
 * including the equipment hierarchy, record containers, and counters.
 */

import {ObjMap} from './general-types';
import {MediaItem} from "./records-types";

// ============================================================================
// EQUIPMENT DATA STRUCTURES
// ============================================================================

/**
 * Equipment hierarchy item
 * Used by: EquipmentService, EquipmentComponent
 * Components: equipment tree views, equipment selectors
 */
export interface EquipmentItem {
    $key?: string;
    name: string;
    name_en?: string;
    name_ru?: string; // Russian name
    name_uk?: string; // Ukrainian name
    name_pl?: string; // Polish name
    name_az?: string; // Azerbaijani name
    name_hr?: string; // Croatian name
    name_ka?: string; // Georgian name
    // [key: string]: any; // Additional localized names and other properties
    parentKey: string;
    level: number; // 1, 2, 3 for hierarchy levels
    details?: LocationDetails;
    childrenKeys?: Record<string, boolean>;
    records?: any[];
}

/**
 * Equipment records container
 * Used by: EquipmentService
 */
export interface EquipmentRecords {
    records: Record<string, string>; // recordKey -> recordType mapping
}

/**
 * Equipment record counters for statistics
 * Used by: EquipmentService for record/problem counting
 */
export interface EquipmentRecordCounters {
    $key: string;
    allRecords: number;
    activeProblems: number;
    activeProcesses: number;
}

/**
 * General equipment name configuration
 * Used by: EquipmentService for localization
 */
export interface GeneralEquipmentName {
    $value: string;
}

export interface EquipmentMap {
    [x: string]: EquipmentItem;
}

// Extended types from general-types
export interface LocationItem extends EquipmentItem {
    key: string;
    name: string;
    parentKey: string;
    path: string;
    level: number;
    details?: LocationDetails;
}

export interface LocationDetails {
    description?: string;
    hashId?: string;
    images?: ObjMap<MediaItem>;
    files?: any[];
    producer?: string;
    producerSerial?: string;
    producerType?: string;
    productionYear?: string;
    types?: string[];
}


export interface PathItem {
    $key: string;
    name: string;
    types: any[];
}