import { redirect } from "next/navigation";

export default function Home() {
    const today = new Date();
    const day = today.getDate().toString();
    const date = today.toLocaleDateString("en-CA");
    redirect(`/app-logger?pageNumber=1&pageSize=100&logDay=${day}&startDateTime=${date}&orderDescending=true`);
}
