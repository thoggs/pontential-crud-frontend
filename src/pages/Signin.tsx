import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';
import '../styles/signin.scss';


export function Signin() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  async function handleLoginAuth() {
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (e) {
        history.push('/');
        return
      }
    }
    history.push('/home');
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
