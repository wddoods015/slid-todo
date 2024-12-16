"use client";
import Ellipse from "@/public/svgs/ellipse";
import Progress from "@/public/svgs/progress";
import CircleProgress from "./circleProgress";
import { useProgress } from "@/hooks/goals/use-dashboard-goals";

const MyProgress = () => {
  const { data } = useProgress();

  return (
    <div className="bg-blue-600 dark:bg-blue-800 w-full h-[250px] rounded-2xl flex-1 relative">
      <Ellipse className="absolute left-[30%] bottom-0 w-[80%] h-[80%]" />

      <div className="relative z-10 p-6">
        <Progress className="w-10 h-10" />
        <div className="w-full flex justify-between ">
          <div className="w-[50%] flex flex-col gap-2">
            <span className="text-white text-lg font-semibold mt-4">내 진행 상황</span>
            <h1 className="text-white text-4xl flex items-center">
              <>
                <span className="text-white">{data || 0}</span>
                <span className="text-base flex items-center h-full ml-1">%</span>
              </>
            </h1>
          </div>
          <div className="flex-1 flex justify-end">
            <CircleProgress data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
