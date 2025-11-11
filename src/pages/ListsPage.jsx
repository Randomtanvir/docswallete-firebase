import { useEffect, useState } from "react";
import { getPaginatedVerificationData } from "../utils/fetcher";
import VerificationCard from "../components/VerificationCard";
import { Link } from "react-router-dom";

const ListsPage = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (loadMore = false) => {
    try {
      if (loadMore) setLoadingMore(true);
      else setLoading(true);

      const { data, lastVisible } = await getPaginatedVerificationData(
        6,
        loadMore ? lastDoc : null
      );

      if (data.length === 0) {
        setHasMore(false);
      }

      setVerificationData((prev) => (loadMore ? [...prev, ...data] : data));
      setLastDoc(lastVisible);
    } catch (error) {
      console.error("Error fetching verification data:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Link
        className="text-lg flex mb-4 items-center justify-center bg-green-400 text-white px-3 py-2 rounded-sm "
        to="/dashboard"
      >
        Home
      </Link>
      {verificationData.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {verificationData.map((veri, index) => (
              <VerificationCard
                index={index}
                key={veri.id}
                VerificationData={veri}
              />
            ))}
          </div>

          {hasMore ? (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchData(true)}
                disabled={loadingMore}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          ) : (
            <p className="text-center mt-6 text-gray-500">
              🚀 All records loaded.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No records found.</p>
      )}
    </div>
  );
};

export default ListsPage;
