"use client";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface CircleProps {
  className?: string;
  progress: number; // 진행률 (0~100)
}

const Circle = ({ className, progress }: CircleProps) => {
  const radius = 67;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // 애니메이션 트리거: progress 변경 시 업데이트
    const newOffset = circumference - (circumference * progress) / 100;
    setOffset(newOffset);
  }, [progress]);

  return (
    <svg
      className={cn(className)}
      width="166"
      height="166"
      viewBox="0 0 166 166" // SVG 크기 유지
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 원 */}
      <circle cx="83" cy="83" r={radius} stroke="#F8FAFC" strokeWidth="32" fill="none" />
      {/* 진행 상태 원 */}
      <circle
        cx="83"
        cy="83"
        r={radius}
        stroke="#333333"
        strokeWidth="32"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 83 83)" // 12시 방향에서 시작
        className="transition-all duration-1000 circle-progress delay-1000" // 부드러운 애니메이션 적용
      />
    </svg>
  );
};

export default Circle;
