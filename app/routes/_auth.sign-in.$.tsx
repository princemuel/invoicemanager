import { SignIn } from "@clerk/remix";

function PageRoute() {
  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
}

export default PageRoute;
