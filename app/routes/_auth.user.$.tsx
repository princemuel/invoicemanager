import { UserProfile } from "@clerk/remix";

function PageRoute() {
  return <UserProfile path="/user" routing="path" />;
}

export default PageRoute;
