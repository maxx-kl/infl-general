/**
 * Records Schema for Firebase Realtime Database
 *
 * This file contains type definitions for work records, problems, comments,
 * and all related data structures used in the record management system.
 */

import {FirebaseKey, TimestampValue} from './base-types';
import {ObjMap} from './general-types';
import {Board, BoardList} from './canban-types';
import {CheckListItem} from './checklist-types';

// ============================================================================
// WORK RECORDS AND PROBLEMS
// ============================================================================

/**
 * Base work record structure
 * Used by: RecordsService, RecordItemService
 * Components: record displays, record creation dialogs
 */
export interface RecordData {
  $key?: string;
  
  recordType: RecordType;
  dateCreated: number;
  lastUpdated: number;
  creatorKey: string;
  creatorName: string;
  creatorGroup: string;

  // Equipment-related metadata
  eqL1Key: string;
  eqL2Key: string;
  eqL3Key: string;
  
  mobile?: boolean;
  
  // Reference to the parent record, if any, otherwise undefined. Only 'workRecord' can have it
  parentRecordRef?: string;

  
  // Work record or problem specific
  done?: string;
  
  // Problem specific
  description?: string;
  todo?: string;
  closed?: boolean;
  
  // Additional fields
  priority?: 'high' | 'normal' | 'low' | string | undefined;
  pdcaStatus?: 'pdcaStatusPlan' | 'pdcaStatusDo' | 'pdcaStatusCheck' | 'pdcaStatusAct' | 'pdcaStatusArchive' | string | undefined;
  projectKey?: string;
  rootCause?: string;
  processType?: string;
  hashId?: string;
  hasChecklist?: boolean;
  
  // Tag related
  tagType?: 'tecTag' | 'hsTag' | string;
  tagInfo?: TagInfo | undefined;
  tagClosedBy?: string;
  nearMiss?: boolean;
  safety?: string | boolean;
  safetyViolation?: string;
  
  // Media and files
  images?:  ObjMap<RecordImage>;
  files?: ObjMap<RecordFile>;
  videos?:  ObjMap<RecordVideo>;
  
  // Workgroups and labels
  editedWgList?:  ObjMap<boolean>;
  labels?: ObjMap<boolean>;
  
  // Sub-records (comments, state changes, etc.)
  subRecords?:  ObjMap<SubRecord>;
  
  // Actions log
  actions?: ObjMap<RecordAction>;
  
  // Likes
  likes?: ObjMap<Like>;
  
  // Planning and RCA
  planning?: Planning | string;
  rca?: any | Questionnaire;
  
  // Questionnaire data
  questionnaire?: Questionnaire;
  
  // Trello card references related to this record (if applicable)
  trelloCards?: ObjMap<any> | undefined;
  
  quality?: boolean;
  qualityAnomalies?: string[];
  
  // Keys of connected checklists, will be implemented in realtime DB
  checkLists?: ObjMap<CheckListItem> | undefined;
  
  translations?: ObjMap<Translation> | undefined;
  path?: string;
}

/**
 * Record requisites for efficient querying and filtering
 * Used by: RecordsService, UserService for problem lists
 */
export interface RecordRequisites {
  $key?: string;
  recordType: RecordType;
  creatorKey: string;
  creatorGroup: string;
  eqL1Key: string;
  eqL2Key: string;
  eqL3Key: string;
  dateCreated: number;
  lastUpdated: number;
  lastUpdatedByChecklist?: number;
  dateActivated?: number;
  dateClosed?: number;
  activatedByKey?: string;
  closedByKey?: string;
  priority?: string;
  tagType?: string;
  tagInfo?: {number: string};
  nearMiss?: boolean;
  editedWgList?: ObjMap<boolean>;
  labels?: ObjMap<boolean>;
}

/**
 * Parent record reference for sub-records
 */
export interface ParentRecordReference {
  key: string;
  description: string;
  dateCreated: number;
  stateChange: string;
}

/**
 * Tag information
 */
export interface TagInfo {
  number: string | number;
  closedBy?: string;
  anomalies?: { color: string; name: string }[];
  author?: string;
  type?: string;
}

/**
 * Sub-record (comments, state changes, links)
 */
export interface SubRecord {
  $key?: string;
  recordType: SubRecordType | string;
  dateCreated: number;
  creatorKey: string;
  creatorName: string;
  creatorGroup: string;
  mobile?: boolean;
  
  // Comment specific
  commentText?: string;
  
  // State change specific
  stateChange?: StateChangeType | string;
  done?: string;
  tagClosedBy?: string;
  
  // Link specific
  linkType?: string;
  linkText?: string;
  link?: string;
  
  // Media
  images?: ObjMap<RecordImage>;
  files?: ObjMap<RecordFile>;
  videos?: ObjMap<RecordVideo>;
  
  // Reply context
  inReplyTo?: string;
  
  // Planning and RCA
  planning?: Planning | string;
  rca?: any | Questionnaire;
}

/**
 * Record action for audit trail
 */
export interface RecordAction {
  type:
    | 'UPDATE_PRIORITY'
    | 'UPDATE_PROJECT'
    | 'EDIT_WORKGROUPS'
    | 'EDIT_LABELS'
    | 'EDIT_ROOT_CAUSE'
    | 'ADD_CHECKLIST'
    | 'REMOVE_CHECKLIST'
    | 'MOVE_RECORD'
    | 'ADD_PROCESS_CONNECTION'
    | 'REMOVE_PROCESS_CONNECTION'
    | string;
  payload: {
    dateCreated: number;
    user: {
      key: string;
      name: string;
      group: string;
    };
    mobile?: boolean;
    [key: string]: any; // Action-specific payload
  } | any;
}

/**
 * Like on record or sub-record
 */
export interface Like {
  userName: string;
  date: number;
}

// ============================================================================
// MEDIA AND FILES
// ============================================================================

/**
 * Media item structure
 */
export interface MediaItem {
  url: string;
  size: {
    width: number;
    height: number;
  };
}

/**
 * File attachment structure
 */
export interface FileItem {
  name: string;
  url: string;
  size?: number;
  type?: string;
}

/**
 * Video attachment structure
 */
export interface VideoItem {
  name: string;
  url: string;
  size?: number;
  duration?: number;
}

// ============================================================================
// RECORD MANAGEMENT
// ============================================================================

/**
 * Custom tag author
 * Used by: RecordsService for tag management
 */
export interface TagCustomAuthor {
  name: string;
}

/**
 * Unseen record tracking
 * Used by: RecordItemService for notification management
 */
export interface UnseenRecord {
  [key: string]: any;
}

/**
 * AI draft processing
 * Used by: RecordsService for AI-assisted record creation
 */
export interface DraftData {
  aiDraft: any; // DraftInfo from external types
  draft?: any; // Processed draft
  userKey: string;
  created: number;
  lastUpdated: number;
}

/**
 * Health, Safety & Environment group data
 * Used by: RecordsService for HSE tracking
 */
export interface HsGroupData {
  log: Record<string, HseLogEntry>;
}

export interface HseLogEntry {
  processed?: string; // Link to created record
  [key: string]: any;
}

/**
 * Planning history data
 * Used by: StatsComponent
 */
export interface PlanningHistory {
  weeks: Record<string, any>;
}

/**
 * Questionnaire answers structure
 */
export interface QuestionnaireAnswers {
  questions: Record<string, QuestionnaireQuestion>;
  [key: string]: any;
}

export interface QuestionnaireQuestion {
  [key: string]: any;
}

// Legacy types from general-types
export interface RecordImage {
  image: MediaItem;
  thumbnail: MediaItem;
}


export type RecordFile = any;
export type RecordVideo = any;

export interface Translation {
  original: string;
  detectedLanguage: string;
  translations: ObjMap<string>;
}

export interface Questionnaire {
  type: string;
  questions: ObjMap<any>;
}

export type Planning = 'planned' | 'unplanned';

// ============================================================================
// TYPE EXPORTS FOR COMMON USAGE
// ============================================================================

export type RecordType = 'workRecord' | 'activeProblem' | 'closedProblem' | 'goal' | 'todo' | 'ai' | 'problem';
export type SubRecordType = 'comment' | 'workRecord' | 'stateChange' | 'link';
export type StateChangeType = 'active' | 'closed';