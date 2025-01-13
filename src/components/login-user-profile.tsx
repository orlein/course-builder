import { Edit2Icon, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function LoginUserProfile() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <UserCircle className="w-12 h-12" />
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Joined: January 2023</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value="johndoe123" readOnly />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value="john.doe@example.com"
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your bad dining experiences..."
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <Edit2Icon className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
