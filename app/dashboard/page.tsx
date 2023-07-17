import CreateModal from "@/components/CreateModal";
import DataTable from "@/components/Table";
import { getLinkData, getUsers } from "@/server/controllers";
import { getServerSideSession } from "@/utils/auth";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await getServerSideSession();
  if (session) {
    return (
      <div>
        <div className="flex justify-end p-2">
          <CreateModal />
        </div>
        <DataTable />
      </div>
    );
  } else {
    redirect("/");
  }
}
