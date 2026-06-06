import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import Avatar from "./Avatar";
import { EmptyState, ErrorState, SkeletonList } from "./States";

function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data || []));
      } catch (err) {
        console.error(err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getConnections();
  }, [dispatch]);

  const retry = () => {
    setError(false);
    setLoading(true);
    // simplest retry: re-trigger the effect by remounting via key would be heavier, so
    // just re-fetch by toggling loading and letting the next visit re-run the effect.
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data || []));
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
          Connections
          {!loading && !error && connections.length > 0 && (
            <span className="text-sm font-medium text-fg-muted bg-surface-2 px-2 py-0.5 rounded">
              {connections.length}
            </span>
          )}
        </h1>
        <p className="text-sm text-fg-muted mt-1">
          Developers you're connected with.
        </p>
      </header>

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <ErrorState onRetry={retry} />
      ) : connections.length === 0 ? (
        <EmptyState
          title="No connections yet"
          body="Browse the feed and send your first Connect request."
          cta={{ to: "/", label: "Browse developers" }}
        />
      ) : (
        <ul className="space-y-3">
          {connections.map((c) => (
            <li key={c._id} className="card flex items-center gap-4">
              <Avatar user={c} className="size-12" />
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-fg truncate">
                  {c.firstName} {c.lastName}
                </p>
                {c.about && (
                  <p className="text-sm text-fg-muted truncate">{c.about}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Connections;
