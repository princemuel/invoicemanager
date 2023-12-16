import { SignUp } from "@clerk/remix";

function PageRoute() {
  return <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />;
}

export default PageRoute;
