import dynamic from "next/dynamic";
import TaskFormSkeleton from "../_components/TaskFormSkeleton";

const TaskForm = dynamic(
  () => import('@/app/tasks/_components/TaskForm'),
  { 
    ssr: false,
    loading: () => <TaskFormSkeleton />
  }
);

const NewTaskPage = () => {
  return (
    <TaskForm />
  )
}

export default NewTaskPage