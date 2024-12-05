import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { NoteCreateFormValues } from "./utils/create-validation";
import LinkEmbed from "@/components/shared/link-embed/link-embed";
import { ensureHttps } from "@/utils/url";
import NoteWriteEditor from "@/components/shared/editor/note-write-editor";

interface NoteCreateFormProps {
  form: UseFormReturn<NoteCreateFormValues>;
}

const NoteCreateForm = ({ form }: NoteCreateFormProps) => {
  return (
    <form className="">
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="제목을 입력해 주세요"
                  className="border-x-0 border-y-2 h-[50px] rounded-none border-slate-200 text-lg text-slate-800 py-7"
                  onBlur={field.onBlur}
                  // disabled={isLoading}
                  autoComplete="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LinkEmbed {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NoteWriteEditor
                  content={field.value}
                  onContentChange={(value: string) => field.onChange(value)}
                />
              </FormControl>
              {/* TODO: FormMessage 안뜸 */}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </form>
  );
};

export default NoteCreateForm;
