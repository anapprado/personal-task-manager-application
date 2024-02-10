import { Button } from '@radix-ui/themes'

const DeleteTaskButton = ({ taskId } : { taskId: number}) => {
  return (
    <Button color = "orange">Delete Task</Button>
  )
}

export default DeleteTaskButton