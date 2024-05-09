interface ImportMetaEnv {
  VITE_API_BASE_URI: string;
}
export const API_BASE_URL: ImportMetaEnv = import.meta.env.VITE_API_BASE_URI;

export const API_ENDPOINTS: {
  LOGIN: string;
  SIGNUP: string;
  VERIFY: string;
  GET_USERNAME: string;
  GET_TASKS: string;
  GET_COMPLETED_TASK: string;
  ADD_TASKS: string;
  UPDATE_TASKS: string;
  DELETE_TASKS: string;
} = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  VERIFY: `${API_BASE_URL}/auth/verify`,
  GET_USERNAME: `${API_BASE_URL}/auth/username`,
  GET_TASKS: `${API_BASE_URL}/tasks`,
  GET_COMPLETED_TASK: `${API_BASE_URL}/tasks/completedtask`,
  ADD_TASKS: `${API_BASE_URL}/tasks/addtask`,
  UPDATE_TASKS: `${API_BASE_URL}/tasks/taskcomplete`,
  DELETE_TASKS: `${API_BASE_URL}/tasks/deletetask`,
};

export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
