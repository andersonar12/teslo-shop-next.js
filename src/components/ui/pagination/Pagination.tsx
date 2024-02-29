"use client";
import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageUrl = Number(searchParams.get("page")) || 1;

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-10 mb-20">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {/* Previous page */}
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPageUrl - 1)}
              aria-disabled="true"
            >
              <IoChevronBack size={30} />
            </Link>
          </li>

          {
            // Pages pagination
            allPages.map((page, index) => (
              <li key={index} className={"page-item"}>
                <Link
                  href={createPageUrl(page)}
                  className={clsx(
                    "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                    {
                      "bg-transparent text-gray-800": page !== currentPage,
                      "bg-blue-600 text-white shadow": page === currentPage,
                    }
                  )}
                >
                  {page}
                </Link>
              </li>
            ))
          }

          {/* Next page */}
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPageUrl + 1)}
            >
              <IoChevronForward size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
