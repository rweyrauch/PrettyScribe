/// <reference types="jquery" />

declare global {
  interface JQuery {
    modal(action: 'show' | 'hide' | 'toggle' | 'handleUpdate'): JQuery;
  }
}

export {};

