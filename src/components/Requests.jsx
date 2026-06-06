import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import Avatar from "./Avatar";
import { EmptyState, ErrorState, SkeletonList } from "./States";

function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
          withCredentials: true,
        });
        dispatch(addRequests(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [dispatch]);

  const reviewRequest = async (status, requestId) => {
    setBusyId(requestId);
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const retry = () => {
    setError(false);
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/request/recieved`, {
          withCredentials: true,
        });
        dispatch(addRequests(res?.data?.data || []));
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
        <h1 className="text-2xl font-bold text-fg tracking-tight flex items-center gap-2">
          Connection Requests
          {!loading && !error && requests.length > 0 && (
            <span className="text-sm font-medium text-fg-muted bg-surface-2 px-2 py-0.5 rounded">
              {requests.length}
            </span>
          )}
        </h1>
        <p className="text-sm text-fg-muted mt-1">
          People who want to connect with you.
        </p>
      </header>

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : requests.length === 0 ? (
        <EmptyState
          title="No pending requests"
          body="When someone wants to connect, it'll show up here."
        />
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => {
            const user = r.fromUserId;
            const busy = busyId === r._id;
            return (
              <li key={r._id} className="card flex items-center gap-4">
                <Avatar user={user} className="size-12" />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-fg truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  {user.about && (
                    <p className="text-sm text-fg-muted truncate">
                      {user.about}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    className="btn-ghost"
                    disabled={busy}
                    onClick={() => reviewRequest("rejected", r._id)}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="btn-accent"
                    disabled={busy}
                    onClick={() => reviewRequest("accepted", r._id)}
                  >
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Requests;
