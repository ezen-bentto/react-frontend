import axios from "axios";

export interface CommunityDeletePayload {
    communityId: number;
}

export const deleteCommunity = async (payload: CommunityDeletePayload) => {
    const transformedPayload = {
        communityId: Number(payload.communityId),
    };

    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/community/delete`,
        transformedPayload
    );

    return response.data;
};