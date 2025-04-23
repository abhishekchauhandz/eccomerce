export const SectionHeading = ({ title, number }) => (
  <h2 className="inline-flex md:w-[13.75rem] overflow-hidden items-center bg-primary text-white text-xs md:text-[1rem] px-4 py-2 font-bold rounded-lg mb-4">
    {number && (
      <span className="border border-white font-normal text-xs md:text-[1rem] bg-primary px-2 mr-2 rounded-full">
        {number}
      </span>
    )}
    {title}
  </h2>
);
