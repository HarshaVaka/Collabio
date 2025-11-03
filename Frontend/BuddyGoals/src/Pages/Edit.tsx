import * as Dialog from "@radix-ui/react-dialog";
import EditProfileForm from "./EditProfileForm";

export default function Edit({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm"></Dialog.Overlay>
        <Dialog.Content>
          <Dialog.Title>Edit Profile Form</Dialog.Title>
          <Dialog.Description>
            <EditProfileForm />
          </Dialog.Description>
          <Dialog.Close asChild>
            <button>close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
