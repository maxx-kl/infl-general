/**
 * Settings Schema for Firebase Realtime Database
 *
 * This file contains type definitions for facility settings and configuration.
 */

// ============================================================================
// FACILITY SETTINGS
// ============================================================================

/**
 * Facility settings and configuration
 * Used by: FacilitySettingsService
 */
export interface FacilitySettings {
    behaviorAudits?: boolean | null;
    behaviorAuditsExport?: boolean | null;
    hsTgGroup?: boolean | null;
    info?: Record<string, unknown> | null;
    labelsForWorkRecords?: boolean | null;
    localLanguage?: string;
    planningHistory?: boolean | null;
    projects?: boolean | null;
    qualityObservations?: boolean | null;
    safetyObservations?: boolean | null;
    tagging?: boolean | null;
    tecProcesses?: boolean | null;
    userNameFormat?: 'Surname, Name' | 'Name Surname' | null;
}