import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { EmptyState, ErrorState, UserCardSkeleton } from "./States";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [dispatch]);

  const retry = () => {
    setError(false);
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="px-4">
      {loading ? (
        <UserCardSkeleton />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : !feed || feed.length === 0 ? (
        <EmptyState
          title="No new developers right now"
          body="Check back soon — new devs join all the time."
        />
      ) : (
        // pt-10 reserves room above the active card for the deeper stack
        // cards to peek; the deeper cards are absolutely positioned and
        // pointer-events-none so only the top card is interactive.
        <div className="relative pt-10">
          {feed[2] && (
            <div
              key={feed[2]._id}
              aria-hidden="true"
              className="absolute inset-x-0 -top-8 origin-top scale-[0.92] opacity-30 pointer-events-none z-0"
            >
              <UserCard user={feed[2]} showActions={false} animate={false} />
            </div>
          )}
          {feed[1] && (
            <div
              key={feed[1]._id}
              aria-hidden="true"
              className="absolute inset-x-0 -top-4 origin-top scale-[0.96] opacity-60 pointer-events-none z-10"
            >
              <UserCard user={feed[1]} showActions={false} animate={false} />
            </div>
          )}
          <div key={feed[0]._id} className="relative z-20">
            <UserCard user={feed[0]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
