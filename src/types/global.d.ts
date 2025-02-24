
export { };

declare global {
  interface User {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  }

  type UsersSearchResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
  }

  type SearchFormInputs = {
    search: string;
  }

  interface Alert {
    message: string;
    severity: 'success' | 'error';
  }
}
