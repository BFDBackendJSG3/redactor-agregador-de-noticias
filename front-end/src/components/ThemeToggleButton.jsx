// import { useTheme } from '../hooks/useTheme';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { Button } from './ui/button';
// import { Sun, Moon } from 'lucide-react';

// function ThemeToggleButton() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//           <span className="sr-only">Tema</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="bg-background">
//         <DropdownMenuItem onClick={() => setTheme('light')}>
//           Claro
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('dark')}>
//           Escuro
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('system')}>
//           Sistema
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default ThemeToggleButton;
