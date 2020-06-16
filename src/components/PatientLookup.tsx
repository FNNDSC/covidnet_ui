import React, { useContext } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Button,
  TextInput,
} from '@patternfly/react-core';
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/context";
import { CreateAnalysisTypes, DicomImagesTypes } from "../context/actions/types";
import RightArrowButton from "../pages/CreateAnalysisPage/RightArrowButton";
import chris_integration from '../services/chris_integration'

enum PrivacyLevel {
  ANONYMIZE_ALL_DATA = "Anonymize all data",
  ANONYMIZE_X_DATA = "X"
}

interface PatientLookupProps {
  isOnDashboard: boolean
}

const PatientLookup = (props: PatientLookupProps) => {
  const { state, dispatch } = useContext(AppContext);
  const [privacyLevel, setPrivacyLevel] = React.useState(PrivacyLevel.ANONYMIZE_ALL_DATA)
  const { createAnalysis } = state;
  const history = useHistory();

  // dropdown
  const [isDropDownOpen, setDropDownOpen] = React.useState(false);

  const onSelect = (value: any) => {
    console.log(value)
    setDropDownOpen(!isDropDownOpen);
    onFocus();
  }

  const onFocus = () => {
    const element = document.getElementById('toggle-Privacy-Level');
    if (element) element.focus();
  };

  const newLookup = async () => {
    const dcmImages = await chris_integration.fetchPacFiles(createAnalysis.patientID);
    dispatch({
      type: DicomImagesTypes,
      payload: {
        images: dcmImages
      }
    })
  }

  const setPatientid = (value: string) => {
    dispatch({
      type: CreateAnalysisTypes.Update_patient_ID,
      payload: {
        patientID: value
      }
    })
  }

  const dropdownItems = [
    <DropdownItem key="Anonymize all data" onClick={() => setPrivacyLevel(PrivacyLevel.ANONYMIZE_ALL_DATA)}>
      {PrivacyLevel.ANONYMIZE_ALL_DATA}
    </DropdownItem>,
    <DropdownItem key="Anonymize x data" onClick={() => setPrivacyLevel(PrivacyLevel.ANONYMIZE_X_DATA)}>
      {PrivacyLevel.ANONYMIZE_X_DATA}
    </DropdownItem>,
  ];

  const navigateToCreateAnalysis = async () => {
    await newLookup();
    history.push("/createAnalysis");
  }

  const submitButton = props.isOnDashboard ? (
    <RightArrowButton click={navigateToCreateAnalysis}>Continue</RightArrowButton>
  ) : (
      <Button variant="secondary" onClick={newLookup}>
        <b>New Lookup</b>
      </Button>
    );

  return (
    <React.Fragment>
      <div className="InputRow">
        <div className="InputRowField">
          <label>Patient UID</label>
          <TextInput value={createAnalysis.patientID} type="text" onChange={setPatientid} aria-label="text input example" />
        </div>
        <div className="InputRowField">
          <label>Privacy Level</label>
          <Dropdown
            onSelect={onSelect}
            toggle={
              <DropdownToggle id="toggle-Privacy-Level" onToggle={setDropDownOpen}>
                <div className="dropdownContent">
                  {privacyLevel}
                </div>
              </DropdownToggle>
            }
            isOpen={isDropDownOpen}
            dropdownItems={dropdownItems}
          />
        </div>
        <div className="InputRowField">
          {submitButton}
        </div>
      </div>
    </React.Fragment>
  )

}

export default PatientLookup