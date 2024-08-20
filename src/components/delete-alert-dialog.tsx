import { useTodoContext } from "@/contexts/TodoContext";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface IDeleteAlertDialog {
  id: number,
}

export default function DeleteTodoAlertDialog({ id }: IDeleteAlertDialog) {
  const { deleteTodo } = useTodoContext();

  return (
    <AlertDialog>
      <AlertDialogTrigger 
        className="tw-flex tw-items-center tw-gap-2 tw-text-red-400"
      >
        <Trash2 className="tw-h-4 tw-w-4" />
        <span className="tw-hidden md:tw-inline">Remove</span>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="tw-w-fit tw-h-fit tw-fixed tw-z-60 tw-top-2/4 tw-left-2/4 tw--translate-x-2/4 tw--translate-y-2/4"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this to-do?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete your to-do.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-testid="delete-cancel"
          >Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTodo(id)}
            data-testid="delete-confirmation"
          >Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) 
}