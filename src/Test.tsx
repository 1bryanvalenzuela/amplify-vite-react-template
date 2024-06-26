import { Authenticator, Button, Heading, Image, Text, useAuthenticator, useTheme, View } from "@aws-amplify/ui-react";
import { useState } from "react";

const Footer: React.FC<{ setShowAuthentication: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setShowAuthentication }) => {
  const { tokens } = useTheme();
  return (
    <View textAlign="center" padding={tokens.space.large}>
      <Text color={tokens.colors.neutral[80]}>
        &copy; All Rights Reserved
      </Text> <br />
      <button onClick={() => setShowAuthentication(false)}>Close</button>
    </View>
  );
};

const components = {

    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Amplify logo"
            src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
      );
    },
  
    Footer: ({ setShowAuthentication }: { setShowAuthentication: React.Dispatch<React.SetStateAction<boolean>> }) => (
      <Footer setShowAuthentication={setShowAuthentication} />
    ),
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
      //Footer() {
      //  const { toResetPassword } = useAuthenticator();
  
      //  return (
      //    <View textAlign="center">
      //      <Button
      //        fontWeight="normal"
      //        onClick={toResetPassword}
      //        size="small"
      //        variation="link"
      //      >
      //        Reset Password
      //      </Button>
      //    </View>
      //  );
      //},
      },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    SetupTOTP: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };
  
  export default function App() {
    const [showAuthentication, setShowAuthentication] = useState(false);

    if(showAuthentication) {
        return (
            <>
                <Authenticator variation="modal" components={{ ...components, Footer: () => components.Footer({ setShowAuthentication }) }}>
                    {({ signOut }) => <button onClick={signOut}>Sign out</button>}
                </Authenticator>
            </>
          );
    }
    else {
        return (
            <button onClick={() => setShowAuthentication(!showAuthentication)}>Login</button>
        )
    }
  }