import { MovieType } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: MovieType }) {
  const ep_no = movie.episodes?.[0]?.ep_no;
  return (
    <Link href={`/detail/${movie.id}/${ep_no}`} className="block">
      <div className="flex flex-col">
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.image ?? ''}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:-translate-y-2"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 py-10 px-2 transition-transform duration-300 translate-y-full bg-gradient-to-t from-black to-transparent group-hover:translate-y-0">
            <div className="w-full p-2">
              <p className="text-center text-white font-semibold text-sm">
                {movie.des ? (movie.des.length > 100 ? `${movie.des.substring(0, 100)}...` : movie.des) : "설명이 없습니다."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="py-1 mb-2 text-sm font-bold text-center text-white mt-1">
            {movie.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}