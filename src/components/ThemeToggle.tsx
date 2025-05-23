
import { useTheme } from '@/components/theme/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, MonitorSmartphone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { mode, toggleMode, isAutoMode, setAutoMode } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-infi-blue/30">
          {mode === 'day' ? (
            <Sun className="h-5 w-5 text-infi-gold" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-infi-dark-blue/95 border border-infi-gold/20">
        <DropdownMenuItem 
          onClick={() => {
            setAutoMode(false);
            if (mode !== 'day') toggleMode();
          }}
          className={mode === 'day' && !isAutoMode ? 'bg-infi-blue/30' : ''}
        >
          <Sun className="mr-2 h-4 w-4 text-infi-gold" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            setAutoMode(false);
            if (mode !== 'night') toggleMode();
          }}
          className={mode === 'night' && !isAutoMode ? 'bg-infi-blue/30' : ''}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setAutoMode(true)}
          className={isAutoMode ? 'bg-infi-blue/30' : ''}
        >
          <MonitorSmartphone className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
