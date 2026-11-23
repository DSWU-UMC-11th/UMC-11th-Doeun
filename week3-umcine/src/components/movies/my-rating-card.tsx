"use client";

import Link from "next/link";
import { useState } from "react";
import type { Rating } from "@/api/ratings/models";
import { useCreateRatingMutation } from "@/hooks/use-create-rating-mutation";
import { useDeleteRatingMutation } from "@/hooks/use-delete-rating-mutation";
import { useMemberId } from "@/hooks/use-member-id";
import { useMyRatingsQuery } from "@/hooks/use-my-ratings-query";
import { useUpdateRatingMutation } from "@/hooks/use-update-rating-mutation";
import { useAuthStore } from "@/stores/auth-store";

const SCORES = [1, 2, 3, 4, 5];
const COMMENT_MAX_LENGTH = 500;

interface MyRatingCardProps {
  movieId: number;
}

// 영화 상세의 "내 평점" 카드. 로그인한 회원의 평점 목록에서 이 영화의 평점을 찾음
export function MyRatingCard({ movieId }: MyRatingCardProps) {
  const memberId = useMemberId();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const myRatingsQuery = useMyRatingsQuery();
  const myRating = myRatingsQuery.data?.find((rating) => rating.movieId === movieId);

  return (
    <div className="rounded-xl border border-[#E3E6EB] bg-white p-5">
      <h2 className="mb-3 font-semibold text-[#17191E]">내 평점</h2>
      {!hasHydrated ? (
        // localStorage의 토큰을 읽기 전 (서버 렌더링 결과와 동일하게 유지)
        <div className="h-40 animate-pulse rounded-lg bg-[#F6F7F9]" />
      ) : memberId === null ? (
        <p className="text-sm text-[#606774]">
          <Link href="/login" className="font-extrabold text-[#2563EB]">
            로그인
          </Link>
          하고 평점을 남겨보세요.
        </p>
      ) : myRatingsQuery.isPending ? (
        <div className="h-40 animate-pulse rounded-lg bg-[#F6F7F9]" />
      ) : myRatingsQuery.isError ? (
        <p className="text-sm text-red-500">평점을 불러오지 못했어요.</p>
      ) : (
        <RatingForm
          // 평점이 생기거나 삭제되면 입력값을 새로 채움
          key={myRating?.ratingId ?? "new"}
          movieId={movieId}
          rating={myRating}
        />
      )}
    </div>
  );
}

interface RatingFormProps {
  movieId: number;
  rating?: Rating;
}

function RatingForm({ movieId, rating }: RatingFormProps) {
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");

  const createRatingMutation = useCreateRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();
  const isPending =
    createRatingMutation.isPending ||
    updateRatingMutation.isPending ||
    deleteRatingMutation.isPending;

  const isChanged =
    !rating || rating.score !== score || (rating.comment ?? "") !== comment.trim();
  const canSubmit = score >= 1 && isChanged;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isPending) return;

    // 평점이 없으면 등록하고, 있으면 수정함
    if (rating) {
      updateRatingMutation.mutate({
        ratingId: rating.ratingId,
        score,
        comment: comment.trim(),
      });
    } else {
      createRatingMutation.mutate({ movieId, score, comment: comment.trim() });
    }
  };

  const handleDelete = () => {
    if (!rating || isPending) return;
    if (!confirm("평점을 삭제할까요?")) return;

    deleteRatingMutation.mutate(rating.ratingId);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4 flex gap-1">
        {SCORES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            disabled={isPending}
            aria-label={`${n}점`}
            aria-pressed={score === n}
          >
            <img
              src={n <= score ? "/icons/star.svg" : "/icons/star-outline.svg"}
              alt=""
              className="h-5 w-5"
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        maxLength={COMMENT_MAX_LENGTH}
        disabled={isPending}
        placeholder="리뷰를 남겨보세요"
        className="h-24 w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-3 text-sm text-[#17191E] placeholder:text-[#9AA1AC] outline-none"
      />
      <p className="mt-1 text-right text-[11px] text-[#969DA8]">
        {comment.length}/{COMMENT_MAX_LENGTH}
      </p>
      <button
        type="submit"
        disabled={!canSubmit || isPending}
        className="mt-2 w-full rounded-lg bg-[#17191E] py-2 text-sm font-semibold text-white hover:bg-[#2b2e37] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {createRatingMutation.isPending || updateRatingMutation.isPending
          ? "저장 중"
          : rating
            ? "리뷰 수정"
            : "리뷰 저장"}
      </button>
      {rating && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="mt-2 w-full rounded-lg border border-[#E3E6EB] py-2 text-sm font-semibold text-[#17191E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {deleteRatingMutation.isPending ? "삭제 중" : "평점 삭제"}
        </button>
      )}
    </form>
  );
}
