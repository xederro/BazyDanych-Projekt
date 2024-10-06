import { Message } from "@/components/form-message";
import { LoginPageComponent } from "@/components/login-page"

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
      <LoginPageComponent searchParams={searchParams}/>
  );
}
