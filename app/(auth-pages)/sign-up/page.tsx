import { Message } from "@/components/form-message";
import {RegisterPageComponent} from "@/components/register-page";


export default function Signup({ searchParams }: { searchParams: Message }) {
  return (
    <RegisterPageComponent searchParams={searchParams}/>
  );
}
