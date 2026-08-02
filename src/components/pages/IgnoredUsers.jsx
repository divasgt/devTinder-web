import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addIgnoredUsers } from "../../store/slices/ignoredUsersSlice";
import Avatar from "../others/Avatar";
import { EmptyState, ErrorState, SkeletonList } from "../others/States";
import { Link, useNavigate } from "react-router";

function IgnoredUsers() {
  const ignoredUsers = (useSelector((store) => store.ignoredUsers) || []).filter(Boolean);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getIgnoredUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/ignored-users`, {
          withCredentials: true,
        });
        dispatch(addIgnoredUsers(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getIgnoredUsers();
  }, [dispatch]);

  const retry = () => {
    setError(false);
    setLoading(true);
    // simplest retry: re-trigger the effect by remounting via key would be heavier, so
    // just re-fetch by toggling loading and letting the next visit re-run the effect.
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/ignored-users`, {
          withCredentials: true,
        });
        dispatch(addIgnoredUsers(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="max-w-150 mx-auto mt-10 px-4">
      <header className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-3 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-270"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="square"
              stroke-width="2"
              d="M17.5 10.5L12 5l-5.5 5.5M12 6.25v13"
            />
          </svg>{" "}
          Back to connections
        </button>

        <h1 className="text-2xl font-bold text-fg tracking-tight flex items-center gap-2">
          Ignored Users
          {!loading && !error && ignoredUsers.length > 0 && (
            <span className="text-sm font-medium text-fg-muted bg-surface-2 px-2 py-0.5 rounded">
              {ignoredUsers.length}
            </span>
          )}
        </h1>
        <p className="text-sm text-fg-muted mt-1">Users you have ignored</p>
      </header>

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : ignoredUsers.length === 0 ? (
        <EmptyState title="No ignored users" body="" />
      ) : (
        <ul className="space-y-3">
          {ignoredUsers.map((c) => (
            <li key={c._id} className="card flex items-center gap-4">
              <Link to={`/user/${c._id}`} className="flex items-center gap-4 flex-1 min-w-0 group">
                <Avatar user={c} className="size-12 shrink-0 rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-fg truncate group-hover:underline">
                    {c.firstName} {c.lastName}
                  </p>
                  {c.about && <p className="text-sm text-fg-muted truncate">{c.about}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IgnoredUsers;
