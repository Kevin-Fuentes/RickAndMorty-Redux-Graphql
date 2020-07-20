import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLoginAction,logOutAction } from "../../redux/userDuck";
import Spinner from './spinner/Spinner'




function LoginPage({ loggedIn, doGoogleLoginAction, fetching,logOutAction }) {
  function doLogin() {
    doGoogleLoginAction();
  }
  function logOut(){
    logOutAction()
  }
  if (fetching) return (
 <Spinner/>
    )
  
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <>
          <h1>Cierra tu sesión</h1>
          <button onClick={logOut}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <h1>Inicia Sesión con Google</h1>

          <button onClick={doLogin}>Iniciar</button>
        </>
      )}
    </div>
  );
}

function mapState({ user: { fetching, loggedIn } }) {
  return {
    fetching,
    loggedIn 
  };
}

export default connect(mapState, { doGoogleLoginAction,logOutAction})(LoginPage);
