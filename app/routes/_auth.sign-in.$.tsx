import { SignIn } from '@clerk/remix';

function SignInPage() {
  return <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />;
}

export default SignInPage;
