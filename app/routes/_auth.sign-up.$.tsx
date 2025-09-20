import { SignUp } from "@clerk/react-router";

export default function Page() {
  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}
