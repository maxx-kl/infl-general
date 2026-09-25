/**
 * Users and Presence Schema for Firebase Realtime Database
 *
 * This file contains type definitions for user management, presence tracking,
 * and user-related data structures.
 */

import {RecordRequisites} from './records-types';
import {ObjMap} from './general-types';

// ============================================================================
// USER AND PRESENCE DATA
// ============================================================================

/**
 * Global user data
 */
export interface User {
  $key?: string;
  email: string;
  displayName: string;
  graphData?: {
    mail: string;
  } | MicrosoftGraphData;
}

/**
 * Facility user data
 * Used by: UserService, PresenceService
 * Components: user lists, user popups, online indicators
 */
export interface FacilityUser {
  $key?: string;
  displayName: string;
  email: string;
  workgroup: string;
  isDefaultFacility?: boolean;
  graphData?: MicrosoftGraphData;
}

/**
 * Microsoft Graph data for users
 */
export interface MicrosoftGraphData {
  id: string;
  city?: string;
  country?: string;
  department?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  userPrincipalName?: string;
  photo?: {
    mediaEtag: string;
    url: string;
  };
}

/**
 * User connection info for presence tracking
 * Used by: PresenceService
 */
export interface UserConnectionInfo {
  online?: boolean;
  lastOnline: number;
  activeConnections?: Record<string, ActiveConnection>;
  ext?: boolean; // External facility flag
}

/**
 * Active connection details
 */
export interface ActiveConnection {
  connected: number;
  appVersion: string;
  mobile?: boolean;
}

/**
 * User records organized by email
 * Used by: UserService for user record views
 */
export interface UserRecordsData {
  activeProblems: UserRecordItem[];
  closedProblems: UserRecordItem[];
  workRecords: UserRecordItem[];
}

/**
 * User record item for user record lists
 */
export interface UserRecordItem {
  $key: string;
  requisites: RecordRequisites;
  lastUpdated: number;
}

/**
 * Firebase Cloud Messaging token
 * Used by: UserService for push notifications
 */
export interface NotificationToken {
  userKey: string;
  token?: string;
  reportUnseenRecords?: boolean;
}

export interface UsersMap {
  [x: string]: User;
}

export interface Team {
  name: string;
  users: UsersMap;
}

export interface TeamsMap {
  [x: string]: Team;
}

export type TeamUsers = UsersMap;
export type UserTeams = TeamsMap;