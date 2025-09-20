import { SignUp } from "@clerk/react-router";

export default function Page() {
  return <SignUp path="/register" routing="path" signInUrl="/login" />;
}
