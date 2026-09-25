/**
 * Complete Database Schema for Firebase Realtime Database
 *
 * This file contains the main database structure definitions including
 * FacilityData and global database structures.
 */

import {RecordData, RecordRequisites, TagCustomAuthor, UnseenRecord, DraftData, HsGroupData, PlanningHistory} from './records-types';
import {FacilityUser, UserConnectionInfo, NotificationToken, UserRecordsData} from './users-types';
import {Project} from './projects-types';
import {EquipmentItem, EquipmentRecords, GeneralEquipmentName, EquipmentRecordCounters} from './equipment-types';
import {Workgroup} from './workgroups-types';

// ============================================================================
// FACILITY-SCOPED DATABASE STRUCTURE
// ============================================================================

/**
 * Main facility data structure
 * Root path: /facilityData/{facilityKey}
 *
 * This interface defines the complete structure of data scoped to a specific
 * facility within the IntelliFlow system. Each facility has its own isolated
 * data space containing equipment, records, users, and configuration.
 */
export interface FacilityData {
  drafts: Record<string, DraftData>;
  equipment: Record<string, EquipmentItem>;
  equipmentRecordCounters: Record<string, EquipmentRecordCounters>;
  equipmentRecords: Record<string, EquipmentRecords>;
  generalEquipmentName: GeneralEquipmentName;
  hsGroup: HsGroupData;
  labels: LabelsData;
  monitoring: MonitoringData;
  notificationTokens: Record<string, NotificationToken>;
  planningHistory: PlanningHistory;
  processData: Record<string, ProcessData>;
  processStatuses: Record<string, any>;
  projects: Record<string, Project>;
  questionnaires: Record<string, QuestionnaireData>;
  rca: Record<string, RootCauseAnalysis>;
  recordRequisites: Record<string, RecordRequisites>;
  records: Record<string, RecordData>;
  settings: FacilitySettings;
  shifts: Record<number, ShiftData>;
  stats: StatsData;
  tagCustomAuthors: Record<string, TagCustomAuthor>;
  timeConfig: TimeConfig;
  translations: Record<string, TranslationData>;
  unseenRecords: Record<string, UnseenRecord>;
  userConnectionInfo: Record<string, UserConnectionInfo>;
  userRecords: Record<string, UserRecordsData>;
  users: Record<string, FacilityUser>;
  versionControl: Record<string, number>;
  workgroups: Record<string, Workgroup>;
}

// ============================================================================
// GLOBAL DATABASE STRUCTURE (non facility-scoped)
// ============================================================================

/**
 * Root level database structure
 * Used by: AccessControlService, FirebaseUtilityService
 */
export interface RootDatabase {
  users: Record<string, GlobalUser>;
  facilities: Record<string, FacilityMetadata>;
  files: FileRequestResponse;
  userData: Record<string, UserData>;
  qrLinks: QrLinksData;
  telegramHistory: Record<string, TelegramHistoryData>;
  telegramGroups: Record<string, TelegramGroupData>;
  facilityData: Record<string, FacilityData>;
}

/**
 * Global user data (not facility-scoped)
 * Used by: AccessControlService, UserService
 */
export interface GlobalUser {
  defaultFacility?: string;
  telegram?: {
    id: number | string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Facility metadata
 * Used by: AccessControlService
 */
export interface FacilityMetadata {
  $key: string;
  name: string;
  [key: string]: any;
}

/**
 * User-specific application data
 */
export interface UserData {
  bannersSeen: Record<string, boolean>;
  [key: string]: any;
}

/**
 * QR code link request system
 */
export interface QrLinksData {
  files: Record<string, QrLink>;
  request?: Record<string, any>;
}

export interface QrLink {
  originalUrl: string;
  shortUrl: string;
}

/**
 * File request/response system for Telegram integration
 */
export interface FileRequestResponse {
  request: Record<string, FileRequest>;
  response: Record<string, FileResponse>;
}

export interface FileRequest {
  uid: string;
  fileId: string;
}

export interface FileResponse {
  fileLink: string;
  [key: string]: any;
}

// ============================================================================
// TELEGRAM INTEGRATION
// ============================================================================

export interface TelegramHistoryData {
  private: Record<string, TelegramMessage>;
  [groupId: string]: Record<string, TelegramMessage> | number;
}

export interface TelegramGroupData {
  messages: Record<string, TelegramMessage>;
  users: Record<string, TelegramUser>;
  [key: string]: any;
}

export interface TelegramMessage {
  date: number;
  message_id: number;
  dateHeader?: boolean;
  dummy?: boolean;
  [key: string]: any;
}

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  [key: string]: any;
}

// ============================================================================
// ADDITIONAL TYPES (placeholder definitions)
// ============================================================================

export interface TimeConfig {
  timeZone: string;
  shifts: {
    startH: number;
    title: string;
  }[];
}

export interface LabelsData {
  [key: string]: any;
}

export interface MonitoringData {
  [key: string]: any;
}

export interface StatsData {
  [key: string]: any;
}

export interface ProcessData {
  [key: string]: any;
}

export interface QuestionnaireData {
  [key: string]: any;
}

export interface RootCauseAnalysis {
  [key: string]: any;
}

// Re-exported from settings-types
import {FacilitySettings} from './settings-types';

export interface ShiftData {
  [key: string]: any;
}

export interface TranslationData {
  [key: string]: any;
}