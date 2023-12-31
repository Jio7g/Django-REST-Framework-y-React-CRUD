import {useForm} from 'react-hook-form'
import {createTask, deleteTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'

export function TaskFormPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async data => {
    const res = await createTask(data)
    navigate('/tasks')
  })
  
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
  
  