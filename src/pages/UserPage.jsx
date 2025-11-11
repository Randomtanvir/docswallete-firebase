import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleVerificationDataByURLLINK } from "../utils/fetcher";
import DigitalAttestationResult from "../components/DigitalAttestationResult";

export default function UserPage() {
  const location = useLocation();
  const [id, setId] = useState(null);

  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      const data = await getSingleVerificationDataByURLLINK(id);
      setVerificationData(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const hash = location.hash; // e.g., "#/page/preview/abc123"

    if (hash.startsWith("#/page/preview/")) {
      setId(hash.replace("#/page/preview/", ""));
    }
    // setData(generate(id));
  }, [location, id]);

  if (loading || !id)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  if (!verificationData)
    return (
      <div className="flex items-center justify-center text-2xl text-white bg-red-600 p-3">
        {" "}
        403 - Forbidden: Access is denied.
      </div>
    );

  return <DigitalAttestationResult verificationData={verificationData} />;
}
