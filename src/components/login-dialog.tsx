'use client';

import { useUser } from '@/context/user-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

export function LoginDialog({ open, onOpenChange, title }: LoginDialogProps) {
  const { users, login, switchUser } = useUser();

  const handleSelectUser = (userId: string) => {
    if (title === 'Login') {
      login(userId);
    } else {
      switchUser(userId);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Select a mock user to continue. This is for demonstration purposes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4 p-2 rounded-lg hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => handleSelectUser(user.id)}>
                Select
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
