import { useRecentTodos } from "@/hooks/todo/use-todos";
import TodoItem from "@/components/shared/todo-list/todo-item";
import EmptyState from "@/components/shared/empty-state";

const RecentContainer = () => {
  const { data, error, isError } = useRecentTodos();

  // 에러 상태 처리
  if (isError && error instanceof Error) {
    return (
      <div className="text-red-500 dark:text-red-400 flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  // 데이터 렌더링
  return (
    <div className="w-full h-full space-y-2 bg-background text-foreground dark:black rounded-xl">
      {data?.todos && data.todos.length > 0 ? (
        data.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <EmptyState message="최근에 등록한 할 일이 없어요" />
      )}
    </div>
  );
};

export default RecentContainer;
