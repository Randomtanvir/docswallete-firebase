import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VerificationForm from "../components/VerificationForm";
import { getSingleVerificationData } from "../utils/fetcher";

const UpdatePage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!id) return;
    try {
      const getData = async () => {
        const response = await getSingleVerificationData(id);
        setData(response);
      };
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <VerificationForm isEdit={true} verifactionData={data} />
    </div>
  );
};

export default UpdatePage;
