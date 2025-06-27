import { useState, useEffect } from "react";
import { fetchCommunityDetail } from "@/api/community/content";
import { fetchCommentList } from "@/api/comment/list";
import type { CommunityDetail } from "@/types/communityContentType";
import type { CommentRow } from "@/types/commentType";

export const useCommunityData = (communityId: string | undefined) => {
    const [community, setCommunity] = useState<CommunityDetail | null>(null);
    const [comments, setComments] = useState<CommentRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCommunity = async () => {
        try {
            if (!communityId) throw new Error("커뮤니티 ID가 없습니다.");
            const data = await fetchCommunityDetail(Number(communityId));
            setCommunity(data);
        } catch (err) {
            console.error("커뮤니티 상세 조회 실패:", err);
            setError("커뮤니티 정보를 불러오는데 실패했습니다.");
        }
    };

    const loadComments = async () => {
        try {
            if (!communityId) return;
            const res = await fetchCommentList(Number(communityId));
            setComments(res.list);
        } catch (err) {
            console.error("댓글 목록 조회 실패:", err);
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            setIsLoading(true);
            setError(null);
            await loadCommunity();
            await loadComments();
            setIsLoading(false);
        };

        if (communityId) {
            loadAll();
        }
    }, [communityId]);

    return {
        community,
        comments,
        isLoading,
        error,
        reloadComments: loadComments,
        reloadCommunity: loadCommunity,
    };
};
