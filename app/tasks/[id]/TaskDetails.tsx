import { TaskStatusBadge } from '@/app/components'
import { Task } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex className="space-x-12" my="3">
          <TaskStatusBadge status={task.status} />
          <Text>Created on: {task.createdAt.toDateString()}</Text>
          <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text> {       }
          <Text>Due date: {task.dueDate.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
          <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </>
  )
}

export default TaskDetails