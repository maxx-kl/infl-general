/**
 * Projects Schema for Firebase Realtime Database
 *
 * This file contains type definitions for project management.
 */

// ============================================================================
// PROJECTS
// ============================================================================

/**
 * Project definition
 * Used by: ProjectsService
 * Components: project selectors, project management
 */
export interface Project {
  $key?: string;
  name: string;
  description?: string;
  dateCreated?: number;
  creatorKey?: string;
  status?: string;
}