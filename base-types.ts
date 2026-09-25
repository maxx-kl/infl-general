/**
 * Base Types and Utilities for Firebase Realtime Database Schema
 *
 * This file contains fundamental type definitions used throughout the IntelliFlow
 * Firebase Realtime Database schema. These types form the foundation for all
 * other schema files.
 */

// ============================================================================
// BASE TYPES AND UTILITIES
// ============================================================================

/** Firebase server value placeholder for timestamps */
export interface ServerTimestamp {
  '.sv': 'timestamp';
}

/** Firebase key type */
export type FirebaseKey = string;

/** Union type for timestamp values - can be number or server value */
export type TimestampValue = number;

// ============================================================================
// COMMONLY USED COMPOUND TYPES
// ============================================================================

/** Firebase system info structure */
export interface FirebaseInfo {
  serverTimeOffset: number;
  connected: boolean;
}