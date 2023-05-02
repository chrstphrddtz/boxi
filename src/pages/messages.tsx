import dynamic from "next/dynamic";

const AblyChatComponent = dynamic(
  () => import("../../components/AblyChatComponent" as any),
  { ssr: false }
);

export default function Messages() {
  return (
    <>
      <h2>Messages</h2>
      <AblyChatComponent />
    </>
  );
}
