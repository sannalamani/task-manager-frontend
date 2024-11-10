import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import Textarea from "../inputs/textArea";
import Selector from "../inputs/selector";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const CreateTaskForm = ({task}) => {

 
    const { register, handleSubmit, control, formState: { errors } } = useForm(
        { defaultValues: task }
    );
    const { projectId } = useParams();
    const navigate = useNavigate();



    const onSubmit = async (data) => {
      if (task?._id) {
        data.id = task.id;
        const response = await fetch("http://localhost:5000/task/update-task", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          toast.success("Task updated successfully!");
          navigate(`/project/${projectId}`);
        }
        if (response.status === 401) {
          toast.error("Unauthorized");
          console.log(response);
        }
      } else {
        data.projectId = projectId;
        const response = await fetch("http://localhost:5000/task/create-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          toast.success("Task created successfully!");
            navigate(`/project/${projectId}`);
        }
        if (response.status === 401) {
          toast.error("Unauthorized");
          console.log(response);
        }
      }
    };
        

    return (
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            type="text"
            name="name"
            register={register}
            value={task?.name}
            control={control}
            validation={{
              required: "name is required",
            }}
            error={errors.name}
          />

          <Textarea
            label="Description (optional)"
            type="text"
            name="description"
            className={"h-24"}
            register={register}
            value={task?.description}
            control={control}
            validation={{}}
            error={errors.description}
          />

          <Selector
            label="Status"
            name="status"
            register={register}
            control={control}
            validation={{}}
            value={task?.status}
            error={errors.status}
            options={[
              { value: "backlog", label: "Backlog" },
              { value: "to-do", label: "To Do" },
              { value: "in-progress", label: "In progress" },
              { value: "done", label: "Done" },
            ]}
            defaultOption={{ value: "backlog", label: "Backlog" }}
          />

          <Selector
            label="Assign to (optional)"
            name="assignedTo"
            register={register}
            control={control}
            validation={{}}
            value={task?.assignedTo}
            error={errors.assignedTo}
            options={[
             
            ]}
          />

          <button
            type="submit"
            className="bg-slate-900 text-white rounded-2xl px-4 py-1 ml-auto mr-8"
          >
            {task?._id ? "update" : "save"}
          </button>
        </form>
      </div>
    );
};

export default CreateTaskForm;