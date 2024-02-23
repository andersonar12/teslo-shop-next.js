import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const id = params.id;

  if (id === "kids") {
    return notFound();
  }
  return <div>Category Page {id}</div>;
}
