export interface Review {
    id: string;
    user: {
        name: string;
        avatar_url: string;
    };
    rating: number;
    comment: string;
    created_at: string;
    parent_comment_id: string | null;
    is_me: boolean;
    replies?: Review[];
}