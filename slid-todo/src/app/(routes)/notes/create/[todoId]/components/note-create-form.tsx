import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { NoteCreateFormValues } from "./utils/create-validation";
import LinkEmbed from "@/components/shared/link-embed/link-embed";
import NoteWriteEditor from "@/components/shared/editor/note-write-editor";
import { Separator } from "@/components/ui/separator";
interface NoteCreateFormProps {
  form: UseFormReturn<NoteCreateFormValues>;
}

const NoteCreateForm = ({ form }: NoteCreateFormProps) => {
  return (
    <form>
      <div>
        <Separator />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="제목을 입력해 주세요"
                    className="p-0 border-none text-lg focus:outline-none text-slate-800 bg-transparent dark:border-none dark:bg-transparent dark:text-slate-200"
                    onBlur={field.onBlur}
                    // disabled={isLoading}
                    autoComplete="text"
                  />
                </FormControl>
              </FormItem>
              <Separator />
              <FormMessage className="py-2" />
            </>
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
