import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import { toast } from "react-toastify";

const CreateProjectForm = () => {


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();

        const onSubmit = async (data) => {
          try {
            const response = await fetch(
              "http://localhost:5000/project/create-project",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
              }
            );
            if (response.ok) {
              toast.success("Project created successfully!");
            }
            if (response.status === 401) {
              toast.error("Unauthorized");
              console.log(response);
            }

          } catch (error) {
            console.error("Create project error:", error);
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
            control={control}
            validation={{
              required: "name is required"
            }}
            error={errors.name}
          />

          <Input
            label="Description (optional)"
            type="text"
            name="description"
            className={"h-24"}
            register={register}
            control={control}
            validation={{}}
            error={errors.description}
          />

          <Input
            label="Members (optional)"
            type="email"
            name="members"
            register={register}
            control={control}
            validation={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            }}
            error={errors.members}
          />

          <button
            type="submit"
            className="bg-slate-900 text-white py-2 px-4 rounded mt-4 w-full"
          >
            Create Project
          </button>
        </form>
      </div>
    );
    };

export default CreateProjectForm;