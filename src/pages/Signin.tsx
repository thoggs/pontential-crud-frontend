import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import {useAuth} from '../hooks/auth/useAuth';
import {IsSignedStatus} from "../@type/enums/enums";
import {useNavigate} from "react-router-dom";


export function Signin() {
  const navigate = useNavigate();
  const {signInWithGoogle, isSigned} = useAuth();

  async function handleLoginAuth() {

    if (isSigned === IsSignedStatus.FALSE) {
      try {
        await signInWithGoogle()
      } catch (e) {
        navigate('/')
        return
      }
    }
    navigate('/home')
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Illustration logo'/>
        <strong>A forma mais simples de gerenciar sua Squad</strong>
        <p>Organize sua Squad de qualquer lugar</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='logo img'/>
          <button onClick={handleLoginAuth} className='login-button'>
            <img src={googleIconImg} alt='Google logo'/>
            Entrar com o Google
          </button>
          <div className='separator'>Você precisa fazer login</div>
        </div>
      </main>
    </div>
  )
}
