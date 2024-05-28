import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useState } from "react";

export default function DialogBox(props) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function runFunction() {
    props.function();
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={open} className="bg-customRed text-white font-semibold px-3 py-1 rounded-sm">
        Slet
      </Button>

      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white drop-shadow-lg p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium ">
                    Bekræft handling
                  </DialogTitle>
                  <p className="mt-2 text-sm/6">Bekræft venligst din handling for at fortsætte.</p>
                  <div className="flex gap-5 mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={runFunction}
                    >
                      Bekræft
                    </Button>
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-customRed py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-900 data-[open]:bg-gray-800 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Afbryd
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
