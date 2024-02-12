import prisma from '@/prisma/client';
import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import { TaskStatusBadge } from './components';
import Link from 'next/link';

const LatestTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    
  });

  return (
    <Card>
      <Heading size="4" mb="5">Latest Tasks</Heading>
      <Table.Root>
        <Table.Body>
          {tasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/tasks/${task.id}`}>
                      {task.title}
                    </Link>
                    <TaskStatusBadge status={task.status} />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestTasks;