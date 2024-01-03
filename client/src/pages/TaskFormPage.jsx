import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TaskFormPage() {

  const { register, handleSubmit, formState: { errors } , setValue
  } = useForm();
  
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    if (params.id){
      await updateTask(params.id, data)
      toast('Tarea Actualizada', {
        icon: '💡',
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "var(--color-primary)",
          color: "white",
        }
      })
    }else{
      await createTask(data)
      toast.success('Tarea creada', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "var(--color-primary)",
          color: "white",
        }
      })
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
      <div className=' max-w-xl mx-auto'>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="title"
          {...register("title", {required: true})}
          className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
          
          {errors.title && <span> El Título es requerido </span>}

          <textarea className=' bg-zinc-700 p-3 rounded-lg block w-full mb-3' rows="3" placeholder="Description"
          {...register("description", {required: true})}>
          </textarea>

          {errors.description && <span> La Descripción es requerida </span>}

          <button className=' bg-indigo-400 p-3 rounded-lg block w-full mt-3' type="submit">Guardar</button>
        </form>

        {params.id && (
          <div className='flex justify-end'>
            <button className=' bg-red-500 p-3 rounded-lg w-48 mt-3'
         onClick={async () => {
          const accepted = window.confirm('Estas Seguro?')
          if (accepted) {
           await deleteTask(params.id)
           toast.error('Tarea Eliminada', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              background: "var(--color-primary)",
              color: "white",
            }
          })
            navigate('/tasks')
          }
        }}> Eliminar</button>
          </div>
        )}
      </div>
    )
  }
  
  