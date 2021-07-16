import './App.css';
import CompanyDetails from './Components/CompanyDetails';
import EmailVerifiacation from './Components/EmailVerifivation';
import PersonalDetails from './Components/PersonalDetails';
import Success from './Components/Success';
import {useState} from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName:'',
    gender:'',
    country:'',
    state:'',
    phone:'',
    companyName:'',
    emailId:'',
    jobTitle:'',
    yearsOfExperiance:'',
    
  })

  const nextStep = ()=>{
    setStep(prevState => prevState + 1)
  }
  const previousStep = ()=>{
    setStep(prevState => prevState - 1)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState=>({
      ...prevState,
      [name]:value
    }))
    console.log('changed')
  }

  const componentToRender = ()=>{
    switch (step){
      case 1:
        return <PersonalDetails nextStep={nextStep} previousStep={previousStep} data={formData} changeHandler={handleChange}/>
      case 2:
        return <CompanyDetails nextStep={nextStep} previousStep={previousStep}/>
      case 3:
        return <EmailVerifiacation previousStep={previousStep}/>
      default:
        return <Success />
    }
  }

  return (
    <div className="App">
      squash
      {componentToRender()}
    </div>
  );
}

export default App;
