import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import { toast } from "react-toastify";

const AddCollaboratorForm = ({project}) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();

        const onSubmit = async (data) => {
          data.id = project._id;
          try {
            const response = await fetch(
              "http://localhost:5000/project/update-project",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
              }
            );
            if (response.ok) {
              toast.success("Proj!");
            }
            if (response.status === 401) {
              toast.error("Unauthorized");
              console.log(response);
            }

          } catch (error) {
            console.error("Create project error:", error);
            toast.error("Server error");
          }
        };


    return (
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input

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
            className="bg-slate-900 text-white py-2 px-4 rounded-full mt-1 w-full"
          >
            add
          </button>
        </form>
      </div>
    );
    };

export default AddCollaboratorForm;