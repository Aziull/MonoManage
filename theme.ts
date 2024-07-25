import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const CustomLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7e47ff', // Основний колір акценту
      background: '#f7f7f7', // Колір фону
      card: '#ffffff', // Колір карток (наприклад, заголовки)
      text: '#333333', // Колір тексту
      border: '#cccccc', // Колір меж
      notification: '#ff4444', // Колір для сповіщень
    },
  };
  
 export const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#7e47ff', // Основний колір акценту
      background: '#121212', // Колір фону
      card: '#1f1f1f', // Колір карток (наприклад, заголовки)
      text: '#ffffff', // Колір тексту
      border: '#272727', // Колір меж
      notification: '#ff4444', // Колір для сповіщень
    },
  };