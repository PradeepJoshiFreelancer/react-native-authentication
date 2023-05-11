import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function singnupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
    } catch (error) {
      Alert.alert(
        "Signup unsuccessful!",
        "Could not process your request. Please check the inputs or try again after some time."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) return <LoadingOverlay message="Creating user...." />;

  return <AuthContent onAuthenticate={singnupHandler} />;
}

export default SignupScreen;
