import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { EmptyState, ErrorState, Spinner } from "./States";

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
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : !feed || feed.length === 0 ? (
        <EmptyState
          title="No new developers right now"
          body="Check back soon — new devs join all the time."
        />
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
}

export default Feed;
