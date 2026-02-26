import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#10B981', // Softer, muted green
      light: '#6EE7B7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Soft light gray
      paper: '#ffffff', // Pure white
    },
    text: {
      primary: '#1f2937', // Dark gray instead of pure black
      secondary: '#9ca3af', // Soft neutral gray
    },
    divider: '#e5e7eb',
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    body1: {
      fontSize: '1rem',
      color: '#1f2937',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#9ca3af',
    },
  },
  shape: {
    borderRadius: 12, // Consistent rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
          },
        },
        contained: {
          backgroundColor: '#10B981',
          '&:hover': {
            backgroundColor: '#059669',
          },
        },
        outlined: {
          borderColor: '#e5e7eb',
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #e5e7eb',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#e5e7eb',
            },
            '&:hover fieldset': {
              borderColor: '#d1d5db',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#10B981',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1f2937',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid #e5e7eb',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22C55E', // Vivid, modern green (slightly neon)
      light: '#4ADE80',
      dark: '#16A34A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f1419', // Deep charcoal/near-black
      paper: '#1a2332', // Slightly lighter dark gray
    },
    text: {
      primary: '#ffffff', // Bright for high contrast
      secondary: '#a0aab8', // Muted gray
    },
    divider: '#2d3d4d',
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#22C55E',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#a0aab8',
    },
  },
  shape: {
    borderRadius: 12, // Consistent rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
          },
        },
        contained: {
          backgroundColor: '#22C55E',
          '&:hover': {
            backgroundColor: '#16A34A',
          },
        },
        outlined: {
          borderColor: '#2d3d4d',
          '&:hover': {
            backgroundColor: '#232d3d',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #2d3d4d',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#1a2332',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.1)',
            borderColor: '#3d4d5d',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #2d3d4d',
          backgroundColor: '#1a2332',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#0f1419',
            '& fieldset': {
              borderColor: '#2d3d4d',
            },
            '&:hover fieldset': {
              borderColor: '#3d4d5d',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22C55E',
              borderWidth: 2,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a2332',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid #2d3d4d',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a2332',
          borderRight: '1px solid #2d3d4d',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
export default lightTheme; 