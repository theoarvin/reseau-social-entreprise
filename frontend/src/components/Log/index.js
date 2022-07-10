import React, {  useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true)
    const [signInModal, setSignInModal] = useState(false)
    
    const handleModals = (e) => {
      if(e.target.id === "register"){
        setSignUpModal(true);
        setSignInModal(false);
      }else if (e.target.id === "login"){
        setSignInModal(true);
        setSignUpModal(false);
        
      } 
    }
    return (
        <div>
            <div>
                <ul>
                    <button onClick={handleModals} id="register">S'inscrire</button>
                    <button onClick={handleModals} id="login">Se connecter</button>
                </ul>
                
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;