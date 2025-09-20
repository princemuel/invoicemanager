import { SignIn } from "@clerk/react-router";

export default function Page() {
  return <SignIn path="/login" routing="path" signUpUrl="/register" />;
}
