export enum FILE_TYPE {
  Folder = "folder",
  File = "file",
};

export const API_ENDPOINTS = {
  // 取得
  GET_FILES: {
    path: "files",
    method: "GET",
  },
  // フォルダー
  CREATE_FOLDER: {
    path: "folders",
    method: "POST",
  },
  UPDATE_FOLDER: {
    path: "folders",
    method: "PUT",
  },
  DELETE_FOLDER: {
    path: "folders",
    method: "DELETE",
  },
  // 写真
  UPLOAD_PHOTO: {
    path: "photos",
    method: "POST",
  },
  UPDATE_PHOTO: {
    path: "photos",
    method: "PUT",
  },
  DELETE_PHOTO: {
    path: "photos",
    method: "DELETE",
  },
};

export enum API_PATH {
  SEARCH = "search",
};
