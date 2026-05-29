import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

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

  return (
    <>
      <h1 className="mt-5 mb-4 text-2xl font-bold text-center">Connections</h1>

      {loading ? (
        <p className="mt-10 text-md text-center">Loading connections...</p>
      ) : error ? (
        <p className="mt-10 text-md text-center">Something went wrong</p>
      ) : connections.length === 0 ? (
        <p className="mt-10 text-md text-center">No connections found</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {connections.map((c) => (
            <div
              key={c._id}
              className="py-4 px-6 sm:w-1/2 bg-base-300 rounded-xl border border-base-200 flex gap-8"
            >
              <div>
                <img
                  className="size-18 rounded-full"
                  src={c.photoUrl}
                  alt="user photo"
                />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {c.firstName + " " + c.lastName}
                </p>
                <p className="">{c.about}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Connections;
