import { PropsWithChildren } from 'react';

export function CoursesPageHeader(props: PropsWithChildren) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">코스 설정</h1>
      {props.children}
    </div>
  );
}
