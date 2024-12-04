"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useTodoById } from "@/hooks/todo/use-todos";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { FormProvider, useForm } from "react-hook-form";
import { NoteCreateFormValues, NoteCreateSchema } from "./components/utils/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";

import NoteCreateHeader from "./components/note-create-header";
import NoteCreateInfo from "./components/note-create-info";
import NoteCreateForm from "./components/note-create-form";

const NoteCreatePage = () => {
  const { todoId } = useParams();
  const { todo, isLoading, isError } = useTodoById(Number(todoId));
  const { createNote } = useNoteActions();

  const form = useForm<NoteCreateFormValues>({
    resolver: zodResolver(NoteCreateSchema),
    defaultValues: {
      todoId: Number(todoId),
      title: "",
      content: "",
      linkUrl: "",
    },
    mode: "onBlur",
  });

  const handlePreSave = () => {
    // TODO 임시 저장 로직 처리
  };

  const handleUpdate = () => {
    createNote({
      todoId: form.getValues("todoId"),
      title: form.getValues("title"),
      content: form.getValues("content"),
      linkUrl: form.getValues("linkUrl"),
    });
  };

  if (!todo) return <div>할 일 데이터를 찾지 못했습니다.</div>;
  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <FormProvider {...form}>
      <div className="h-screen bg-white px-36 py-10">
        <div className="flex flex-col w-2/3 h-full">
          <div>
            <NoteCreateHeader onClickUpdateBtn={handleUpdate} onClickPreSaveBtn={handlePreSave} />
            <NoteCreateInfo todo={todo} />
            <NoteCreateForm form={form} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default NoteCreatePage;
