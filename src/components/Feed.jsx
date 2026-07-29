import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { EmptyState, ErrorState, UserCardSkeleton } from "./States";
import { useLocation, useNavigate } from "react-router";
import FeedFilters from "./FeedFilters";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noMoreFeed, setNoMoreFeed] = useState(false);
  const location = useLocation();
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    specialization: "",
    minExp: "",
    maxExp: "",
    city: "",
    country: "",
    status: "",
    skills: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFeed = async (currentFilters = filters) => {
    try {
      // cleaning up empty params before converting to query string
      const cleanFilters = {};
      Object.entries(currentFilters).forEach(([key, val]) => {
        // only keep params which have actual values
        if (val !== "" && val !== null && val !== undefined) {
          cleanFilters[key] = val;
        }
      });

      let queries = "";
      if (Object.keys(cleanFilters).length > 0) {
        queries = new URLSearchParams(cleanFilters).toString();
      }

      const res = await axios.get(`${BASE_URL}/feed?limit=10${queries ? "&" + queries : ""}`, {
        withCredentials: true,
      });

      const newFeed = res?.data?.data || [];
      if (newFeed.length === 0) {
        setNoMoreFeed(true);
        setLoading(false);
        return;
      }

      dispatch(addFeed(newFeed));
    } catch (err) {
      console.error(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFilters = (newFiltersOrUpdater) => {
    setFilters((prevFilters) => {
      const nextFilters =
        typeof newFiltersOrUpdater === "function"
          ? newFiltersOrUpdater(prevFilters)
          : newFiltersOrUpdater;

      const cleanFilters = {};
      Object.entries(nextFilters).forEach(([key, val]) => {
        if (val !== "" && val !== null && val !== undefined) {
          cleanFilters[key] = val;
        }
      });

      const queries = new URLSearchParams(cleanFilters).toString();

      // Update the URL asynchronously to prevent setState conflicts
      setTimeout(() => {
        navigate(`?${queries}`);
      }, 0);

      return nextFilters;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsInArray = params.entries();
    const obj = Object.fromEntries(paramsInArray);

    // using setTimeout, bypasses the synchronous setting of setstate functions, otherwise they may cause some issues
    const timer = setTimeout(() => {
      const nextFilters = {
        minAge: "",
        maxAge: "",
        specialization: "",
        minExp: "",
        maxExp: "",
        city: "",
        country: "",
        status: "",
        skills: "",
        ...obj,
      };

      setFilters(nextFilters);
      setNoMoreFeed(false);
      setLoading(true);
      getFeed(obj);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.search]);

  const retry = () => {
    setError(false);
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const paramsInArray = params.entries();
    const obj = Object.fromEntries(paramsInArray);
    getFeed(obj);
  };

  useEffect(() => {
    if (feed && feed.length === 0 && !noMoreFeed) {
      const timer = setTimeout(() => {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const paramsInArray = params.entries();
        const obj = Object.fromEntries(paramsInArray);
        getFeed(obj);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [feed, noMoreFeed, location.search]);

  return (
    <div className="relative px-4 pt-10 mt-4">
      <FeedFilters filters={filters} setFilters={handleUpdateFilters} />

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
        <div className="">
          {feed[2] && (
            <div
              key={feed[2]._id}
              aria-hidden="true"
              className="absolute inset-x-0 top-3 origin-top scale-[0.92] opacity-30 pointer-events-none z-0"
            >
              <UserCard user={feed[2]} showActions={false} animate={false} />
            </div>
          )}
          {feed[1] && (
            <div
              key={feed[1]._id}
              aria-hidden="true"
              className="absolute inset-x-0 top-5 origin-top scale-[0.96] opacity-60 pointer-events-none z-10"
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
