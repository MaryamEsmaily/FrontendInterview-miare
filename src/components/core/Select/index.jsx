import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({
  value,
  onChange,
  options,
  children,
  placeholder,
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="my-list-trigger">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className="block truncate">{value?.label ?? placeholder}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="my-list-options">
            {options
              ? options.map(({ value, label }) => (
                  <Option key={value} value={{ value, label }}>
                    {label}
                  </Option>
                ))
              : children}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export const Option = ({ value, children }) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        clsx(
          "my-list-option",
          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
        )
      }
      value={value}
    >
      {({ selected }) => (
        <span
          className={`block truncate ${
            selected ? "font-medium" : "font-normal"
          }`}
        >
          {children}
        </span>
      )}
    </Listbox.Option>
  );
};
