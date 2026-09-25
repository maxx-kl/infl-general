// All #key field values are unique Firebase-generated sortable keys. Field has length 20 symbols.
// #key field must be deleted before writing to backend

// Defines a generic type ObjMap that represents an object
// where the keys are strings and the values are of type T.
// T is a placeholder for any type, allowing this type to be reused
// with different value types across the application.
// import {CheckListItem} from './core/checklist/checklist.service';


// import {firestore} from 'firebase-admin';


// import FieldValue = firestore.FieldValue;
// import {Observable} from 'rxjs';
// import {Observable} from 'rxjs/Observable';

// import FieldValue = firebase.firestore.FieldValue;
// import {Observable} from 'rxjs';
//import * as firebase from 'firebase/app';
//import FieldValue = firebase.firestore.FieldValue;
// tslint:disable-next-line:import-blacklist
//import {Observable} from 'rxjs';

import {Board, BoardList} from "./canban-types";
import {CheckListItem} from "./checklist-types";
import {RecordType, Planning} from './records-types';

// Re-export types from other files to maintain compatibility
export {
    Planning, Questionnaire, RecordAction, RecordFile, RecordImage,
    RecordType, RecordVideo, SubRecord, Translation
} from './records-types';

export {
    NotificationToken, Team, TeamUsers, TeamsMap, User, UserTeams, UsersMap
} from './users-types';

export {
    EquipmentItem, EquipmentMap, LocationItem, PathItem
} from './equipment-types';

export {
    Label, Workgroup, WorkgroupMap
} from './workgroups-types';

export {
    TimeConfig
} from './database-types';

export interface ObjMap<T> {
    [x: string]: T; // 'x' can be any string, and the corresponding value will be of type T
}

// The Record type represents a detailed structure of a record entity.
// This can be used to define records with various metadata and attributes
// related to problems, tasks, and project management.


export type AtomicUpdate = any;

export interface SpRequest {
    creator: {
        displayName: string;
        nameLocal: string;
        workgroup: string;
    };
    dateCreated: number;

    priority: string; // Obsolete
    priorityType: string;

    selectedEquipmentKey: string; // Obsolete
    eqL3Key: string;

    trelloStatus: string;
    status: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    positions: {}[];
}


export interface DraftInfo {
    description?: string;
    done?: string;
    todo?: string;
    aiLocation?: string;
    aiText?: string;
    recordType: RecordType;
    locationKey?: string;
    safety?: boolean;
    quality?: boolean;
    qualityAnomalies?: string[];
    planning?: Planning;
}

// Utility function to remove empty strings from a DraftInfo object
export function cleanDraftInfo(draft: DraftInfo): DraftInfo {
    const cleanedDraft = {...draft};

    // Iterate over the object properties and remove any empty strings
    Object.keys(cleanedDraft).forEach((key) => {
        if (!cleanedDraft[key as keyof DraftInfo] || cleanedDraft[key as keyof DraftInfo] === 'undefined') {
            delete cleanedDraft[key as keyof DraftInfo];
        }
    });

    return cleanedDraft as DraftInfo;
}


// bg color for banner: rgb(26 128 98)
