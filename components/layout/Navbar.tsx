'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Activity, Info, MessageCircle, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const navigation = [
  { 
    name: 'Home', 
    href: '/', 
    icon: Home,
    description: 'Return to homepage'
  },
  { 
    name: 'Predict', 
    href: '/predict', 
    icon: Activity,
    description: 'Get stroke risk prediction'
  },
  { 
    name: 'About', 
    href: '/about', 
    icon: Info,
    description: 'Learn more about us'
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    icon: MessageCircle,
    description: 'Get in touch'
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="relative flex items-center">
            <Activity className="h-6 w-6 text-primary stroke-[2.5px]" />
            <span className="ml-2 text-xl font-bold text-primary">
              StrokeGuard
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 space-x-2",
                  "rounded-full transition-all duration-300",
                  "hover:bg-secondary",
                  isActive ? "bg-secondary text-primary font-medium" : "text-muted-foreground"
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  isActive && "text-primary"
                )} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 py-2",
                        isActive && "text-primary font-medium"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}