import { getUrl } from "@/server/controllers";
import { redirect } from "next/navigation";


export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const { uid } = params;
  const data = await getUrl(uid);
  if (data.length > 0) {
    redirect(data[0].url);
  } else {
    redirect("/");
  }
}
