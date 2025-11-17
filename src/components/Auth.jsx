import { auth, googleProvider } from '../config/firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup, signOut,onAuthStateChanged} from 'firebase/auth';
import { useState, useEffect } from 'react';

function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para acompanhar o usuário atual
    const [currentuser, setCurrentuser] = useState(null);

    // Atualizar o usuário automaticamente quando logar/deslogar
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentuser(user);
        });

        return () => unsubscribe();
    }, []);


    // Implementar cadastro com e-mail e senha
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.err(err);
        }
    };

    // Implementar autenticação com Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.err(err);
        }
    };

    // Implementar logout
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.err(err);
        }
    };


    // Interface de autenticação
    return(
        <div>
            <h2>
                Você está logado como:{" "}
                {currentuser ? currentuser.email : 'Nenhum usuário logado'}
            </h2>

            <input
                type='email'
                placeholder="E-mail" 
                onChange={(e) => setEmail(e.target.value)}
            />
        
            <input 
                type="password"
                placeholder="Senha" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            
            <button onClick={signIn}>Cadastrar</button> 
            <button onClick={signInWithGoogle}>Cadastrar com Google</button>
            <button onClick={logOut}>Encerrar Sessão</button>
        </div>
    )
}

export default Auth;
