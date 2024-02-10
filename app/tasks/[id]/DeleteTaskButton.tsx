'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteTaskButton = ({ taskId } : { taskId: number}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
    <Button color = "orange">Delete Task</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    <AlertDialog.Description>
      Are you sure you want to delete? This action cannot be undone.
    </AlertDialog.Description>
  </AlertDialog.Content>
  </AlertDialog.Root>
  );
};

export default DeleteTaskButton