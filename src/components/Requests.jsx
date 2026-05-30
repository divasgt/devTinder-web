import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="mt-5 mb-4 text-2xl font-bold text-center">
        Connection Requests
      </h1>

      {loading ? (
        <p className="mt-10 text-md text-center">Loading requests...</p>
      ) : error ? (
        <p className="mt-10 text-md text-center">Something went wrong</p>
      ) : requests.length === 0 ? (
        <p className="mt-10 text-md text-center">No pending requests</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {requests.map((r) => {
            const user = r.fromUserId;

            return (
              <div
                key={user._id}
                className="py-4 px-6 sm:w-1/2 bg-base-300 rounded-xl border border-base-200 flex gap-8"
              >
                <div>
                  <img
                    className="size-18 rounded-full"
                    src={user.photoUrl}
                    alt="user photo"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <p className="">{user.about}</p>
                </div>

                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", r._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", r._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Requests;
