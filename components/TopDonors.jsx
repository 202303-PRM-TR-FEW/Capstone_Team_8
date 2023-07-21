import React, { useEffect, useState, useMemo } from "react";
import { fetchDocByUserId } from "@/firebase/firebase";
import Image from "next/legacy/image";

function TopDonors({ data }) {
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredData = useMemo(() => {
    const allDonations = data.flatMap((project) => project.donations);
    const donorTotals = {};
    allDonations.forEach((donation) => {
      const { user, donation: amount } = donation;
      const userId = user.uid;
      if (donorTotals[userId]) {
        donorTotals[userId] += amount;
      } else {
        donorTotals[userId] = amount;
      }
    });
    const donorList = Object.entries(donorTotals).map(
      ([uid, totalDonation]) => {
        const donorInfo = allDonations.find(
          (donation) => donation.user.uid === uid
        ).user;
        return {
          uid,
          totalDonation,
        };
      }
    );
    donorList.sort((a, b) => b.totalDonation - a.totalDonation);
    return donorList;
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topDonators = filteredData.slice(0, 3);
        const promises = topDonators.map(async (item) => {
          const userData = await fetchDocByUserId(item.uid);
          return {
            ...userData[0],
            totalDonation: item.totalDonation,
          };
        });
        const userData = await Promise.all(promises);
        setDonators(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filteredData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col'>
      {donators.map((donator, index) => (
        <div
          className='flex gap-10 py-5 justify-start items-center'
          key={donator.uid}
        >
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='40px'
              viewBox='0 0 576 512'
              fill={
                index === 0 ? "#ffd700" : index === 1 ? "#a7adba" : "#ce7e00"
              }
            >
              <path d='M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z' />
            </svg>
          </div>
          <div>
            <Image
              width={40}
              height={40}
              className='rounded'
              alt='user image'
              src={donator.photoURL}
            />
          </div>
          <div>
            <p> {donator.displayName}</p>
            <p>{donator.totalDonation} $</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopDonors;
