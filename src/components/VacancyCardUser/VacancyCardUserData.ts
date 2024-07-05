import AddPlusCircle from "@/assets/svgs/AddPlusCircle.svg";
TrashEmpty;
import TrashEmpty from "@/assets/svgs/TrashEmpty.svg";
import NoteEdit from "@/assets/svgs/NoteEdit.svg";
import FolderAdd from "@/assets/svgs/FolderAdd.svg";

export const optionsDropDownActive = [
  { name: "Edit", beforeIcon: NoteEdit },
  { name: "Withdraw", beforeIcon: FolderAdd },
];

export const optionsDropDownArchived = [
  { name: "Publish", beforeIcon: AddPlusCircle },
  { name: "Delete", beforeIcon: TrashEmpty },
];
