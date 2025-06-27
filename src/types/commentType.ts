// api ------------------------------------------------
// 댓글 등록 요청 타입
export interface CommentRegisterRequest {
    content: string;
    postId: number;
}
// 댓글 수정 요청 타입
export interface CommentModifyRequest {
    commentId: number;
    content: string;
}
// 댓글 삭제 요청 타입
export interface CommentDeleteRequest {
    commentId: number;
}

// 댓글 응답 타입
export interface CommentResponse {
    insertId?: number;
    affectedRows: number;
}

// 댓글 목록 응답(row)
export interface CommentRow {
    comment_id: number;
    post_id: number;
    user_id: number;
    nickname: string;
    content: string;
    reg_date: string;
    del_yn: string;
}

// 댓글 목록 응답(배열)
export interface CommentListResponse {
    list: CommentRow[];
}
// api ------------------------------------------------
// 댓글 form props
export interface CommentFormProps {
    onSubmit: (content: string) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}


// 댓글 항목 props
export interface CommentItemProps {
    comment: Comment;
    currentUserId?: number;
    isEditing: boolean;
    editedContent: string;
    setEditedContent: (val: string) => void;
    onEdit: () => void;
    onCancel: () => void;
    onSubmitEdit: () => void;
    onDelete: () => void;
}
// 댓글 props
export interface Comment {
    comment_id: number;
    user_id: number;
    nickname: string;
    content: string;
    reg_date: string;
    del_yn: string;
}

// 댓글 section props
export interface CommentSectionProps {
    comments: Comment[];
    currentUserId?: number;
    onEdit: (commentId: number, content: string) => void;
    onDelete: (commentId: number) => void;
    onSubmit: (content: string) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
    editingCommentId: number | null;
    editedContent: string;
    setEditedContent: (val: string) => void;
    cancelEditing: () => void;
    submitEdit: (commentId: number) => Promise<void>;
}

