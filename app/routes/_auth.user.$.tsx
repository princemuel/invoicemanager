import { UserProfile } from "@clerk/react-router";

export default function Page() {
  return <UserProfile path="/user" routing="path" />;
}
