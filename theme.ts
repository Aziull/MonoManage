import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

interface ExtendedTheme extends Theme {
  fonts: {
    regular: string;
    bold: string;
    sizes: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
  };
  spacing: {
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  shadows: {
    light: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    medium: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    heavy: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

export const colors = {
  purple: {
    50: '#F5F2FF',
    100: '#ECE8FF',
    200: '#DBD4FF',
    300: '#C2B1FF',
    400: '#A385FF',
    500: '#7E47FF',
    600: '#7830F7',
    700: '#6A1EE3',
    800: '#5818BF',
    900: '#49169C',
    950: '#2C0B6A',
  },
  green: {
    50: '#F3FAF3',
    100: '#E3F5E3',
    200: '#C8EAC9',
    300: '#9DD89E',
    400: '#6BBD6E',
    500: '#46A149',
    600: '#358438',
    700: '#2D682F',
    800: '#275429',
    900: '#224524',
    950: '#0E2510',
  },
};


export const CustomLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#7E47FF',
    background: '#F5F2FF',
    card: '#ECE8FF',
    text: '#49169C',
    border: '#DBD4FF',
    notification: '#A385FF',
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    sizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
  },
  shadows: {
    light: {
      shadowColor: '#C2B1FF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    medium: {
      shadowColor: '#A385FF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    heavy: {
      shadowColor: '#7E47FF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
    },
  },
};
export const CustomDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    primary: colors.purple[500],
    background: colors.purple[900], // Темний фон
    card: colors.purple[800], // Темний фон для карток
    text: colors.purple[50], // Світлий текст
    border: colors.purple[700], // Темний колір бордюру
    notification: colors.purple[400], // Той самий колір сповіщень
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    sizes: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
    },
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
  },
  shadows: {
    light: {
      shadowColor: colors.purple[600],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    medium: {
      shadowColor: colors.purple[700],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    heavy: {
      shadowColor: colors.purple[800],
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
    },
  },
};