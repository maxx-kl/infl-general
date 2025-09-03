
// BoardList represents a column or list within a board.
import {ImageData, ObjMap} from "./types";
import {CheckListItem} from "./checklist-types";

export interface BoardList {
    key: string; // Unique identifier for the list
    name: string; // Display name of the list
    boardKey: string; // Reference to the board it belongs to
    cards: Card[]; // Array of cards in this list
    position: number; // Position of the list within the board
}

// Board represents the entire board, with multiple lists.
export interface Board {
    key: string; // Unique identifier for the board
    title: string; // Title of the board
    description?: string; // Optional description of the board
    lists: ObjMap<BoardList>; // All lists within the board
    background?: string; // Board background color or image
}

// Card represents the tasks or items inside a list.
export interface Card {
    key: string; // Unique identifier for the card
    boardKey: string; // Unique identifier for the board
    listKey: string; // Reference to the list it belongs to
    title: string; // Title of the card
    description?: string; // Optional description of the card
    position: number; // Position within the list
    color?: string; // Optional card color
    dueDate?: Date; // Optional due date for the card
    labels?: string[]; // Optional array of labels
    images?: ImageData[]; // Optional array of labels
    checkLists?: CheckListItem[]; // Optional array of labels
}
