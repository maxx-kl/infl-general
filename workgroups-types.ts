/**
 * Workgroups Schema for Firebase Realtime Database
 *
 * This file contains type definitions for workgroup and label management.
 */

// ============================================================================
// WORKGROUPS AND LABELS
// ============================================================================

/**
 * Workgroup definition
 * Used by: WorkgroupService
 * Components: workgroup selectors, filters
 */
export interface Workgroup {
  $key?: string;
  name: string;
  shortName?: string;
  color: string;
  colorName?: string;
  order?: number;
  journal?: boolean;
}

export interface WorkgroupMap {
  [x: string]: Workgroup;
}

export interface Label {
  $key?: string;
  name: string;
  color: string;
}