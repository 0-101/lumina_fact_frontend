'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LogIn, LogOut, User, UserCog, Trophy, Flame, Badge as BadgeIconLucide, ShieldCheck, Swords, Crown, UserCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LoginDialog } from './login-dialog';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Verification' },
  { href: '/trending', label: 'Trending' },
  { href: '/community', label: 'Community' },
  { href: '/quizzes', label: 'Quizzes' },
  { href: '/profile', label: 'Profile' },
];

const badgeIcons: { [key: string]: LucideIcon } = {
  ShieldCheck,
  Swords,
  Crown,
  BadgeIcon: BadgeIconLucide,
};

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, users } = useUser();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSwitchUserOpen, setSwitchUserOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-8 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold text-lg font-headline">Lumina Fact</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-4">
            {user ? (
              <>
                {/* User Stats */}
                <div className="hidden md:flex items-center gap-3 text-sm">
                  {/* Points */}
                  <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">{user.points}</span>
                  </div>
                  
                  {/* Streak */}
                  <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/20 px-3 py-1.5 rounded-full">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-orange-600 dark:text-orange-400">{user.streak}</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center gap-1">
                    {user.badges.slice(0, 2).map((badge, index) => {
                      const Icon = badgeIcons[badge.icon];
                      return Icon ? (
                        <span key={badge.name} title={badge.name} className="flex items-center">
                          <Icon className={`h-4 w-4 ${badge.color}`} />
                        </span>
                      ) : null;
                    })}
                    {user.badges.length > 2 && (
                      <Badge variant="secondary" className="h-6 px-2 text-xs">
                        +{user.badges.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">{user.points} points</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span className="text-muted-foreground">{user.streak} streak</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {user.badges.map((badge) => {
                          const Icon = badgeIcons[badge.icon];
                          return Icon ? (
                            <span key={badge.name} title={badge.name} className="flex items-center">
                              <Icon className={`h-3 w-3 ${badge.color}`} />
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSwitchUserOpen(true)}>
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Switch User</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => setLoginDialogOpen(true)}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen} title="Login" />
      <LoginDialog open={isSwitchUserOpen} onOpenChange={setSwitchUserOpen} title="Switch User" />
    </>
  );
}
