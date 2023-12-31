import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'

export function TaskFormPage() {

  const { register, handleSubmit, formState: { errors } , setValue
  } = useForm();
  
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    if (params.id){
      await updateTask(params.id, data)
    }else{
      await createTask(data)
    }
    navigate('/tasks')
  })
  
useEffect(() => { 
    async function loadTask(){
      if (params.id){
        const res = await getTask(params.id)
        setValue('title', res.data.title)
        setValue('description', res.data.description)
      }
    }
    loadTask()
} ,[])

  return (
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="title"
          {...register("title", {required: true})} />
          
          {errors.title && <span> El Título es requerido </span>}

          <textarea rows="3" placeholder="Description"
          {...register("description", {required: true})}>
          </textarea>

          {errors.description && <span> La Descripción es requerida </span>}

          <button type="submit">Guardar</button>
        </form>

        {params.id && <button onClick={async () => {
          const accepted = window.confirm('Estas Seguro?')
          if (accepted) {
           await deleteTask(params.id)
            navigate('/tasks')
          }
        }}> Delete</button>}
      </div>
    )
  }
  
  