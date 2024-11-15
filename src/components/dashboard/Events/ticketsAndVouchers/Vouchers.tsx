import { VoucherTable } from "../ticketsAndVouchers/VoucherTable";
import AddVoucher from "./AddVoucher";
import { useParams } from "react-router-dom";
import { fetchAllPromoCodes } from "../../../../api/fetchAllPromoCodesApi";
import { useEffect, useState } from "react";
import SkeletonComponent from "../../../../components/Skeleton";
export type PromoCodes = {
  id: string;
  promoId: string;
  discountType: string;
  discountValue: string;
  maximumNoOfUse: string;
  uses: string;
  isExpired: boolean;
};

const Vouchers = () => {
  const { eventId } = useParams();
  const [promoCodes, setPromoCodes] = useState<PromoCodes[]>([]);
  const [eventName, setEventName] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllPromoCodes({ eventId });
      setEventName(response?.eventName);

      const transformedData = response?.coupons.map((promo: any) => ({
        id: promo._id,
        promoId: promo.promoId,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        maximumNoOfUse: promo.maximumNoOfUse,
        uses: promo.uses,
        isExpired: promo.isExpired,
      }));

      setPromoCodes(transformedData);
    } catch (error) {
      console.error("Error fetching promo codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const handleDeleteTicket = (id: string) => {
    setPromoCodes((prevCode) => prevCode.filter((code) => code.id !== id));
  };

  return (
    <div className="ml-2 sm:ml-8 sm:mr-24">
      <h1 className="text-3xl text-[#9d487b] font-medium ml-8">
        {" "}
        {loading ? <SkeletonComponent className="rounded-3xl" /> : eventName}
      </h1>
      <div className="flex justify-between items-center mr-6 sm:mr-10 mt-6">
        <h1 className="text-xl font-medium ml-8 ">Vouchers</h1>
        <AddVoucher refetch={fetchData} />
      </div>{" "}
      <VoucherTable
        promoCodes={promoCodes}
        handleDeleteTicket={handleDeleteTicket}
        refetch={fetchData}
      />
    </div>
  );
};

export default Vouchers;
