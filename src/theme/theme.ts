export const theme = {
  colors: {
    primary: '#eb5757',
    background: '#191932',
    surface: '#F1EFF0',
    text: {
      primary: '#252525',
      secondary: '#d5d5d5',
      light: '#d5d5d5'
    },
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F'
  },
  typography: {
    h1: {
      fontSize: 48,
      fontWeight: '700' as const,
      lineHeight: 56
    },
    h2: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28
    },
    body: {
      fontSize: 16,
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      lineHeight: 20
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    }
  }
}; 