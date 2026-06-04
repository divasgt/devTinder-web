import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;

      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res?.data?.data));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="mt-10 text-md text-center">Loading feed...</p>
      ) : error ? (
        <p className="mt-10 text-md text-center">Something went wrong</p>
      ) : feed.length === 0 ? (
        <p className="mt-10 text-md text-center">No new users found</p>
      ) : (
        <UserCard user={feed[0]} className="mt-10 mx-auto" />
      )}
    </div>
  );
}

export default Feed;
