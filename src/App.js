import "./App.css";
import CompanyDetails from "./Components/Pages/CompanyDetails";
import EmailVerifiacation from "./Components/Pages/EmailVerifivation";
import PersonalDetails from "./Components/Pages/PersonalDetails";
import Success from "./Components/Pages/Success";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import fetchCountries from "./apis/fetchCountries";
function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "male",
    country: "",
    state: "",
    phoneNumber: "",
    companyName: "",
    email: "",
    jobTitle: "",
    yearsOfExperiance: "",
    logo: "",
  });

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };
  const previousStep = () => {
    setStep((prevState) => prevState - 1);
  };
  const [dataList, setDataList] = useState([]);

  const [formValidity, setFormValidity] = useState({
    personalForm: false,
    companyForm: false,
    emailVerificationForm: false,
  });

  useEffect(() => {
    setDataList(fetchCountries());
  }, []);

  const componentToRender = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={nextStep}
            previousStep={previousStep}
            data={formData}
            setFormData={setFormData}
            dataList={dataList}
            setFormValidity={setFormValidity}
            isThisFormValid={formValidity.personalForm}
          />
        );
      case 2:
        return (
          <CompanyDetails
            nextStep={nextStep}
            previousStep={previousStep}
            data={formData}
            setFormData={setFormData}
            logo={formData.logo}
            setFormValidity={setFormValidity}
            isThisFormValid={formValidity.companyForm}
          />
        );
      case 3:
        return (
          <EmailVerifiacation
            previousStep={previousStep}
            nextStep={nextStep}
            isThisFormValid={formValidity.emailVerificationForm}
            setFormValidity={setFormValidity}
            data={formData}
            nextStep={nextStep}
          />
        );
      default:
        return <Success setStep={setStep} />;
    }
  };

  return (
    <div className="App">
      <Header step={step} formValidity={formValidity} />
      {componentToRender()}
    </div>
  );
}

export default App;
