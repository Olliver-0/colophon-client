import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { Button } from '@/components/forms/Button/Button';
import illuminatedBookshelves from '../../assets/images/illuminated-bookshelves.png';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa';

export const HomePage = () => {
  return (
    <MainLayout>
      <section className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-20 gap-12">
        <div className="space-y-8">
          <h1 className="text-5xl text-detail font-bold leading-tight">
            Organize your personal <span className="text-primary">library</span>
          </h1>

          <p className="text-xl text-detail">
            Discover, organize and share your literary journey with Colophon.
            Keep track of the books you have read, are reading, and want to
            read.
          </p>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4">
            <Button className="bg-primary w-full sm:w-max rounded-xl px-8 text-white hover:bg-terracotta/90 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Start Now
            </Button>
            <Button className="w-full sm:w-max rounded-xl border-2 hover:bg-highlight border-highlight text-highlight hover:text-white px-8 transition-all duration-200">
              Explore
            </Button>
          </div>
        </div>

        <div className="relative">
          <img
            src={illuminatedBookshelves}
            alt="Illuminated Bookshelves"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col justify-center items-center  px-4 sm:px-6 lg:px-8  bg-white py-20 gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl text-detail text-center font-bold">
            Why choose Colophon?
          </h2>
          <p className="text-detail text-lg text-center max-w-2xl">
            Powerful tools to organize your personal library and disover new
            books
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col justify-center items-center p-6 gap-4">
            <HiOutlineMagnifyingGlass className="text-primary size-8 stroke-2" />
            <h3 className="text-detail text-xl text-center font-semibold">
              Advanced Searching
            </h3>
            <p className="text-detail text-base text-center">
              Find your books by title, author, genre or ISBN in our wide
              database
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-6 gap-4">
            <FaRegBookmark className="text-highlight size-8" />
            <h3 className="text-detail text-xl text-center font-semibold">
              Organized Bookshelves
            </h3>
            <p className="text-detail text-base text-center">
              Organize your books into "Read", "Reading", and "Want to Read"
              easily
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-6 gap-4">
            <FaRegStar className="text-primary size-8" />
            <h3 className="text-detail text-xl text-center font-semibold">
              Ratings and Reviews
            </h3>
            <p className="text-detail text-base text-center">
              Rate books, write reviews, and discover opinions from other
              readers
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ul className="flex flex-col md:flex-row gap-8">
          <li className="flex flex-col gap-2">
            <strong className="text-primary text-4xl text-center font-bold">
              50K+
            </strong>
            <span className="text-detail text-base text-center">
              Books Registered
            </span>
          </li>
          <li className="flex flex-col gap-2">
            <strong className="text-primary text-4xl text-center font-bold">
              10K+
            </strong>
            <span className="text-detail text-base text-center">
              Active Users
            </span>
          </li>
          <li className="flex flex-col gap-2">
            <strong className="text-primary text-4xl text-center font-bold">
              100K+
            </strong>
            <span className="text-detail text-base text-center">
              Books Read
            </span>
          </li>
          <li className="flex flex-col gap-2">
            <strong className="text-primary text-4xl text-center font-bold">
              25K+
            </strong>
            <span className="text-detail text-base text-center">Reviews</span>
          </li>
        </ul>
      </section>
    </MainLayout>
  );
};
