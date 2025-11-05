import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import { UserProfile } from "@/types/User.types";

export default function Edit({ open, onOpenChange,profileDetails }: { open: boolean; onOpenChange: (open: boolean) => void; profileDetails:UserProfile }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm"></Dialog.Overlay>
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-xl shadow-xl p-6 w-[80%] max-w-2xl">
        <Dialog.Close className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition">
            <X className="w-5 h-5 text-gray-600" />
          </Dialog.Close>
          <Dialog.Title className="text-2xl font-bold pb-8 text-green-900">
            Edit Profile
          </Dialog.Title>
          <EditProfileForm profileDetails ={profileDetails}/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
