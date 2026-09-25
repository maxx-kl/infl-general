# Type Conflicts During Migration

This file tracks conflicts found when merging types from rtdb-schema with existing infl-general types.

## Conflicts to Resolve Later

### Record vs RecordData
- Two different interfaces representing the same Firebase record data
- **Key Differences Found:**
  - RecordData extends VersionedCacheEntity (has $version, $fromCache)
  - RecordData uses FirebaseKey type, Record uses string
  - RecordData uses TimestampValue, Record uses number
  - RecordData has mobile?: boolean (Record doesn't)
  - RecordData has rootCause, processType fields (Record doesn't)
  - RecordData has wgList (Record has editedWgList)
  - RecordData has tagClosedBy (Record doesn't)
  - RecordData has likes (Record doesn't)
  - Record has header field (RecordData doesn't)
  - Record has creatorGroupName, creatorEmail (RecordData doesn't)
  - Record has safetyViolation (RecordData doesn't)
  - Record has path field (RecordData doesn't)
  - Record has boards/boardLists (RecordData doesn't)
- **Resolution**: Merge all fields, use string for keys, number for timestamps

### User vs FacilityUser  
- Different user type definitions
- **Key Differences Found:**
  - FacilityUser extends CacheEntity (has $key, $value)
  - FacilityUser has workgroup, isDefaultFacility (User doesn't)
  - User has graphData.mail, FacilityUser has graphData with full MS Graph structure
  - FacilityUser uses FirebaseKey, User uses string
  - UserConnectionInfo has different structure (activeConnections vs simple online/lastOnline)
- **Resolution**: Keep both as separate types - User for global, FacilityUser for facility-scoped

### Equipment Types
- Multiple EquipmentItem definitions with different structures
- Need to consolidate equipment hierarchy types

### Base Type Integration
- rtdb-schema has CacheEntity, VersionedCacheEntity (frontend-specific)
- infl-general should only include $key field, not cache-specific fields

## Migration Notes
- Keep optional $key field in all types (historically used)
- Do not include $version, $fromCache, $value (frontend cache fields)
- Preserve exact field names and types from both systems
- Document any breaking changes needed

## Type Export Conflicts Found During Build:
- ImageData, Planning, Questionnaire, RecordAction, RecordFile, RecordImage, RecordType, RecordVideo, SubRecord, Translation (general-types vs records-types)
- NotificationToken, Team, TeamUsers, TeamsMap, User, UserTeams, UsersMap (general-types vs users-types)
- EquipmentItem, EquipmentMap, LocationItem, PathItem, TreeItem (general-types vs equipment-types)  
- Label, Workgroup, WorkgroupMap (general-types vs workgroups-types)
- TimeConfig (general-types vs database-types)
- FacilitySettings (database-types vs settings-types)

**Resolution Needed**: Remove duplicates from general-types, keep consolidated versions in specific type files