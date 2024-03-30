"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Country } from "@/interfaces/country.interface";
import { useAddressStore } from "@/store/address/address-store";
import { setUserAddress } from "@/actions/address/set-user-address";
import { deleteUserAddress } from "@/actions/address/delete-user-address";
import { Address } from "@/interfaces/address.interface";
import { useRouter } from "next/navigation";

export interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress?: boolean;
}

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address> | null;
}

export default function AddressForm({ countries, userStoreAddress = {} }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: { ...userStoreAddress, rememberAddress: false },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address, reset]);

  const onSubmit = async (data: FormInputs) => {
    console.log(data);

    const { rememberAddress, ...rest } = data;
    setAddress(rest);

    if (rememberAddress) {
      //Server action
      await setUserAddress(rest, session!.user.id);
    } else {
      //Server action
      await deleteUserAddress(session!.user.id);
    }

    router.push("/checkout");
  };
  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          {...register("firstName", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          {...register("lastName", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          {...register("address", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          {...register("address2", { required: false })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          {...register("zipCode", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          {...register("city", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          {...register("country", { required: true })}
          className="p-2 border rounded-md bg-gray-200"
        >
          <option value="">[ Seleccione ]</option>

          {countries.map((key) => {
            return (
              <option key={key.id} value={key.id}>
                {key.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          {...register("phone", { required: true })}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        {/* <!-- component --> */}
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register("rememberAddress", { required: false })}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span className="ml-2">Recordar dirección</span>
        </div>

        <button
          type="submit"
          className={clsx("btn-primary flex w-full justify-center", { "btn-disabled": !isValid })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}
