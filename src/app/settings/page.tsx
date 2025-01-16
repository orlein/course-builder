import { ThemeToggle } from '@/components/theme-toggle';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label htmlFor="notifications" className="text-sm font-medium">
          알림
        </label>
        <Switch id="notifications" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">다크 모드</span>
        <ThemeToggle />
      </div>
      <div className="space-y-2">
        <Link
          href="/terms"
          className="text-sm text-blue-600 hover:underline block"
        >
          이용약관
        </Link>
        <Link
          href="/privacy"
          className="text-sm text-blue-600 hover:underline block"
        >
          개인정보 처리방침
        </Link>
        <Link
          href="/location-terms"
          className="text-sm text-blue-600 hover:underline block"
        >
          위치기반 서비스 이용약관
        </Link>
      </div>
    </div>
  );
}
