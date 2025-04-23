export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          url: string;
          category: string;
          description: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          url: string;
          category: string;
          description?: string | null;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          url?: string;
          category?: string;
          description?: string | null;
          user_id?: string;
        };
      };
    };
  };
}

export type Link = Database['public']['Tables']['links']['Row'];
export type NewLink = Database['public']['Tables']['links']['Insert'];
export type UpdateLink = Database['public']['Tables']['links']['Update'];

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}