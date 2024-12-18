"use client"

import { AnnouncementType } from "@/models/announcement";
import "./scrollbox.css";


const Announcement = ({ announcements }: { announcements: AnnouncementType[] }) => {
  return (
    <div className="bg-[#FFBB00] py-4 overflow-hidden rounded mt-0 xl:mt-[40px] mx-1">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-scroll">
          <div className="inline-flex">
            {announcements.map((item, index) => (
              <span key={index} className="px-12 text-white">{item.announcement}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;