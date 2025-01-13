import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogInIcon, UserCircle, UserPlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function LogoutUser() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <UserCircle className="w-12 h-12 text-muted-foreground" />
            <div>
              <CardTitle>Welcome to Bad Bobjibs</CardTitle>
              <CardDescription>
                Log in or sign up to access your profile
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Join our community of food critics and share your worst dining
            experiences!
          </p>
          <ul className="list-disc list-inside text-sm">
            <li>Rate and review bad restaurants</li>
            <li>Save your least favorite places</li>
            <li>Connect with fellow food adventurers</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="/login">
              <LogInIcon className="w-4 h-4 mr-2" />
              Log In
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/signup">
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
