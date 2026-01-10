import React from "react";
import ShowAdminDetail from "../Usersdetail/Showadmindetail";
import Newlattersubsciber from "./Newlattersubscriber";


function DashboardCompo() {
    return (
        <div className="p-4 ">
            {/* Card Overview */}
            <div className="flex sm:flex-rows justify-center space-x-5">
                <div className="content-center bg-gray-100  h-[100px] text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Languages</div>

                </div>
                <div className="content-center h-[100px] bg-gray-100 text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Striver's SDE DSA Sheet</div>

                </div>
                <div className="content-center h-[100px] bg-gray-100 text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Technical Blogs</div>

                </div>

            </div>
            <div className="flex justify-between space-x-6  mt-8">
                <div className="content-center h-[100px] bg-gray-100 text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Projects</div>

                </div>
                <div className="content-center h-[100px] bg-gray-100 text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Messages</div>

                </div>
                <div className="content-center h-[100px] bg-gray-100 text-black shadow-md rounded-lg p-4 border-t w-1/3">
                    <div className="text-xl font-semibold">Subscribers</div>

                </div>

            </div>


            <div className="flex space-x-5">
                <div className="bg-white w-3/5 shadow rounded border-t mt-10 ">
                    <ShowAdminDetail />

                </div>

                <div className="bg-white w-2/5 shadow rounded border-t mt-10 ">
                    <Newlattersubsciber />
                </div>
            </div>
        </div>
    );
}

export default DashboardCompo;
