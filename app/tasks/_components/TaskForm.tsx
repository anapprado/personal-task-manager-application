'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { taskSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';


type taskFormData = z.infer<typeof taskSchema>;

const TaskForm = ({ task }: { task?: Task }) => {

  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<taskFormData>({
    resolver: zodResolver(taskSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (task)
        await axios.patch('/api/tasks/' + task.id, data);
      else
        await axios.post('/api/tasks', data);
      router.push('/tasks');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
    
  });
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form 
        className='space-y-3' 
        onSubmit={onSubmit}>
          <TextField.Root>
              <TextField.Input defaultValue={task?.title} placeholder='Title' {...register('title')} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            defaultValue={task?.description} 
            render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Controller
            name="dueDate"
            control={control}
            defaultValue={task?.dueDate} 
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                placeholderText="Due Date"
              />
            )}
          />
          <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>
          <div className='flex justify-center'>
            <Button disabled={isSubmitting}>
            {task ? 'Update Task' : 'Create New Task'}{' '}
            {isSubmitting && <Spinner />}
            </Button>
          </div>
      </form>
    </div>
  )
}

export default TaskForm