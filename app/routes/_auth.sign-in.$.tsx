import { SignIn } from "@clerk/react-router";

export default function Page() {
  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}
