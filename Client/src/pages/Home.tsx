import { roleStore } from "@/store/roleStore";
import Button from "../components/general/Button";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { role } = roleStore();
  const { logout } = useAuth();
  console.log(role);
  return (
    <>
      <div className="text-[12rem]">Home</div>
      <Button className="">Submit</Button>
      <div className="text-3xl text-blue-300">skibidi</div>
      <div>{role ? role : "null"}</div>
      <button onClick={logout}>logout</button>
    </>
  );
}
