import { Platform } from "react-native";

export const apiUrl = Platform.OS === 'web' ? 'http://localhost:19006/api/v0' : 'http://10.33.110.91:8039/api/v0';

export enum AccountType {
  Student = 'Student',
  Teacher = 'Teacher',
}
