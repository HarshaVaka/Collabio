import * as Dialog from "@radix-ui/react-dialog";
import EditProfileForm from "./EditProfileForm";

export default function Edit({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm"></Dialog.Overlay>
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-xl shadow-xl p-6 w-[80%] max-w-2xl">
          <Dialog.Title className="text-2xl font-bold pb-8 text-green-900">
            Edit Profile
          </Dialog.Title>
          <EditProfileForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
