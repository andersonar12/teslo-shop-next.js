export const revalidate = 0; //  0 seconds
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import UsersTable from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/users/get-paginated-users";
import Pagination from "@/components/ui/pagination/Pagination";

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={1} currentPage={1} />
      </div>
    </>
  );
}
