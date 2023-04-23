import { useAuth0 } from "@auth0/auth0-react";
import MainView from "./components/MainView";
import Button from "./components/Button";

/**
 * Topmost component which handles user login and user data
 */
export default function App() {
  const { isLoading, error, user, loginWithRedirect, loginWithPopup, logout } =
    useAuth0();

  function handleLogout() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  } else if (isLoading) {
    return <div>Waiting for login ...</div>;
  } else if (!user) {
    return (
      <div>
        <Button onClick={() => loginWithRedirect()}>
          log in with redirect
        </Button>
        <Button onClick={() => loginWithPopup()}>log in with popup</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={handleLogout}>log out</Button>
        <MainView />
      </div>
    );
  }
}
