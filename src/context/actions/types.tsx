export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};


export enum Types {
  Login_update = 'LOGIN_UPDATE',
  Logout_update = 'LOGOUT_UPDATE'
}

export enum AnalysisTypes {
  Update_list = 'UPDATE_LIST',
  Update_page = 'UPDATE_PAGE',
  Update_perpage = 'UPDATE_PERPAGE',
  Update_total = 'UPDATE_TOTAL'
}

export enum CreateAnalysisTypes {
  Update_patient_ID = 'UPDATE_PATIENT_ID',
  Update_patient_personal_info = 'UPDATE_PATIENT_PERSONAL_INFO',
  Add_selected_studies_UID = "ADD_SELECTED_STUDY_UID",
  Remove_selected_studies_UID = 'REMOVE_SELECTED_STUDIES_UID',
  UpdateCurrSelectedStudyUID = "UPDATE_CURRENT_SELECTED_UID",
  Clear_selected_studies_UID = "CLEAR_SELECTED_STUDIES_UID"
}

export enum DicomImagesTypes {
  UpdateImages = 'UPDATE_DICOM_IMAGES'
}

export enum StagingDcmImagesTypes {
  UpdateStaging = 'UPDATE_STAGING',
}