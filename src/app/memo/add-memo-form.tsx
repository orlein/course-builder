'use client';

import { SubmitButton } from '@/components/submit-button';
import { addMemoAction } from './add-memo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

export function AddMemoForm() {
  const [state, formAction] = React.useActionState(addMemoAction, {
    success: false,
  });
  const firstRef = React.useRef<HTMLInputElement>(null);

  if (state.success) {
    firstRef.current?.focus();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>메모 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              name="title"
              autoFocus
              ref={firstRef}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="content">내용</Label>
            <Input
              id="content"
              placeholder="내용을 입력하세요"
              name="content"
            />
          </div>
          <SubmitButton>메모 추가</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
