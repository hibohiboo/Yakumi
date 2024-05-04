declare let VITE_DEFINE_BASE_PATH: string;
declare let VITE_SPREAD_SHEET_KEY: string;

export const basePath = VITE_DEFINE_BASE_PATH;
export const spreadSheetKey = VITE_SPREAD_SHEET_KEY;
export const dataServerDomain = import.meta.env.VITE_DATA_SERVER;
