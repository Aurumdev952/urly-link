import CreateModal from "@/components/CreateModal";
import DataTable from "@/components/Table";
import { getLinkData, getUsers } from "@/server/controllers";
export default async function Home() {

  return (
    <div>
      <div className="flex justify-end p-2">
        <CreateModal />
      </div>
      <DataTable />
    </div>
  );
}
