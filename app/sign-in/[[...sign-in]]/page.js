import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="mx-auto max-w-[100%] flex justify-center mt-44">
      <SignIn />
    </div>
  );
}
